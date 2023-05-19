import { Component } from '@angular/core';
import { Rol, RolesResponse, StarRoutingService } from './star-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ConsumoApiStarRouting';
  rol: Rol = { idRol: 0, nombreRol: '', descripcionRol: '' };
  roles: Rol[] = [];

  constructor(private starRoutingService: StarRoutingService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    console.log("Llamando al método getRoles() del servicio...");
    this.starRoutingService.getRoles().subscribe(
      (data: RolesResponse) => {
        console.log('Respuesta de la API:', data);
        this.roles = data.Roles;
      },
      error => {
        console.log('Error al obtener los roles:', error);
      }
    );
  }

  saveRol() {
    this.starRoutingService.postRoles(this.rol).subscribe(
      (data: any) => {
        console.log('El rol se ha agregado correctamente:', data);
        this.roles.push(this.rol); // Agrega el nuevo rol a la lista
        this.rol = { idRol: 0, nombreRol: '', descripcionRol: '' }; // Limpia los campos del formulario
        this.getRoles(); // Realiza un nuevo GET para actualizar la lista de roles
      },
      error => {
        console.log('Error al agregar el rol:', error);
      }
    );
  }

  eliminarRoles(idRol: number) {
    console.log("Llamando al método eliminarRoles() del servicio...");
    this.starRoutingService.deleteRoles(idRol).subscribe(
      () => {
        console.log('El rol se ha eliminado correctamente');
        this.getRoles(); // Realiza un nuevo GET para actualizar la lista de roles
      },
      error => {
        console.log('Error al eliminar el rol:', error);
      }
    );
  }
}
