import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isAuthenticated : boolean = false;
    nomeUsuario : string = '';
    emailUsuario : string = '';

  ngOnInit(): void {
    let auth = localStorage.getItem('auth');

    if(auth != null){
      this.isAuthenticated = true;


     
      let data = JSON.parse(auth);
     
      this.nomeUsuario = data.response.nome;
      this.emailUsuario = data.response.email;

    }
  }

logout(): void{
  if(confirm('Deseja realmente sair do sistema?')){

    localStorage.removeItem('auth');

    location.href='/';
  }
}
   
}
