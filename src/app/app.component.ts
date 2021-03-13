import { Component, Output, EventEmitter, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { SharedService } from "./services/shared.service";

import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  userName: any;
  userLanguage: any;
  userEmail: any;

  todoForm = this.formBuilder.group({
    name: new FormControl("", [Validators.required]),
    language: new FormControl("", [Validators.required])
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private shared: SharedService
  ) {}
  onSubmit() {}

  ngOnInit() {}
}
