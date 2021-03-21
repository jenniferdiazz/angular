import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { PostI } from '../../../shared/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // public post:{
  //   id:string;
  //   titlePost:string;
  //   contentPost:string;
  //   imagePost:string;
  // } ={
  //   id:'1',
  //   titlePost:'Post One',
  //   contentPost:'Hola mundo',
  //   imagePost:'https://picsum.photos/id/237/200/201'
  // };

  public post$: Observable<PostI>;
  constructor( private route:ActivatedRoute, private postSvc: PostService) { }

  ngOnInit() {
    //viene de app-routing.module.ts
    const idPost = this.route.snapshot.params.id;
    console.log("post");
    this.post$= this.postSvc.getOnePost(idPost);
  }

}
