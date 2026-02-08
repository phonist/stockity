import { NextFunction, Request, Response } from 'express';
import { GetAutocomplete } from '@/features/autocompletes/autocompletes.interfaces';
import { getAutocomplete } from '@/features/autocompletes/autocompletes.service';

const getAutocompleteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: GetAutocomplete = await getAutocomplete(req.body);
    res.status(200).json({ data: result, message: 'getAutocomplete' });
  } catch (error) {
    next(error);
  }
};

export { getAutocompleteHandler };
