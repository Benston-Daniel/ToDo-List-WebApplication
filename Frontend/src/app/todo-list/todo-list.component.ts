import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  tlist: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  todo: string = "";
  currentID = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllStudent();
  }

  getAllStudent() {
    this.http.get("http://localhost:3000/todolist")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.tlist = resultData.data;
      });
  }

  register() {
    let bodyData = {
      "todo": this.todo,
    };

    this.http.post("http://localhost:3000/todolist/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("List added Successfully");
      this.getAllStudent();
    });
  }

  setUpdate(data: any) {
    this.todo = data.todo;
    this.currentID = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      "todo": this.todo,
    };

    this.http.put("http://localhost:3000/todolist/update/" + this.currentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Todo List Updated");
      this.getAllStudent();
    });
  }

  save() {
    if (this.currentID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:3000/todolist/delete/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("List Deleted");
      this.getAllStudent();
    });
  }
}
