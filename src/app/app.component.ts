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
  userMobile: any;
  userEmail: any;
  tableData: any = [];
  showEditTable: boolean = false;
  editRowID: any = "";

  todoForm = this.formBuilder.group({
    name: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.required])
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private shared: SharedService
  ) {}
  submitData() {}

  ngOnInit() {
    this.tableData = [
      { id: 1, name: "Mahi", mobile: "456465", email: "mahi@gmail.com" },
      { id: 2, name: "Alice", mobile: "458765", email: "Alice@gmail.com" },
      { id: 3, name: "Bob", mobile: "456448", email: "Bob@gmail.com" }
    ];
  }
  Edit(val) {
    this.editRowID = val;
  }
}
