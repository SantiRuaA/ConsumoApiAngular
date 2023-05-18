import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  deleteRoles() {
    return this.http.delete("http://localhost:3030/rol")
  }

  updateRoles(data: Rol) {
    return this.http.put("http://localhost:3030/rol", data)
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
