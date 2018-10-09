import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  userForm: FormGroup;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      Object: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
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
    this.http.post(process.env.PORT + '/sendmail', Data).subscribe((result) => console.log(result));

    }
  }

