import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';
import { FileI } from '../../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postCollection : AngularFirestoreCollection<PostI>;
  private filePath : any;
  private downloadURL: Observable<string>
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
    ) {
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
  public editPostById(post: PostI, newImage ?: FileI){
    if(newImage){
      this.uploadImage(post,newImage);
    }
    else{
        return this.postCollection.doc(post.id).update(post);
    }
    
  }

  public preAddAndUpdatePost(post:PostI, image:FileI):void{
    this.uploadImage(post,image);

  }
  
  private savePost(post: PostI){
    console.log('postSvc', post)
    //guardar y editar un post
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost : post.tagsPost
    };
    if(post.id){
      return this.postCollection.doc(post.id).update(postObj);
    }else{
      return this.postCollection.add(postObj);
    }
    
  }

  private uploadImage(post: PostI, image: FileI){
    this.filePath = `images/${image.name}`;
    const fileRef= this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe( urlImage =>{
          this.downloadURL = urlImage;
          //console.log('URL_IMAGE', urlImage);
          //console.log('POST', post);
          this.downloadURL=urlImage;
          this.savePost(post);

        });
      })
    ).subscribe();  
  }
}
