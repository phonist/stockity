import { Router } from 'express';
import AutocompletesController from '@/features/autocompletes/autocompletes.controller';
import { Routes } from '@/types/routes.interface';

class AutocompletesRoute implements Routes {
  public path = '/autocomplete';
  public router = Router();
  public autocompletesController = new AutocompletesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/getAutocomplete`, this.autocompletesController.getAutocomplete);
  }
}

export default AutocompletesRoute;
