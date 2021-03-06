import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  userForm: FormGroup;
  CurrentArticle = '0';
  Articles: any;
show = false;
  Month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    alert('Attention, le Design de ce site est encore en travail');
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      Object: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
    const params = new HttpParams().set('Number', this.CurrentArticle);
      this.http.get(window.location.origin + '/GetArticle', {params})
      .subscribe((reponse) => {
        let tempMonth = reponse[0].Article.Date.substr(2, 2);
        if (tempMonth[0] === '0') {
        tempMonth = tempMonth[1];
        }
        // tslint:disable-next-line:max-line-length
        reponse[0].Article.Date = reponse[0].Article.Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[0].Article.Date.substr(0, 2);
        tempMonth = reponse[1].Article.Date.substr(2, 2);
        if (tempMonth[1] === '0') {
        tempMonth = tempMonth[1];
        }
        // tslint:disable-next-line:max-line-length
        reponse[1].Article.Date = reponse[1].Article.Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[1].Article.Date.substr(0, 2);

      this.Articles = reponse;
      });

  }
  getErrorMessage(field: string): string {
    const errors = {
      required: 'this field is required',
      email: 'this field must contain a valid email'
    };
    return Object.keys(this.userForm.controls[field].errors).map((key) => `Rule: ${errors[key]}`).toString();
  }

  SendMail() {

  const Data =  {
    'name' : this.userForm.controls.name.value,
    'email' : this.userForm.controls.email.value,
    'Object': this.userForm.controls.Object.value,
    'message': this.userForm.controls.message.value
    };
console.log('ready to send');
    this.http.post(window.location.origin + '/sendmail', Data).subscribe((result) => console.log(result));
    this.show = true;
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
        let tempMonth = reponse[0].Article.Date.substr(2, 2);
        if (tempMonth[0] === '0') {
        tempMonth = tempMonth[1];
        }
        // tslint:disable-next-line:max-line-length
        reponse[0].Article.Date = reponse[0].Article.Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[0].Article.Date.substr(0, 2);
        tempMonth = reponse[1].Article.Date.substr(2, 2);
        if (tempMonth[1] === '0') {
        tempMonth = tempMonth[1];
        }
        // tslint:disable-next-line:max-line-length
        reponse[1].Article.Date = reponse[1].Article.Date.substr(4, 2) + ' ' + this.Month[Number(tempMonth) - 1]  + ' 20' + reponse[1].Article.Date.substr(0, 2);
      this.Articles = reponse;
      });
      }

      Hide() {
       this.show = false;
      }
}
