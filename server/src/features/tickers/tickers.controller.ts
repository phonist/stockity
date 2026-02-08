import { NextFunction, Request, Response } from 'express';
import { CreateTickerDto } from '@/features/tickers/tickers.dtos';
import { GetTickerChart, Ticker } from '@/features/tickers/tickers.interfaces';
import { autocomplete, createTicker, deleteTicker, findAllTicker, findTickerById, getChart, updateTicker } from '@/features/tickers/tickers.service';

const getTickers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const findAllTickersData: Ticker[] = await findAllTicker();

    res.status(200).json({ data: findAllTickersData, message: 'findAll' });
  } catch (error) {
    next(error);
  }
};

const getTickerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickerId: string = req.params.id;
    const findOneTickerData: Ticker = await findTickerById(tickerId);

    res.status(200).json({ data: findOneTickerData, message: 'findOne' });
  } catch (error) {
    next(error);
  }
};

const createTickerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickerData: CreateTickerDto = req.body;
    const createTickerData: Ticker = await createTicker(tickerData);

    res.status(201).json({ data: createTickerData, message: 'created' });
  } catch (error) {
    next(error);
  }
};

const updateTickerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickerId: string = req.params.id;
    const tickerData: CreateTickerDto = req.body;
    const updateTickerData: Ticker = await updateTicker(tickerId, tickerData);

    res.status(200).json({ data: updateTickerData, message: 'updated' });
  } catch (error) {
    next(error);
  }
};

const deleteTickerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickerId: string = req.params.id;
    const deleteTickerData: Ticker = await deleteTicker(tickerId);

    res.status(200).json({ data: deleteTickerData, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};

const getChartHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chart: GetTickerChart = await getChart(req.body);
    res.status(200).json({ data: chart, message: 'getChart' });
  } catch (error) {
    next(error);
  }
};

const autocompleteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await autocomplete(req.body);

    res.status(200).json({ data: result, message: 'autocomplete' });
  } catch (error) {
    next(error);
  }
};

export { getTickers, getTickerById, createTickerHandler, updateTickerHandler, deleteTickerHandler, getChartHandler, autocompleteHandler };
