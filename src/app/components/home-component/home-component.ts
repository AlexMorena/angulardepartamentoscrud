import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { ServiceDepartamentos } from '../../services/service.departamento';

@Component({
  selector: 'app-home-component',
  standalone: false,
  styleUrl: './home-component.css',
  templateUrl: './home-component.html',
})
export class HomeComponent implements OnInit{
  public departamentos!: Array<Departamento>;
  constructor(private _service: ServiceDepartamentos,
    private _cdr: ChangeDetectorRef){}

  async ngOnInit(): Promise<void> {
    await this.loadDepartamentos();
  }

  async loadDepartamentos(): Promise<void> {
    this.departamentos = await this._service.getDepartamentosAsync();
    this._cdr.detectChanges();
  }

  async deleteDepartamento(id: number): Promise<void>{
    let response = await this._service.deleteDepartamentoAsync(id);
    await this.loadDepartamentos();
  }
}
