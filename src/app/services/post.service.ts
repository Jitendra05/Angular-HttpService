
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { AppError } from '../common/app-error';

@Injectable()
export class PostService {
  private URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(this.URL);
  }

  createPost(post) {
    return this.http.post(this.URL, JSON.stringify(post));
  }

  updatePost(post) {
    return this.http.put(this.URL + "/" + post.id, JSON.stringify(post));
  }


  deletePost(id) {
    return this.http.delete(this.URL + "/" + id)
      .catch((error: Response) => {
        return Observable.throw(new AppError(error));

      })
  }
}
