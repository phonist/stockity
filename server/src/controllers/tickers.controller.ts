import { NextFunction, Request, Response } from 'express';
import { CreateTickerDto } from '@dtos/tickers.dto';
import { GetTickerChart, Ticker } from '@interfaces/tickers.interface';
import tickerService from '@services/tickers.service';

class TickersController {
  public tickerService = new tickerService();

  public getTickers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTickersData: Ticker[] = await this.tickerService.findAllTicker();

      res.status(200).json({ data: findAllTickersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTickerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tickerId: string = req.params.id;
      const findOneTickerData: Ticker = await this.tickerService.findTickerById(tickerId);

      res.status(200).json({ data: findOneTickerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTicker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tickerData: CreateTickerDto = req.body;
      const createTickerData: Ticker = await this.tickerService.createTicker(tickerData);

      res.status(201).json({ data: createTickerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTicker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tickerId: string = req.params.id;
      const tickerData: CreateTickerDto = req.body;
      const updateTickerData: Ticker = await this.tickerService.updateTicker(tickerId, tickerData);

      res.status(200).json({ data: updateTickerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTicker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tickerId: string = req.params.id;
      const deleteTickerData: Ticker = await this.tickerService.deleteTicker(tickerId);

      res.status(200).json({ data: deleteTickerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getChart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getChart: GetTickerChart = await this.tickerService.getChart(req.body);

      res.status(200).json({ data: getChart, message: 'getChart' });
    } catch (error) {
      next(error);
    }
  };

  public autocomplete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const autocomplete: string[] = await this.tickerService.autocomplete(req.body);

      res.status(200).json({ data: autocomplete, message: 'autocomplete' });
    } catch (error) {
      next(error);
    }
  };
}

export default TickersController;
