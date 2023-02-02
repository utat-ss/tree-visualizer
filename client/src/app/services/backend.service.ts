import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Node {
  id: any;
  label: string;
}
export interface Edge {
  from: any;
  to: any;
}
export interface Requirements {
  nodes: Array<any>;
  edges: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getRequirements(): Observable<Requirements> {
    // let url = "https://3000--main--tree-visualizer--jdtech3.code.j0e.ca/api/requirements";
    let url = "http://localhost:3000/api/requirements"

    return this.http.get<Requirements>("http://localhost:3000/api/requirements")
  }
}
