import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { all } from 'q';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  Articles: any;
 SelectedFilter: string;
  Month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  ngOnInit() {
    this.SelectedFilter = 'All';
    this.http.get(window.location.origin + '/GetAllArticle')
    .subscribe((reponse) => {
this.Articles = reponse;
    });
  }

Filter(Filter) {
  console.log(Filter);
  this.SelectedFilter = Filter;
  if (Filter === 'Stages') {
    const params = new HttpParams().set('Filter', `$or: [{'Article.site': DragOnSlide}, {'Article.site': Planète Chocolat}]`);
    this.http.get(window.location.origin + '/FilterArticle', {params})
    .subscribe((reponse) => {
  this.Articles = reponse;
    });
  } else if (Filter === 'All') {
    const params = new HttpParams().set('Filter', '');
    this.http.get(window.location.origin + '/GetAllArticle')
    .subscribe((reponse) => {
      this.Articles = reponse;
        });
  } else {
    const params = new HttpParams().set('Filter', ` 'Article.site' : ${Filter}`);
    this.http.get(window.location.origin + '/FilterArticle', {params})
    .subscribe((reponse) => {
  this.Articles = reponse;
    });


}
}
}
