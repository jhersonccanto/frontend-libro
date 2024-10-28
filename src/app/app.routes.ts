import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './libro/libro.component';

export const routes: Routes = [
    { 
        path: '', //el vacio en comillas es la ruta raíz, url principal http://localhost:4200///
        component: HomeComponent, //nombre del componente y acceso y muestra de esta ruta//
        title: 'home' //titulo de la pestana del navegador
    },
    { 
        path: 'libro', //aqui es el nombre para conectar con el html con routerlink es el http://localhost:4200/prod//
        component: LibroComponent, //nombre del componente//
        title: 'libro'  //titulo de la pagina en la pestaña//
    },
    { 
        path: '**', //ruta comodin o de error, para rutas invalidas que no estan definidas en routes
        redirectTo: '', //redirige cualquier ruta no valida a la raiz de la aplicacion, al homecomponent. 
        pathMatch: 'full', //Especifica que Angular debe hacer coincidir la ruta completa. Si la URL completa no coincide con ninguna otra ruta, entonces se redirige.
    }

];
