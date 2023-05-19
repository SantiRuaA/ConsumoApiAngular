import { Component } from '@angular/core';
import { Rol, RolesResponse, StarRoutingService } from '../star-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  title = 'ConsumoApiStarRouting';
  roles: Rol[] = [];
  nuevoRol: Rol = { idRol: 0, nombreRol: '', descripcionRol: '' };
  rolSeleccionado: Rol = { idRol: 0, nombreRol: '', descripcionRol: '' };
  mostrarFormularioEdicion = false;
  mostrarFormularioAgregar = false;

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


  editarRol(rol: Rol) {
    this.rolSeleccionado = { ...rol }; // Copia los valores del rol seleccionado
    this.mostrarFormularioEdicion = true; // Abre el formulario de edición
  }

  abrirFormularioAgregar() {
    this.mostrarFormularioAgregar = true;
  }

  cerrarFormularioAgregar() {
    this.mostrarFormularioAgregar = false;
    this.nuevoRol = { idRol: 0, nombreRol: '', descripcionRol: '' };
  }

  agregarRol() {
    this.starRoutingService.postRoles(this.nuevoRol).subscribe(
      (data: any) => {
        console.log('El rol se ha agregado correctamente:', data);
        this.roles.push(this.nuevoRol); // Agrega el nuevo rol a la lista
        this.cerrarFormularioAgregar(); // Cierra el formulario de agregar
        this.getRoles();
      },
      error => {
        console.log('Error al agregar el rol:', error);
      }
    );
  }

  guardarEdicionRol() {
    this.starRoutingService.updateRoles(this.rolSeleccionado).subscribe(
      (data: any) => {
        console.log('El rol se ha actualizado correctamente:', data);
        this.mostrarFormularioEdicion = false; // Cierra el formulario de edición
        this.getRoles(); // Actualiza la lista de roles
      },
      error => {
        console.log('Error al actualizar el rol:', error);
      }
    );
  }

  cerrarFormularioEdicion() {
    this.mostrarFormularioEdicion = false; // Cierra el formulario de edición
  }

  eliminarRoles(idRol: number) {
    console.log("Llamando al método eliminarRoles() del servicio...");
    this.starRoutingService.deleteRoles(idRol).subscribe(
      () => {
        console.log('El rol se ha eliminado correctamente');
        this.getRoles(); // Actualiza la lista de roles
      },
      error => {
        console.log('Error al eliminar el rol:', error);
      }
    );
  }


  login() {
    const username = "correUsuario"; // Reemplaza con el valor real del campo de nombre de usuario
    const password = "contrasenaUsuario"; // Reemplaza con el valor real del campo de contraseña

    this.starRoutingService.login(username, password).subscribe(
      (data: any) => {
        console.log('Inicio de sesión exitoso:', data);
        // Aquí puedes realizar acciones adicionales después del inicio de sesión exitoso
      },
      error => {
        console.log('Error al iniciar sesión:', error);
      }
    );
  }
}
