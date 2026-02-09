import { GetAutocomplete, PostAutocomplete } from '@/features/autocompletes/autocompletes.interfaces';
import marketStackRepository from '../tickers/repositories/marketStack.repository';

const marketStack = new marketStackRepository();

const getAutocomplete = async (req: PostAutocomplete): Promise<PostAutocomplete> => {
  return await marketStack.autocomplete(req);
};

export { getAutocomplete };
