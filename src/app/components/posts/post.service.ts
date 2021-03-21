import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) { }

  public getAllPosts():Observable<PostI[]>{
    return this.afs.collection('posts')
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a =>{
          //extraer los posts y asociarlos al id qie corresponda
          const data= a.payload.doc.data() as PostI;
          const id = a.payload.doc.id;
          //data del post + id
          return { id, ...data};

        }))
    )
  }

  public getOnePost(id: PostI): Observable<PostI>{
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }
}
