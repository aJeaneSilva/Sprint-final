import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  apiService = inject(ApiService);
  router= inject(Router);

  loginForm = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    senha: new FormControl("", [Validators.required]),
  });

  onContinuar() {
    const { nome, senha } = this.loginForm.value;
    if(!this.loginForm.valid || !nome || !senha) {
      alert ("Existem campos não preenchidos.");
      return;
    }
      this.apiService.login(nome, senha).subscribe({
        error: (err) => {
          if(err.status === 401) {
            alert("Usuário ou senha incorretos!");
            return;
          }   /*Erro 500 indica erro meu para o back-teste*/
            alert("Erro no servidor. Tente novamente mais tarde...");
        },
        next: () => {
          this.router.navigate(['/home']);
        }
      })
  }
}
