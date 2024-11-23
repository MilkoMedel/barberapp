import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  isLogged = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState$.subscribe((user) => {
      this.isLogged = !!user; // Actualiza el estado dinámicamente
    });
  }
}
