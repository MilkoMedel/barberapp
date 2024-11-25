import { Router } from '@angular/router'; // Importa Router
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebase/auth.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) {} // Inyecta Router

  ngOnInit() {
    this.authService.logout().then(() => {
      // Esperar 3 segundos antes de redirigir al login
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000); // 2000 milisegundos = 3 segundos
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
