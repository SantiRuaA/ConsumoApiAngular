import { Component } from '@angular/core';
import { Rol, RolesResponse, StarRoutingService,  } from './star-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ConsumoApiStarRouting';
  rol:Rol = {idRol:0, nombreRol:"", descripcionRol:""};
  roles:Rol[] = []

  constructor(private starRoutingService:StarRoutingService){
    this.starRoutingService.getRoles()
      .subscribe((data: RolesResponse)=>{
          this.roles = data.roles
    })

  }
  saveRol() {
    this.starRoutingService.postRoles(this.rol)
      .subscribe((data: any) => {
        console.log('El rol se ha agregado correctamente:', data);
        this.roles.push(this.rol); // Agrega el nuevo rol a la lista
        this.rol = {idRol: 0, nombreRol: '', descripcionRol: ''}; // Limpia los campos del formulario
      }, error => {
        console.log('Error al agregar el rol:', error);
      });
  }
  


}
