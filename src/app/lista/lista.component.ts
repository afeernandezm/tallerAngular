import { EntradaService } from './../shared/services/entrada.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  piezaInsertada = false;
  public listaPiezas: any;
  formData = {
    nombre: '',
    precio: 0,
  };
  constructor(private entradaService: EntradaService, HttpClient: HttpClient) {}

  ngOnInit() {
    this.recuperarPieza();
  }

  public recuperarPieza(): void {
    this.entradaService.recuperarPiezas().subscribe({
      next: (data) => {
        this.listaPiezas = data;
      },
      error: (error) => {
        alert('Error');
      },
    });
  }
  async enviarDatos() {
    try {
      const response = await this.entradaService
        .insertarPieza(this.formData)
        .toPromise();
      console.log(response);

      // Agregar la nueva pieza a la lista de piezas
      this.listaPiezas.push(response);

      // Reiniciar el formulario
      this.formData = { nombre: '', precio: 0 };

      // Establecer piezaInsertada a true
      this.piezaInsertada = true;
    } catch (error) {
      console.log(error);
      // mostrar mensaje de error al usuario
    }
  }
}
