import { Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ProjectComponent } from './app/project/project.component';
import { ArticleComponent } from './app/article/article.component';
import { AboutComponent } from './app/about/about.component';
import { ContactComponent } from './app/contact/contact.component';
import { ErreurComponent } from './app/erreur/erreur.component';


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'Contact',
        component: ContactComponent
    },
    {
        path: 'Erreur',
        component: ErreurComponent
    },


];
