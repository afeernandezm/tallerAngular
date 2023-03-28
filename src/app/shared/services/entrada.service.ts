import { Piezas } from './../../piezas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntradaService {
  url = 'https://tallerbackend.onrender.com/api/piezas/';

  constructor(private httpClient: HttpClient) {}

  public recuperarPiezas(): Observable<any> {
    return this.httpClient.get<any>(
      'https://tallerbackend.onrender.com/api/piezas'
    );
  }
  eliminar(id: string): Promise<any> {
    return this.httpClient
      .delete(`https://tallerbackend.onrender.com/api/piezas/${id}`)
      .toPromise();
  }

  insertarPieza(formData: any): Observable<any> {
    return this.httpClient.post(this.url, formData);
  }

  modificarPieza(piezaId: string, piezaModificada: any) {
    const url = this.url + piezaId;
    return this.httpClient.put(url, piezaModificada);
  }
}
