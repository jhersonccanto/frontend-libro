import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Libro } from '../models/libro';
import { LibroService } from '../services/libro.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [HomeComponent,TableModule,ButtonModule,DialogModule,RouterModule,InputTextModule,FormsModule,ConfirmDialogModule,ToastModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  libros: Libro[]=[];
  titulo:string='';
  opc:string='';
  libro= new Libro();
  op = 0;
  visible: boolean = false; 
 isDeleteInProgress: boolean = false;

  constructor(
    private libroService: LibroService, 
    private messageService: MessageService
  ) {}

  ngOnInit():void{
    this.listarLibros();
  }

  listarLibros(){
    this.libroService.getLibros().subscribe((data)=>{
      this.libros=data;
    });
  }

  hola(id:number){
    console.log('button clicked '+id);
  }
    showDialogCreate() {
      this.titulo="Crear Libro"
      this.opc="Guardar";   
      this.op=0;
      this.visible = true; // Cambia la visibilidad del diálogo
    }
    showDialogEdit(id:number) {
      this.titulo="Editar Libro"
      this.opc="Editar"; 
     this.libroService.getLibroById(id).subscribe((data)=>{
        this.libro=data; 
        this.op=1;     
     });    
      this.visible = true; // Cambia la visibilidad del diálogo
    }
    deleteLibro(id: number) {
      this.isDeleteInProgress = true;
      this.libroService.deleteLibro(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Correcto',
            detail: 'Libro eliminado',
          });
          this.isDeleteInProgress = false;
          this.listarLibros();
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el libro',
          });
        },
      });
    }
    addLibro():void{ 
      this.libroService.createLibro(this.libro).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Libro Registrado',
          });
          this.listarLibros();
          this.op=0;
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo Agregar el Libro',
          });
        },
      });    
      this.visible = false;
    }
    editLibro(){
      this.libroService.updateLibro(this.libro,this.libro.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Libro Editado',
          });
          this.listarLibros();
          console.log(this.libro.id+' '+this.libro.titulo+' '+this.libro.paginas+' '+this.libro.edicion+' '+this.libro.estado);
          this.op=0;
        },
        error: () => {
          this.isDeleteInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo Editar el libro',
          });
        },
      });    
      this.visible = false;
    }
    opcion():void{
      if(this.op==0){
        this.addLibro();
        this.limpiar();
      }else if(this.op==1){
        console.log("Editar");
        this.editLibro();
        this.limpiar();
      }else{
        console.log("No se hace nada");
        this.limpiar();
      }
      
    }
   limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.libro.id=0;
    this.libro.titulo='';
    this.libro.paginas='';
    this.libro.edicion='';
    this.libro.estado='';
   }
}
