import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-boas-vindas',
  imports: [MenuComponent],
  templateUrl: './boas-vindas.component.html',
  styleUrl: './boas-vindas.component.css'
})
export class BoasVindasComponent {
 router = inject(Router)
 irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }
}