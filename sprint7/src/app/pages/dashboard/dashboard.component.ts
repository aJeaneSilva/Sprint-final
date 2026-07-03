import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CarTableComponent } from "../../components/car-table/car-table.component";
import { DashboardService } from '../../services/dashboard.service';
import { Veiculo } from '../../models/car';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, CarTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService)

  veiculos: Veiculo[] = []

  veiculoSelecionado: Veiculo = {
    id: -1,
    vehicle: "",
    volumetotal: 0,
    connected: 0,
    softwareUpdates: 0,
    vin: "",
    img: "",
  }

  ngOnInit() {
      this.dashboardService.getVeiculos().subscribe({
        /*error: () => {} */
        next: (veiculos) => { 
          this.veiculos = veiculos;
          this.veiculoSelecionado = veiculos[0];
        }
      })
  }
}
