import { Router } from 'express';
import { Routes } from '@/types/routes.interface';
import { getQuoteHandler } from '@/features/quotes/quotes.controller';

const router = Router();

router.post('/quotes/getQuote', getQuoteHandler);

const quotesRoute: Routes = { path: '/quotes', router };

export default quotesRoute;
