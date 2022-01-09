import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateTickerDto } from '@dtos/tickers.dto';
import TickersRoute from '@routes/tickers.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Tickers', () => {
  describe('[GET] /tickers', () => {
    it('response fineAll Tickers', async () => {
      const tickersRoute = new TickersRoute();
      const tickers = tickersRoute.tickersController.userService.tickers;

      tickers.find = jest.fn().mockReturnValue([
        {
          _id: mongoose.Types.ObjectId(),
          ticker: 'AAPL',
          name: 'Apple Inc.',
          price: '200.00',
          change: '+0.00',
          changePercent: '0.00%',
          dayLow: '200.00',
          dayHigh: '200.00',
          yearLow: '200.00',
          yearHigh: '200.00',
          marketCap: '200.00',
          volume: '200.00',
          avgVolume: '200.00',
          pe: '200.00',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([tickersRoute]);
      return request(app.getServer()).get(`${tickersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /tickers/:id', () => {
    it('response findOne Ticker', async () => {
      const userId = 'qpwoeiruty';

      const tickersRoute = new TickersRoute();
      const tickers = tickersRoute.tickersController.userService.tickers;

      tickers.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tickersRoute]);
      return request(app.getServer()).get(`${tickersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /tickers', () => {
    it('response Create Ticker', async () => {
      const userData: CreateTickerDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

      const tickersRoute = new TickersRoute();
      const tickers = tickersRoute.tickersController.userService.tickers;

      tickers.findOne = jest.fn().mockReturnValue(null);
      tickers.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tickersRoute]);
      return request(app.getServer()).post(`${tickersRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /tickers/:id', () => {
    it('response Update Ticker', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateTickerDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

      const tickersRoute = new TickersRoute();
      const tickers = tickersRoute.tickersController.userService.tickers;

      if (userData.email) {
        tickers.findOne = jest.fn().mockReturnValue({
          _id: userId,
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
        });
      }

      tickers.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tickersRoute]);
      return request(app.getServer()).put(`${tickersRoute.path}/${userId}`).send(userData);
    });
  });

  describe('[DELETE] /tickers/:id', () => {
    it('response Delete Ticker', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const tickersRoute = new TickersRoute();
      const tickers = tickersRoute.tickersController.userService.tickers;

      tickers.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tickersRoute]);
      return request(app.getServer()).delete(`${tickersRoute.path}/${userId}`).expect(200);
    });
  });
});
