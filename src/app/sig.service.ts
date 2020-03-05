import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SigService {

  constructor(
    private http: HttpClient
	) { }

  getSigs(): Observable<any> {
	  return this.http.get('http://localhost:3000/import');
  }
  
  updateSig(sig: any): Observable<any> {
	  return this.http.put('http://localhost:3000/update', sig, httpOptions);
  }
}
