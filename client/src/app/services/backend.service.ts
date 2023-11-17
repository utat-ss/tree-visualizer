import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequirementsGraph } from '../interfaces/requirements-graph';
import { environment } from '../..//environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getRequirementsGraph(): Observable<RequirementsGraph> {
    let url = environment.apiBaseUrl + "/requirements"

    return this.http.get<RequirementsGraph>(url)
  }
}
