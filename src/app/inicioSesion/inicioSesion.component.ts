import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicioSesion',
  templateUrl: './inicioSesion.component.html',
  styleUrls: ['./inicioSesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  hide = true;
  nombre: string;
  email: string;
  password: string;

  constructor() {
    this.nombre = '';
    this.email = '';
    this.password = '';
  }
  ngOnInit() {}

  login() {
    localStorage.setItem('nombre', this.nombre);
    console.log(this.nombre);
    console.log(this.email);
    console.log(this.password);
  }
}
