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
  private clickTimeout = null;
  userName: any;
  userMobile: any;
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

  public setClickTimeout(callback) {
    // clear any existing timeout
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.clickTimeout = null;
      callback();
    }, 2000);
  }

  submitData() {
    if (this.clickTimeout) {
      this.setClickTimeout(() => {});
    } else {
      // if timeout doesn't exist, we know it's first click
      // treat as single click until further notice
      this.setClickTimeout(itemId => this.handleSingleClick());
    }
  }
  public handleSingleClick() {
    // 2 sec - deboucing time
    console.log(this.userName, this.userMobile);
    var dataSet = {
      name: this.userName,
      mobile: this.userMobile
    };
    this.shared.createTodos(dataSet).subscribe(
      data => {
        const res = JSON.parse(JSON.stringify(data));
        console.log(res);

        if (res.status === 200) {
          var filterData = {};
          var parseJson = res.data;
          filterData["name"] = parseJson.name;
          filterData["mobile"] = parseJson.mobile;
          filterData["id"] = parseJson.id;
          this.ngOnInit();
        }
      },
      error => {
        // this.output = JSON.stringify(error.error);
      }
    );
  }

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
