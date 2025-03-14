import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConexionApiService } from '../../servicios/conexion-api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgClass } from '@angular/common';
import { DateFormatPipePipe } from '../../pipes/date-format-pipe.pipe';
@Component({
  selector: 'app-listar-empleados',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, NgClass, DateFormatPipePipe],
  templateUrl: './listar-empleados.component.html',
  styleUrl: './listar-empleados.component.css'
})
export class ListarEmpleadosComponent implements OnInit, OnDestroy
{
  public empleados: any;
  public suscripcionEmpleados!: Subscription;  
  public idEmpleado: any;
  public claseSpinner = "spinner-desactivado";

constructor(private conexionApiService: ConexionApiService, private router: Router){ 
}

buscarEmpleado()
{
  this.conexionApiService.getEmpleado(this.idEmpleado)
  .subscribe({
    next: (data: any) => {
      if (data.status == "OK") {
        console.log(data);        
      }
    },
    error: err => console.error('Error al obtener empleado:', err)
  })
}


ngOnInit(): void {
  this.mostrarSpinner();

  this.suscripcionEmpleados = this.conexionApiService.getEmpleados()
  .subscribe({
    next: (data: any) => {
      if (data.status == "OK") {
        this.empleados = data.empleados;   
        this.ocultarSpinner();
     
      }
    },
    error: err => console.error('Error al obtener empleados:', err)
  });
}

ngOnDestroy(): void
{
  this.suscripcionEmpleados.unsubscribe();
}

mostrarSpinner()
{
  this.claseSpinner = "spinner-activado";
}

ocultarSpinner()
{
  this.claseSpinner = "spinner-desactivado";
}

}
