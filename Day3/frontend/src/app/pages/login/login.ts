import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, ButtonModule, PasswordModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

}
