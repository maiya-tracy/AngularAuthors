import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  currentAuthor = { "name": "" };
  postErrors = { "name": "" };
  authorID: any;
  // postErrors: "hello";

  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.authorID = params['id'];
      this.findAuthor(this.authorID)
    });
  }
  goHome() {
    this._router.navigate(['/home']);
  }
  findAuthor(authorID) {
    this.postErrors = {
      "name": ""
    }
    this._httpService.findOneAuthor(authorID).subscribe(data => {
      if(data['message'] == "Error"){
        console.log("There was def an error", data)
      } else {
        console.log("found one author", data);
        this.currentAuthor = data['data'];
        console.log("THis is the curent author",this.currentAuthor)
      }

    })
  }
  editAuthor(): void {
    this._httpService.editAuthor(this.currentAuthor).subscribe(data => {
      if (data['error']) {
        console.log("error editing author")
        this.postErrors['name'] = data['error']['errors']['name']['message']
      } else {
        console.log("edited author", data);
        this.currentAuthor = { name: "" }
        this._router.navigate(['/home']);
      }
    })
  }
}
