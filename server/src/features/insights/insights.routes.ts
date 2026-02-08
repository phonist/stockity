import { Router } from 'express';
import { Routes } from '@/types/routes.interface';
import { getInsightHandler } from '@/features/insights/insights.controller';

const router = Router();

router.post('/insights/getInsight', getInsightHandler);

const insightsRoute: Routes = { path: '/insights', router };

export default insightsRoute;
