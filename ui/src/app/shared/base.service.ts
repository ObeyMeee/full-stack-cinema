import {environment} from "../../environments/environment.development";

export class Service {
  readonly baseUrl = environment.apiUrl;
}
