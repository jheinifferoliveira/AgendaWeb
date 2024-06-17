import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {

  mensagemErro: string='';

  constructor(
    private httpClient: HttpClient
  ) {  
  }

  

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });


  get f() {
    return this.formLogin.controls;
  }


  onSubmit() {
   
    this.httpClient.post('http://localhost:5276/api/usuarios/autenticar', this.formLogin.value)
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('auth', JSON.stringify(data));
          location.href = '/manter-tarefas';
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        }
      });
  }


  }


