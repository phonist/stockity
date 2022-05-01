import { GetAutocomplete, PostAutocomplete } from '@interfaces/autocompletes.interface';
import yahooRepository from '@repositories/yahoo.repository';

class AutocompleteService {
  public yahoo = new yahooRepository();

  public async getAutocomplete(req: PostAutocomplete): Promise<PostAutocomplete> {
    return await this.yahoo.autocomplete(req);
  }
}

export default AutocompleteService;
