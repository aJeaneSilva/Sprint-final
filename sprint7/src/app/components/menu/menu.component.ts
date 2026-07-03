import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  router = inject(Router);
  menuAtivo: boolean = false;
  alternarMenu() {
    this.menuAtivo = !this.menuAtivo;
  }
  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }
  fazerLogout() {
    if(confirm("Deseja realmente sair?")) {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    } else {
      return
    }
  }
}
