import { Component } from '@angular/core';
import { StarRoutingService } from '../star-routing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private starRoutingService: StarRoutingService) { 
    this.username = '';
    this.password = '';
  }

  login() {
    this.starRoutingService.login(this.username, this.password).subscribe(
      (data: any) => {
        console.log('Inicio de sesión exitoso:', data);
        // Aquí puedes redireccionar a la pantalla de solicitud de roles
        // Puedes usar el router de Angular para realizar la redirección
      },
      error => {
        console.log('Error al iniciar sesión:', error);
      }
    );
  }
}
