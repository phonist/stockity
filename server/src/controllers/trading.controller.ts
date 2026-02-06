import { NextFunction, Request, Response } from 'express';
import { CashAdjustmentDto, CreateTradeDto } from '@dtos/trading.dto';
import { Account, PortfolioSummary, Position, Trade } from '@interfaces/trading.interface';
import TradingService from '@services/trading.service';

class TradingController {
  public tradingService = new TradingService();

  public getTrades = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trades: Trade[] = await this.tradingService.listTrades();
      res.status(200).json({ data: trades, message: 'getTrades' });
    } catch (error) {
      next(error);
    }
  };

  public getPositions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const positions: Position[] = await this.tradingService.listPositions();
      res.status(200).json({ data: positions, message: 'getPositions' });
    } catch (error) {
      next(error);
    }
  };

  public getPortfolio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const portfolio: PortfolioSummary = await this.tradingService.getPortfolio();
      res.status(200).json({ data: portfolio, message: 'getPortfolio' });
    } catch (error) {
      next(error);
    }
  };

  public createTrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tradeData: CreateTradeDto = req.body;
      const trade: Trade = await this.tradingService.createTrade(tradeData);
      res.status(201).json({ data: trade, message: 'tradeExecuted' });
    } catch (error) {
      next(error);
    }
  };

  public deposit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount }: CashAdjustmentDto = req.body;
      const account: Account = await this.tradingService.deposit(amount);
      res.status(200).json({ data: account, message: 'deposit' });
    } catch (error) {
      next(error);
    }
  };

  public withdraw = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { amount }: CashAdjustmentDto = req.body;
      const account: Account = await this.tradingService.withdraw(amount);
      res.status(200).json({ data: account, message: 'withdraw' });
    } catch (error) {
      next(error);
    }
  };
}

export default TradingController;
