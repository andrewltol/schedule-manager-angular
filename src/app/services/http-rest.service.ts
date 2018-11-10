import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class HttpRestService {

  private baseUrl = 'http://localhost:53389/api';

  constructor(protected httpClient: HttpClient) {}

  httpDelete(endpoint: string): Observable<any> {
    return this.httpClient.delete(this.prependBaseUrl(endpoint));
  }

  httpGet<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(this.prependBaseUrl(endpoint));
  }

  httpPost(endpoint: string, data: any): Observable<any> {
    return this.httpClient.post(this.prependBaseUrl(endpoint), data);
  }

  httpPut(endpoint: string, data: any): Observable<any> {
    return this.httpClient.put(this.prependBaseUrl(endpoint), data);
  }

  private prependBaseUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}
