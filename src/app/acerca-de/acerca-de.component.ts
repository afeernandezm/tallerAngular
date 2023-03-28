import { EntradaService } from './../shared/services/entrada.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Piezas } from './../piezas';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  public listadoEntradas: Piezas[];
  idPiezaSeleccionada: string;
  piezaSeleccionada: Piezas;
  idPieza: string = '';
  nombrePieza: string = '';
  precioPieza: number = 0;
  @Input()
  public piezas: Piezas;
  EntradaService: any;
  showAlert: boolean;

  constructor(
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private entradaService: EntradaService
  ) {
    this.piezas = {
      _id: '',
      nombre: '',
      precio: 0,
    };
    this.idPiezaSeleccionada = this.piezas._id;
    this.piezaSeleccionada = {
      _id: '',
      nombre: '',
      precio: 0,
    };
    this.listadoEntradas = [];
    this.showAlert = false;
  }

  ngOnInit(): void {
    // Carga de datos desde la API
    this.http
      .get<Piezas[]>('https://tallerbackend.onrender.com/api/piezas')
      .subscribe((data) => {
        this.listadoEntradas = data;
      });
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

  /*   modificar(idPieza: string) {
    console.log('idPieza: ' + idPieza);
    const piezaModificada = {
      nombre: this.nombrePieza,
      precio: this.precioPieza,
    };

    this.piezasService.modificarPieza(this.idPieza, piezaModificada).subscribe(
      (data) => console.log(data),
      (error) => console.error(error)
    );
  } */
}
