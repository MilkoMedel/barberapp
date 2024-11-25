import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/firebase/auth.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

  showButton: boolean = false;

  expandedCard: number | null = null;

  ngOnInit(){
    this.authService.authState$.subscribe((user) => {
      if(user && user.email){
        const dominio = user.email.split('@')[1];
        this.showButton = dominio === 'barberapp.com';
        }else{
          this.showButton = false;
      }
    });
  }

  logout(){
    this.authService.logout().then(() =>{
      this.showButton = false;
      this.router.navigate(['/login'])
    })
  }


  toggleCardExpansion(index: number) {
    this.expandedCard = this.expandedCard === index ? null : index;
  }
}
