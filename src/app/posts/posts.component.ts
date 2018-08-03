import { Component, OnInit } from '@angular/core';

import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts()
      .subscribe(
        response => {
          this.posts = response.json();
        },
        error => {
          alert('An Unexpected error occured!!');
          console.log(error);
        });
  }

  createPost(input: HTMLInputElement) {
    let postObj = { title: input.value };
    this.postService.createPost(JSON.stringify(postObj))
      .subscribe(
        response => {
          postObj['id'] = response.json().id;
          this.posts.splice(0, 0, postObj);
        },
        (error:Response) => {
          if(error.status === 400) {
            // this.form.setError('invalid input');
          }
          else {
            alert('An Unexpected error occured!!');
            console.log(error);
          }

        });
  }

  updatePost(post) {
    this.postService.updatePost(post)
      .subscribe(
        response => {
          console.log(response.json());
        },
        error => {
          alert('An Unexpected error occured!!');
          console.log(error);
        });
  }

  deletePost(post) {
    this.postService.deletePost(345)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        },
        (error:Response) => {
          if(error.status === 404)
            alert('This post has already been deleted!!');
          else {
            alert('An Unexpected error occured!!');
            console.log(error);
          }
        });
  }
}
