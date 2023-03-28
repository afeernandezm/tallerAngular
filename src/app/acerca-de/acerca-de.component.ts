import { EntradaService } from './../shared/services/entrada.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Piezas } from './../piezas';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  public listadoEntradas: Piezas[] = [];
  idPiezaSeleccionada = '';
  piezaSeleccionada: Piezas = {
    _id: '',
    nombre: '',
    precio: 0,
  };
  idPieza = '';
  nombrePieza = '';
  precioPieza = 0;
  @Input()
  piezas: Piezas = {
    _id: '',
    nombre: '',
    precio: 0,
  };
  showAlert = false;

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private entradaService: EntradaService
  ) {}

  ngOnInit(): void {
    // Carga de datos desde la API
    this.obtenerPiezas();
  }

  async obtenerPiezas() {
    try {
      const response = await this.http
        .get('https://tallerbackend.onrender.com/api/piezas')
        .toPromise();
      this.listadoEntradas = response as Piezas[];
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  }

  seleccionarPieza(piezaId: string) {
    this.piezaSeleccionada = this.listadoEntradas.find(
      (p: Piezas) => p._id === piezaId.trim()
    ) || {
      _id: '',
      nombre: '',
      precio: 0,
    };
    this.idPiezaSeleccionada = piezaId.trim();
    console.log(this.piezaSeleccionada);
    console.log(this.idPiezaSeleccionada);
  }

  async eliminar(id: string) {
    try {
      await this.entradaService.eliminar(id); // llamar al método del servicio
      console.log('Pieza eliminada');
      console.log(id);
      this.listadoEntradas = this.listadoEntradas.filter(
        (p: Piezas) => p._id !== id
      );
      this.showAlert = true;
      window.location.reload(); // recargar la página
    } catch (error) {
      console.error(error);
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  }
}
