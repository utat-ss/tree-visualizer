import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requirements } from '../interfaces/requirements';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getRequirements(): Observable<Requirements> {
    // TODO: Define URL as env variable
    // let url = "https://3000--main--tree-visualizer--jdtech3.code.j0e.ca/api/requirements";
    let url = "http://localhost:3000/api/requirements"

    return this.http.get<Requirements>(url)
  }
}
