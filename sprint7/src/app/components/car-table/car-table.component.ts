import { Component, inject, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-car-table',
  imports: [],
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.css'
})
export class CarTableComponent {
  @Input() vin: string = ""
  @Input() odometro: number = 0
  @Input() nivelCombustivel: number = 0
  @Input() status: string = ""
  @Input() lat: number = 0
  @Input() long: number = 0

  dashboardService = inject(DashboardService)

  onChangeVin(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.vin = inputElement.value;
  }

  pesquisar(): void {
    if (!this.vin) return;

    this.dashboardService.getVinInfos(this.vin).subscribe({
      error: () => { },
      next: (vinInfos) => {
        console.log("Dados recebidos da API:", vinInfos);

        this.odometro = vinInfos.odometro;
        this.nivelCombustivel = vinInfos.nivelCombustivel;
        this.status = vinInfos.status;
        this.lat = vinInfos.lat;
        this.long = vinInfos.long;
      }
    });
  }
}
