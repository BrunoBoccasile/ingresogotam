import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {
  api: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  getEmpleado(idEmpleado:number): Observable<any>{
    return this.http.get<any[]>(this.api +'empleados/' + idEmpleado);
  }

  getEmpleados(): Observable<any>{
    return this.http.get<any[]>(this.api + 'empleados');
  }

  getAreas(): Observable<any>{
    return this.http.get<any[]>(this.api + 'areas');
  }
}
