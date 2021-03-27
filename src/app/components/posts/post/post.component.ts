import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public posts$: Observable<PostI[]>;
  @Input() post: PostI;
  constructor(private postSvc: PostService) { }

  ngOnInit() {
    //llamamos al service y llamamos al metodos, nos subcribimos porque es un observable
    //this.postSvc.getAllPosts().subscribe(res => console.log('POSTS',res))
    //this.posts$ = this.postSvc.getAllPosts();
  }




}
