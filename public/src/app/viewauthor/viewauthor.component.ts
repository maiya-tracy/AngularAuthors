import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-viewauthor',
  templateUrl: './viewauthor.component.html',
  styleUrls: ['./viewauthor.component.css']
})
export class ViewauthorComponent implements OnInit {

  authors: [];

  constructor( private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService ) { }



  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
        console.log(params['id'])
    });
    this.getAuthorsFromService();
    // this.test = "Hello this is broken! :-()";
  }
  goHome() {
    this._router.navigate(['/home']);
  }
  getAuthorsFromService() {
    this._httpService.getAuthors().subscribe(data => {
      console.log("got authors", data)
      this.authors = data['data'];
    })
  }
  deleteAuthorFromService(id) {
    this._httpService.deleteAuthor(id).subscribe(data => {
      console.log("deleted author", data)
      this.getAuthorsFromService()
    })
  }
}
