import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private apiUrl = 'http://localhost:3001';
  constructor(private http: HttpClient) { }
  getDados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
  login(nome: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.apiUrl}/login`,
      {nome, senha}
    )
    .pipe(
      tap(
        (user) => {
          sessionStorage.setItem("user", user.nome);
        }
      )
    )
  }
}
