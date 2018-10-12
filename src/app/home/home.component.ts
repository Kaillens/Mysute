import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CurrentArticle = '0';
Articles: any;
Month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const params = new HttpParams().set('Number', this.CurrentArticle);
    this.http.get('http://localhost:8012' + '/GetArticle', {params})
    .subscribe((reponse) => {
      let tempMonth = reponse[0].Date.substr(2, 2);
      if (tempMonth[0] === '0') {
      tempMonth = tempMonth[1];
      }
      reponse[0].Date = reponse[0].Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[0].Date.substr(0, 2);
      tempMonth = reponse[1].Date.substr(2, 2);
      if (tempMonth[1] === '0') {
      tempMonth = tempMonth[1];
      }
      reponse[1].Date = reponse[1].Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[1].Date.substr(0, 2);
this.Articles = reponse;
    });
  }
onArrow(side: string) {

if (side === 'right') {
  if (this.CurrentArticle === '12') {
    this.CurrentArticle = '0';
  } else {
    this.CurrentArticle = (Number(this.CurrentArticle) + 2).toString();
  }
} else {
  if (this.CurrentArticle === '0') {
    this.CurrentArticle = '12';
  } else {
    this.CurrentArticle = (Number(this.CurrentArticle) - 2).toString();
  }
}
const params = new HttpParams().set('Number', this.CurrentArticle);
this.http.get(window.location.origin + '/GetArticle', {params})
.subscribe((reponse) => {
  let tempMonth = reponse[0].Date.substr(2, 2);
  if (tempMonth[0] === '0') {
  tempMonth = tempMonth[1];
  }
  reponse[0].Date = reponse[0].Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[0].Date.substr(0, 2);
  tempMonth = reponse[1].Date.substr(2, 2);
  if (tempMonth[1] === '0') {
  tempMonth = tempMonth[1];
  }
  reponse[1].Date = reponse[1].Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[1].Date.substr(0, 2);
this.Articles = reponse;
});

}
    }


