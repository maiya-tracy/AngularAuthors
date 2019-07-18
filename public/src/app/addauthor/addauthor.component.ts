import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent implements OnInit {
  newAuthor: { name: "" };
  postErrors: { name: "" };

  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
    });
  }
  goHome() {
    this._router.navigate(['/home']);
  }
  addAuthor(): void {
    this._httpService.addAuthor(this.newAuthor).subscribe(data => {
      if (data['error']) {
        console.log("error creating author")
        this.postErrors['name'] = data['error']['errors']['name']['message']
      } else {
        console.log("added author", data);
        this.newAuthor = { name: "" }
        this._router.navigate(['/home']);
      }
    })

  }
}
