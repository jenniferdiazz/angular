import { Component, OnInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // public posts: {
  //   id:string;
  //   titlePost:string;
  //   contentPost:string;
  //   imagePost:string;
  // }[]=[
  //   {
  //     id:'1',
  //     titlePost:'Post One',
  //     contentPost:'mi primer post',
  //     imagePost: 'https://picsum.photos/id/237/200/301'
  //   },
  //   {
  //     id:'2',
  //     titlePost:'Post second',
  //     contentPost:'mi segundo post',
  //     imagePost: 'https://picsum.photos/id/237/200/300'
  //   },
  //   {
  //     id:'3',
  //     titlePost:'Post One',
  //     contentPost:'mi primer post',
  //     imagePost: 'https://picsum.photos/id/237/200/401'
  //   },
  //   {
  //     id:'4',
  //     titlePost:'Post second',
  //     contentPost:'mi segundo post',
  //     imagePost: 'https://picsum.photos/id/237/200/400'
  //   },

  // ];
  //$-->significa que es un observable
  public posts$: Observable<PostI[]>;
  constructor(private postSvc: PostService) { }

  ngOnInit() {
    //llamamos al service y llamamos al metodos, nos subcribimos porque es un observable
    //this.postSvc.getAllPosts().subscribe(res => console.log('POSTS',res))
    this.posts$ = this.postSvc.getAllPosts();
  }

}
