import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SweetAlert } from './clases/sweetAlert';
import { Router } from '@angular/router';
import { CrearEmpleadoComponent } from "./componentes/crear-empleado/crear-empleado.component";
import { NgModel } from '@angular/forms';
import { ModificarEmpleadoComponent } from './componentes/modificar-empleado/modificar-empleado.component';
import { EliminarEmpleadoComponent } from './componentes/eliminar-empleado/eliminar-empleado.component';
import { ListarEmpleadosComponent } from './componentes/listar-empleados/listar-empleados.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CrearEmpleadoComponent, ModificarEmpleadoComponent, EliminarEmpleadoComponent, ListarEmpleadosComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ingreso-gotam';
  public swal: SweetAlert = new SweetAlert(this.router);
  public navegacion: number;

  constructor(public router: Router) 
  {
    this.navegacion = 0;
  }

  public navegar(opcion: number){
    this.navegacion = opcion;
  }
}
