import { GetAutocomplete, PostAutocomplete } from '@/features/autocompletes/autocompletes.interfaces';
import yahooRepository from '@/features/tickers/repositories/yahoo.repository';

class AutocompleteService {
  public yahoo = new yahooRepository();

  public async getAutocomplete(req: PostAutocomplete): Promise<PostAutocomplete> {
    return await this.yahoo.autocomplete(req);
  }
}

export default AutocompleteService;
