import { Router } from 'express';
import { Routes } from '@/types/routes.interface';
import { getQuoteSummaryHandler } from '@/features/quoteSummaries/quoteSummaries.controller';

const router = Router();

router.post('/quoteSummaries/getQuoteSummary', getQuoteSummaryHandler);

const quoteSummariesRoute: Routes = { path: '/quoteSummaries', router };

export default quoteSummariesRoute;
