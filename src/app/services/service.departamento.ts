import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Departamento } from "../models/departamento";
import { environment } from "../../environments/environment.development";
import { firstValueFrom } from "rxjs";

@Injectable()

export class ServiceDepartamentos {
    url = environment.urlApiDepartamentos;
    constructor(private _http: HttpClient) { }

    async getDepartamentosAsync(): Promise<Departamento[]> {
        let request = "api/departamentos";
        return firstValueFrom(this._http.get<Departamento[]>(this.url + request));
    }

    async createDepartamento(departamento: Departamento): Promise<any> {
        //Convertimos el objeto recibido a JSON
        let json = JSON.stringify(departamento);
        //Creamos un objeto header para el type
        let header = new HttpHeaders();
        //incluimos la key de content-type
        header = header.set("content-type", "application/json");
        let request = "api/departamentos";
        return firstValueFrom(
            this._http.post(this.url + request, json, { headers: header })
        );
    }

    async findDepartamentoAsync(id: number): Promise<Departamento> {
        let request = "api/departamentos/" + id;
        return firstValueFrom(this._http.get<Departamento>(this.url + request));
    }

    async updateDepartamentoAsync(departamento: Departamento): Promise<any> {
        let json = JSON.stringify(departamento);
        let header = new HttpHeaders();
        header = header.set("content-type", "application/json");
        let request = "api/departamentos";
        return firstValueFrom(
            this._http.put(this.url + request, json, { headers: header })
        );
    }

    async deleteDepartamentoAsync(id: number): Promise<any>{
        let request = "api/departamentos/" + id;
        return firstValueFrom(this._http.delete(this.url + request));
    }
}