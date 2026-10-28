import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceDepartamentos } from '../../services/service.departamento';
import { Departamento } from '../../models/departamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-component',
  standalone: false,
  styleUrl: './create-component.css',
  templateUrl: './create-component.html',
})
export class CreateComponent {
  public mensaje!: string;
  @ViewChild("cajaid") cajaId!: ElementRef;
  @ViewChild("cajanombre") cajaNombre!: ElementRef;
  @ViewChild("cajalocalidad") cajaLocalidad!: ElementRef;

  constructor(
    private _service: ServiceDepartamentos,
    private _cder: ChangeDetectorRef,
    private _router: Router
  ) { }

  async insertDepartamento(): Promise<void> {
    let id = parseInt(this.cajaId.nativeElement.value);
    let nombre = this.cajaNombre.nativeElement.value;
    let localidad = this.cajaLocalidad.nativeElement.value;

    let departamento: Departamento = new Departamento(id, nombre, localidad);

    let response = await this._service.createDepartamento(departamento);
    // this.mensaje = "Departamento insertado";
    // this._cder.detectChanges();
    this._router.navigate(["/"]);

  }

}
