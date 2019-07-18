import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addAuthor(newAuthor) {
    return this._http.post('/authors', newAuthor)
  }
  deleteAuthor(authorID) {
    return this._http.delete(`/authors/${authorID}`)
  }
  editAuthor(currentAuthor) {
    return this._http.put(`/authors/${currentAuthor._id}`, currentAuthor)
  }
  getAuthors() {
    return this._http.get('/authors')
  }
  findOneAuthor(authorID) {
    return this._http.get(`/authors/${authorID}`)
  }
}
