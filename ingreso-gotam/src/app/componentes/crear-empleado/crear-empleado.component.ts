import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { mayorDeEdadValidator } from '../../validators/mayor-de-edad';
import { Subscription } from 'rxjs';
import { ConexionApiService } from '../../servicios/conexion-api.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SpinnerComponent, NgClass],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent implements OnInit
{
  formCrearEmpleado!: FormGroup;
  datosEmpleado!: any;
  suscripcionAreas!: Subscription;
  areas!: any;
  public claseSpinner = "spinner-desactivado";

  constructor(public fb: FormBuilder, private conexionApiService: ConexionApiService)
  {
    this.datosEmpleado = {
      nombre: "",
      apellido: "",
      dni: "",
      fechaNacimiento: "",
      descripcion: "",
      desarrollador: "",
      idArea: ""
    }
  }

  ngOnInit(): void
  {
    this.mostrarSpinner();
    this.formCrearEmpleado = this.fb.group({
      dni: ['', [Validators.min(1), Validators.required]],
      nombre: ['', [Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúÑñÜü -]{1,25}$"), Validators.required]],
      apellido: ['', [Validators.pattern("^[A-Za-zÁÉÍÓÚáéíóúÑñÜü -]{1,25}$"), Validators.required]],
      fechaNacimiento: ['', [Validators.required, mayorDeEdadValidator()], ],
      descripcion: ['', [Validators.maxLength(100), Validators.required]],
      desarrollador: ['', [Validators.required]],
      idArea: ['', [Validators.required]]
    })

    this.suscripcionAreas = this.conexionApiService.getAreas()
    .subscribe({
      next: (data: any) => {
        if (data.status == "OK") {
          this.areas = data.empleados;   
          this.ocultarSpinner();
       
        }
      },
      error: err => console.error('Error al obtener areas:', err)
    });
  }
  

  enviarFormEmpleado()
  {
    if (this.formCrearEmpleado.valid)
      {
        // this.mostrarSpinner();
  
        let empleado = {
          nombre: this.nombre?.value,
          apellido: this.apellido?.value,
          dni: this.dni?.value,
          fechaNacimiento: this.fechaNacimiento?.value,
          descripcion: this.descripcion?.value,
          idArea: this.idArea?.value,
          desarrollador: this.desarrollador?.value
        };
        
        alert(empleado.nombre + empleado.dni + empleado.fechaNacimiento + empleado.descripcion + empleado.idArea + empleado.desarrollador);
      } else
      {
        this.formCrearEmpleado.markAllAsTouched();
      }
  }

  get nombre()
  {
    return this.formCrearEmpleado.get('nombre');
  }

  get apellido()
  {
    return this.formCrearEmpleado.get('apellido');
  }

  get dni()
  {
    return this.formCrearEmpleado.get('dni');
  }

  get descripcion()
  {
    return this.formCrearEmpleado.get('descripcion');
  }

  get desarrollador()
  {
    return this.formCrearEmpleado.get('desarrollador');
  }
  
  get idArea()
  {
    return this.formCrearEmpleado.get('idArea');
  }

  get fechaNacimiento()
  {
    return this.formCrearEmpleado.get('fechaNacimiento');
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
