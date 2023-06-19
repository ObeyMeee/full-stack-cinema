import {environment} from "../../environments/environment.development";

export class BaseService {
  readonly baseUrl = environment.apiUrl;
}
