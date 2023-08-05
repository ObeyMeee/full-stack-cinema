import { environment } from '../../environments/environment.development';
import { RequestStatusService } from './pending/request-status.service';

export class BaseService {
  readonly baseUrl = environment.apiUrl;

  constructor(protected requestStatusService: RequestStatusService) {}
}
