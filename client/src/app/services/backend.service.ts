import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getRequirements(): void {
    this.http.get("https://3000--main--tree-visualizer--jdtech3.code.j0e.ca/api/requirements").subscribe((res) => {
      return res;
    });

    // const req = this.http.get("http://localhost:3000/api/requirements")
    // req.subscribe((res) => {return res.text();});
  }
}
