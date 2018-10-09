import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit( ) {
  this.http.get('http://localhost:8012/GetTest')
  .subscribe((reponse) => console.log(reponse));
  }

}
