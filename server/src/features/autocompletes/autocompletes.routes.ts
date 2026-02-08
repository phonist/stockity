import { Router } from 'express';
import { Routes } from '@/types/routes.interface';
import { getAutocompleteHandler } from '@/features/autocompletes/autocompletes.controller';

const router = Router();

router.post('/autocomplete/getAutocomplete', getAutocompleteHandler);

const autocompletesRoute: Routes = { path: '/autocomplete', router };

export default autocompletesRoute;
