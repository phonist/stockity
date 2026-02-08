import { GetAutocomplete, PostAutocomplete } from '@/features/autocompletes/autocompletes.interfaces';
import yahooRepository from '@/features/tickers/repositories/yahoo.repository';

const yahoo = new yahooRepository();

const getAutocomplete = async (req: PostAutocomplete): Promise<PostAutocomplete> => {
  return await yahoo.autocomplete(req);
};

export { getAutocomplete };
