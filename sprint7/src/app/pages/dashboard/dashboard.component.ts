import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { CarTableComponent } from "../../components/car-table/car-table.component";
import { DashboardService } from '../../services/dashboard.service';
import { Veiculo, VinInfos } from '../../models/car';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent, CarTableComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService)
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

 vinInfos: VinInfos = {
    id: -1,
    odometro: 0,
    nivelCombustivel: 0,
    status: "--",
    lat: 0,
    long: 0,
  }

  ngOnInit() {
    this.dashboardService.getVeiculos().subscribe({
      error: (err) => console.error(err),
      next: (resposta: any) => {
        this.veiculos = resposta.vehicles;

        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0];

          this.dashboardService.getVinInfos(this.veiculoSelecionado.vin).subscribe({
            error: () => { },
            next: (vinInfos) => {
              this.vinInfos = vinInfos
            }
          }) 
        }
      }
    })
  }

  onChangeSelect(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value)
    const veiculo = this.veiculos.find((veiculo) => veiculo.id === id)

    if (veiculo) {
      this.veiculoSelecionado = veiculo
    }

    this.dashboardService.getVinInfos(this.veiculoSelecionado.vin).subscribe({
      error: () => { },
      next: (vinInfos) => {
        this.vinInfos = vinInfos
      }
    })

  }

  onChangeVin() {

  }
}
