import {Observable} from "rxjs";
import {Status} from "./status.enum";

export interface Pending<T> {
  data: Observable<T>;
  status: Observable<Status>;
}
