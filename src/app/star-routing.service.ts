import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StarRoutingService {

  constructor(private http: HttpClient) { }

  getRoles() {
    console.log("Llamando al método getRoles() del servicio...");
    return this.http.get<RolesResponse>("http://localhost:3030/rol");
  }


  postRoles(data: Rol) {
    return this.http.post("http://localhost:3030/rol", data)
  }

  deleteRoles(idRol: number): Observable<any> {
    const url = `http://localhost:3030/rol/${idRol}`;
    return this.http.delete(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  updateRoles(data: Rol) {
    return this.http.put("http://localhost:3030/rol", data)
  }

  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    return this.http.post("http://localhost:3030/login", data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  
}

export interface RolesResponse {
  Roles: Rol[]; // Cambiar 'roles' por 'Roles'
}


export interface Rol {
  idRol: number,
  nombreRol: string,
  descripcionRol: string
}
