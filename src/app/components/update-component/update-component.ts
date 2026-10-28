import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { ServiceDepartamentos } from '../../services/service.departamento';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-update-component',
  standalone: false,
  styleUrl: './update-component.css',
  templateUrl: './update-component.html',
})
export class UpdateComponent implements OnInit{
  public departamento!: Departamento;
  @ViewChild("cajaid") cajaId!: ElementRef;
  @ViewChild("cajanombre") cajaNombre!: ElementRef;
  @ViewChild("cajalocalidad") cajaLocalidad!: ElementRef;


  constructor(
    private _cdr: ChangeDetectorRef,
    private _service: ServiceDepartamentos,
    private _activeRoute: ActivatedRoute,
    private _route: Router
  ){}

  async ngOnInit(): Promise<void> {
    this._activeRoute.params.subscribe(async (params: Params) => {
      let id = parseInt(params['id']);
      let nombre = params['nombre'];
      let localidad = params['localidad'];

      this.departamento = await this._service.findDepartamentoAsync(id);
      this._cdr.detectChanges();
    })
  }

  async updateDepartamento(): Promise<void> {
    let id = parseInt(this.cajaId.nativeElement.value);
    let nombre = this.cajaNombre.nativeElement.value;
    let localidad = this.cajaLocalidad.nativeElement.value;
    let departamento = new Departamento(id, nombre, localidad);
    let response = await this._service.updateDepartamentoAsync(departamento);
    this._route.navigate(['/details', departamento.numero, departamento.nombre, departamento.localidad]);
  }

}
