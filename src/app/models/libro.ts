export class Libro {
    id:number;
    titulo:string;
    paginas:string;
    edicion:string;
    estado:string;

    constructor(id: number = 0, titulo: string = '', paginas: string = '', edicion: string = '', estado: string = '') {
      this.id = id;
      this.titulo = titulo;
      this.paginas = paginas;
      this.edicion = edicion;
      this.estado = estado;
    }
}
