import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { HomeService } from './home.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private posts: any;
  private error: any;
  private newPost: string;
  private userId: string;
  private jwtToken: string;
  private comment: string[];
  
  constructor(private router: Router, private homeService: HomeService, private gblService: GlobalService) {
    this.userId = localStorage.getItem('userId');
    this.jwtToken = localStorage.getItem('jwtToken');
    if (localStorage.getItem('jwtToken') == null) this.router.navigate(['/login']); 
  }

  ngOnInit() {
    this.homeService.getPosts().subscribe(
      response => { this.posts = response; },
      error => { this.error = error; }
    )
  }

  createPost() {
    let body = {};
    body['content'] = this.newPost;
    this.newPost = '';
    body['user'] = this.gblService.userId;
    console.log(body)
    this.homeService.createPost(body).subscribe(
      response => this.renderPost(response),
      error => this.error = error
    );
  }

  renderPost(post: any) {
    this.posts.unshift(post);
  }

  renderComments(comment: any, post: any) {
    if(post.comments == undefined) {
      post.comments = [];
    }
    post.comments.push(comment);
  }

  addComment(post, i) {
    let body = {};
    body['content'] = post.comment;
    post.comment = '';
    body['user'] = this.userId;
    body['postId'] = post._id;
    this.homeService.addComment(body).subscribe(
      response => this.renderComments(response, post),
      error => this.error = error
    );
  }

}
