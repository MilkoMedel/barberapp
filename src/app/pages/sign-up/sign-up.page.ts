import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/firebase/auth.service';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { User } from 'src/app/models/User.models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  userData: User = {
    name: '',
    lastname: '',
    email: ''
  };

  error: string = '';

  password: string = '';

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router) {
    this.error = '';
  }

  ngOnInit():void {
    console.log('singup-page');
  }

  async registerUser(){
    try{
      const userCredential = await this.authService.register(this.userData.email, this.password);

      const uid = userCredential.user?.uid;

      if(uid){
        const{name,lastname,email} = this.userData;

        await this.firestoreService.createUser(uid,{name,lastname,email});

        this.router.navigate(['/login']);
      }
    } catch(error){
      console.error('Error al registrar al usuario', error);
      this.error = this.authService.GenerarError(error);
    }
  }

}
