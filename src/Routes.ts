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
        path: 'Home',
        component: AboutComponent
    },
    {
        path: '',
        redirectTo: '/Home',
        pathMatch: 'full'
    },
    {
        path: 'Article',
        component: ArticleComponent
    },
    { path: '**', redirectTo: '/Home',
    pathMatch: 'full' }

];
