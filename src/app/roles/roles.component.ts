import { Component } from '@angular/core';
import { Rol, RolesResponse, StarRoutingService } from '../star-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  title = 'ConsumoApiStarRouting';
  rol: Rol = { idRol: 0, nombreRol: '', descripcionRol: '' };
  roles: Rol[] = [];
  rolSeleccionado: Rol = { idRol: 0, nombreRol: '', descripcionRol: '' };
  mostrarFormularioEdicion = false;

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

  editarRol(rol: Rol) {
    this.rolSeleccionado = { ...rol }; // Copia los valores del rol seleccionado

    // Abre el formulario de edición (en este caso, mostrando un modal)
    this.mostrarFormularioEdicion = true;
  }

  guardarEdicionRol() {
    // Realiza las operaciones necesarias para guardar la edición del rol
    // Puedes utilizar this.rolSeleccionado para acceder a los valores editados del rol

    this.starRoutingService.updateRoles(this.rolSeleccionado).subscribe(
      (data: any) => {
        console.log('El rol se ha actualizado correctamente:', data);
        // Realiza cualquier otra acción que desees después de actualizar el rol
        // Por ejemplo, cierra el formulario de edición o muestra una notificación de éxito
        this.mostrarFormularioEdicion = false;
        this.getRoles();
      },
      error => {
        console.log('Error al actualizar el rol:', error);
      }
    );
  }

  cerrarFormularioEdicion() {
    this.mostrarFormularioEdicion = false;
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