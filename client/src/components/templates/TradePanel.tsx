import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  createTrade,
  depositCash,
  getPortfolio,
  getPositions,
  getTrades,
  withdrawCash,
} from '../../api/trading';

type Trade = {
  _id?: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  executedAt: string;
};

type Position = {
  symbol: string;
  quantity: number;
  averageCost: number;
  lastPrice: number;
  marketValue: number;
};

type Portfolio = {
  cash: number;
  currency: string;
  totalMarketValue: number;
  totalEquity: number;
};

const defaultTrade = {
  symbol: 'AAPL',
  side: 'buy' as const,
  quantity: 10,
  price: 100,
};

export default function TradePanel() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [tradeForm, setTradeForm] = useState(defaultTrade);
  const [cashAmount, setCashAmount] = useState(5000);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const currency = portfolio?.currency ?? 'USD';
  const formatCurrency = useMemo(
    () => (value: number) => value.toLocaleString('en-US', { style: 'currency', currency }),
    [currency],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const [portfolioResponse, positionsResponse, tradesResponse] = await Promise.all([
        getPortfolio(),
        getPositions(),
        getTrades(),
      ]);

      setPortfolio(portfolioResponse.data);
      setPositions(positionsResponse.data);
      setTrades(tradesResponse.data);
    } catch (error: any) {
      setErrorMessage(error?.body?.message || 'Unable to load trading data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleTradeChange = (field: keyof typeof tradeForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'quantity' || field === 'price' ? Number(event.target.value) : event.target.value;
    setTradeForm(prev => ({ ...prev, [field]: value }));
  };

  const handleTradeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      await createTrade(tradeForm);
      await refresh();
    } catch (error: any) {
      setErrorMessage(error?.body?.message || 'Unable to execute trade.');
    } finally {
      setLoading(false);
    }
  };

  const handleCashAction = async (action: 'deposit' | 'withdraw') => {
    setErrorMessage(null);
    setLoading(true);

    try {
      if (action === 'deposit') {
        await depositCash({ amount: cashAmount });
      } else {
        await withdrawCash({ amount: cashAmount });
      }
      await refresh();
    } catch (error: any) {
      setErrorMessage(error?.body?.message || 'Unable to update cash balance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Trading Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">Cash Balance</Typography>
              <Typography variant="h6">{portfolio ? formatCurrency(portfolio.cash) : '--'}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">Market Value</Typography>
              <Typography variant="h6">{portfolio ? formatCurrency(portfolio.totalMarketValue) : '--'}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography color="text.secondary">Total Equity</Typography>
              <Typography variant="h6">{portfolio ? formatCurrency(portfolio.totalEquity) : '--'}</Typography>
            </Grid>
          </Grid>
        </Box>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Divider />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Place Trade
            </Typography>
            <Box component="form" onSubmit={handleTradeSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Symbol"
                    value={tradeForm.symbol}
                    onChange={handleTradeChange('symbol')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Side"
                    value={tradeForm.side}
                    onChange={handleTradeChange('side')}
                    fullWidth
                  >
                    <MenuItem value="buy">Buy</MenuItem>
                    <MenuItem value="sell">Sell</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={tradeForm.quantity}
                    onChange={handleTradeChange('quantity')}
                    fullWidth
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Price"
                    value={tradeForm.price}
                    onChange={handleTradeChange('price')}
                    fullWidth
                    inputProps={{ min: 0.01, step: 0.01 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth disabled={loading}>
                    Execute Trade
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Cash Management
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Amount"
                  value={cashAmount}
                  onChange={event => setCashAmount(Number(event.target.value))}
                  fullWidth
                  inputProps={{ min: 0.01, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleCashAction('deposit')}
                  disabled={loading}
                >
                  Deposit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleCashAction('withdraw')}
                  disabled={loading}
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Open Positions
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Avg Cost</TableCell>
                <TableCell align="right">Last Price</TableCell>
                <TableCell align="right">Market Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No positions yet.
                  </TableCell>
                </TableRow>
              ) : (
                positions.map(position => (
                  <TableRow key={position.symbol}>
                    <TableCell>{position.symbol}</TableCell>
                    <TableCell align="right">{position.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(position.averageCost)}</TableCell>
                    <TableCell align="right">{formatCurrency(position.lastPrice)}</TableCell>
                    <TableCell align="right">{formatCurrency(position.marketValue)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Recent Trades
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Side</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Executed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No trades yet.
                  </TableCell>
                </TableRow>
              ) : (
                trades.map(trade => (
                  <TableRow key={trade._id || `${trade.symbol}-${trade.executedAt}`}>
                    <TableCell>{trade.symbol}</TableCell>
                    <TableCell>{trade.side}</TableCell>
                    <TableCell align="right">{trade.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(trade.price)}</TableCell>
                    <TableCell align="right">{formatCurrency(trade.total)}</TableCell>
                    <TableCell align="right">{new Date(trade.executedAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    </Box>
  );
}
