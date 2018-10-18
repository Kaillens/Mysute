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
this.Articles.map((element) => {
  let tempMonth = element.Article.Date.substr(2, 2);
   if (tempMonth[1] === '0') {
   tempMonth = tempMonth[1];
   }
   // tslint:disable-next-line:max-line-length
   console.log(element.Article.Date.substr(2, 2));
   element.Article.Date = element.Article.Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + element.Article.Date.substr(0, 2);
 });

    }

Filter(Filter) {
  this.SelectedFilter = Filter;
  if (Filter === 'All') {
    const params = new HttpParams().set('Filter', Filter);
    this.http.get(window.location.origin + '/GetAllArticle').subscribe((reponse) => {
      this.Articles = reponse;
        });
  } else {
  console.log(Filter);
    const params = new HttpParams().set('Filter', Filter);
    this.http.get(window.location.origin + '/FilterArticle', {params})
    .subscribe((reponse) => {
  this.Articles = reponse;
    });
  }
  this.Articles.map((element) => {
    let tempMonth = element.Article.Date.substr(2, 2);
     if (tempMonth[1] === '0') {
     tempMonth = tempMonth[1];
     }
     // tslint:disable-next-line:max-line-length
     element.Article.Date = element.Article.Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + element.Article.Date.substr(0, 2);
   });

}
}
