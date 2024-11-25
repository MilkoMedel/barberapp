import { Router } from '@angular/router'; // Importa Router
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) {} // Inyecta Router

  ngOnInit() {
    this.authService.logout().then(() => {
      // Redirigir a la página de login tras cerrar sesión
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
