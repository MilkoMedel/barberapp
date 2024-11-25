import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  error: string = '';tring = '';

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router) {
    this.error = '';
  }

  ngOnInit():void {
    console.log('login-page');
  }

  async loginUser(){
    try{
      const userCredential = await this.authService.login(this.email, this.password);

      const uid = userCredential.user?.uid;

      const userData = await this.firestoreService.getUser(uid);

      if(userCredential){
        this.router.navigate(['/home']);
        this.email = '';
        this.password = '';
      } else{
        console.error('No se ha iniciado sesion');
      }
    }catch(error){
      console.error('Error al iniciar sesion');
      this.error = this.authService.GenerarError(error);
      this.errorMessage = 'Ingrese bien sus datos. Intentelo nuevamente.';
    }
  }
}
