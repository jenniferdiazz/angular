import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postCollection : AngularFirestoreCollection<PostI>;
  constructor(private afs: AngularFirestore) {
    this.postCollection = afs.collection<PostI>('posts');
   }

  public getAllPosts():Observable<PostI[]>{
    return this.postCollection
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

  public deletePostById(post: PostI){
    return this.postCollection.doc(post.id).delete();
  }
  public editPostById(post: PostI){
    return this.postCollection.doc(post.id).update(post);
  }
}
