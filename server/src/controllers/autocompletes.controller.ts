import { NextFunction, Request, Response } from 'express';
import { GetAutocomplete } from '@/interfaces/autocompletes.interface';
import autocompleteService from '@/services/autocompletes.service';

class AutocompletesController {
  public autocompleteService = new autocompleteService();

  public getAutocomplete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAutocomplete: GetAutocomplete = await this.autocompleteService.getAutocomplete(req.body);
      res.status(200).json({ data: getAutocomplete, message: 'getAutocomplete' });
    } catch (error) {
      next(error);
    }
  };
}

export default AutocompletesController;
