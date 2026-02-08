import { Router } from 'express';
import { Routes } from '@/types/routes.interface';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Stockity API',
    status: 'ok',
  });
});

const indexRoute: Routes = { path: '/', router };

export default indexRoute;
