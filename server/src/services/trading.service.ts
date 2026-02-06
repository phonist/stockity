import { CreateTradeDto } from '@dtos/trading.dto';
import { HttpException } from '@exceptions/HttpException';
import { Account, PortfolioSummary, Position, Trade } from '@interfaces/trading.interface';
import accountModel from '@models/account.model';
import tradeModel from '@models/trades.model';
import { isEmpty } from '@utils/util';

class TradingService {
  public trades = tradeModel;
  public accounts = accountModel;

  private async getOrCreateAccount(): Promise<Account> {
    let account: Account = await this.accounts.findOne({ name: 'default' });

    if (!account) {
      account = await this.accounts.create({
        name: 'default',
        cash: 100000,
        currency: 'USD',
        updatedAt: new Date(),
      });
    }

    return account;
  }

  private buildPositions(trades: Trade[]): Position[] {
    const positionsMap = new Map<string, { quantity: number; averageCost: number; lastPrice: number }>();

    trades.forEach(trade => {
      const symbol = trade.symbol.toUpperCase();
      const entry = positionsMap.get(symbol) || { quantity: 0, averageCost: 0, lastPrice: trade.price };

      if (trade.side === 'buy') {
        const newQuantity = entry.quantity + trade.quantity;
        const totalCost = entry.averageCost * entry.quantity + trade.price * trade.quantity;
        entry.averageCost = newQuantity === 0 ? 0 : totalCost / newQuantity;
        entry.quantity = newQuantity;
      } else {
        entry.quantity = entry.quantity - trade.quantity;
        if (entry.quantity <= 0) {
          entry.quantity = 0;
          entry.averageCost = 0;
        }
      }

      entry.lastPrice = trade.price;
      positionsMap.set(symbol, entry);
    });

    return Array.from(positionsMap.entries())
      .filter(([, entry]) => entry.quantity > 0)
      .map(([symbol, entry]) => ({
        symbol,
        quantity: entry.quantity,
        averageCost: Number(entry.averageCost.toFixed(2)),
        lastPrice: entry.lastPrice,
        marketValue: Number((entry.lastPrice * entry.quantity).toFixed(2)),
      }));
  }

  public async listTrades(): Promise<Trade[]> {
    return this.trades.find().sort({ executedAt: -1 });
  }

  public async listPositions(): Promise<Position[]> {
    const trades: Trade[] = await this.trades.find().sort({ executedAt: 1 });
    return this.buildPositions(trades);
  }

  public async getPortfolio(): Promise<PortfolioSummary> {
    const account = await this.getOrCreateAccount();
    const positions = await this.listPositions();
    const totalMarketValue = positions.reduce((sum, position) => sum + position.marketValue, 0);

    return {
      cash: Number(account.cash.toFixed(2)),
      currency: account.currency,
      positions,
      totalMarketValue: Number(totalMarketValue.toFixed(2)),
      totalEquity: Number((account.cash + totalMarketValue).toFixed(2)),
    };
  }

  public async deposit(amount: number): Promise<Account> {
    if (amount <= 0) throw new HttpException(400, 'Deposit amount must be greater than zero');

    const account = await this.getOrCreateAccount();
    account.cash = Number((account.cash + amount).toFixed(2));
    account.updatedAt = new Date();

    await (account as any).save();
    return account;
  }

  public async withdraw(amount: number): Promise<Account> {
    if (amount <= 0) throw new HttpException(400, 'Withdrawal amount must be greater than zero');

    const account = await this.getOrCreateAccount();
    if (account.cash < amount) throw new HttpException(400, 'Insufficient cash balance');

    account.cash = Number((account.cash - amount).toFixed(2));
    account.updatedAt = new Date();

    await (account as any).save();
    return account;
  }

  public async createTrade(tradeData: CreateTradeDto): Promise<Trade> {
    if (isEmpty(tradeData)) throw new HttpException(400, 'Trade data is empty');

    const account = await this.getOrCreateAccount();
    const normalizedSymbol = tradeData.symbol.trim().toUpperCase();
    const quantity = Number(tradeData.quantity);
    const price = Number(tradeData.price);
    const total = Number((quantity * price).toFixed(2));

    if (quantity <= 0 || price <= 0) throw new HttpException(400, 'Trade quantity and price must be greater than zero');

    const positions = await this.listPositions();
    const currentPosition = positions.find(position => position.symbol === normalizedSymbol);

    if (tradeData.side === 'buy') {
      if (account.cash < total) throw new HttpException(400, 'Insufficient cash to execute trade');
      account.cash = Number((account.cash - total).toFixed(2));
    } else {
      const availableQuantity = currentPosition ? currentPosition.quantity : 0;
      if (availableQuantity < quantity) throw new HttpException(400, 'Insufficient holdings to sell');
      account.cash = Number((account.cash + total).toFixed(2));
    }

    account.updatedAt = new Date();
    await (account as any).save();

    const trade = await this.trades.create({
      symbol: normalizedSymbol,
      side: tradeData.side,
      quantity,
      price,
      total,
      executedAt: new Date(),
    });

    return trade;
  }
}

export default TradingService;
