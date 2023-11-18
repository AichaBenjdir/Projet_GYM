import { Component, OnInit } from '@angular/core';
import { NavController , ToastController, AlertController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

import { AjouterPublicationModalPage } from '../ajouter-publication-modal/ajouter-publication-modal.page'
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
import Parse from 'parse';

@Component({
  selector: 'app-mon-profile',
  templateUrl: './mon-profile.page.html',
  styleUrls: ['./mon-profile.page.scss'],
})
export class MonProfilePage implements OnInit {

  username: string
  changeProfileImage: boolean = false
  profileImage: any

  Posts: any[]= [];
  likeColor: string;
  comment_content: string;
  ListeComments: any[] = [];
  ListeLikes: any[] = [];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, private camera: Camera, private imagePicker: ImagePicker) { 
    this.username = Parse.User.current().get('adherent').get('name')
    if(Parse.User.current().get('adherent').get('photo')!=null){
      this.profileImage = Parse.User.current().get('adherent').get('photo').url()
    }else{
      this.profileImage = "/assets/user.png"
    }
    this.likeColor="dark"
  }

  async getPosts(){
    this.Posts = []
    var q= new Parse.Query("Posts");

    q.include("adherent")
    q.include("likes_list")
    q.include("comments")
    q.descending("createdAt");

    q.equalTo("adherent", Parse.User.current().get('adherent'))

    const posts = await q.find();

    

    for (let i = 0; i < posts.length; i++) {
      var object = posts[i];

      var isHere = false

      for(let j = 0; j<object.get('likes_list').length;j++){
        if(object.get('likes_list')[j].id==Parse.User.current().get('adherent').id){
          isHere = true
          break
        }
      }

      if(isHere){
        this.likeColor="primary"
      }else{
        this.likeColor="dark"
      }

      var cont = false
      if(object.get('content')!=null){
        cont = true
      }

      this.Posts.push({
        post: object,
        id: object.id,
        date: object.get('createdAt'),
        adherent: object.get('adherent').get('name'),
        likes: object.get('likes_list'),
        nbr_likes: object.get('likes_list').length,
        likeColor : this.likeColor,
        comments: object.get('comments'),
        nbr_comments: object.get('comments').length,
        nbr_seances: object.get('nbr_seances'), 
        image: object.get('image').url(),
        show_comment: false,
        content: object.get('content'),
        show_content: cont     
      });
    } 

    console.log(this.Posts)
  }

  likePost(i){
    if(this.Posts[i].likeColor == "primary"){
      console.log("removed")
      this.Posts[i].likes.splice(this.Posts[i].likes.indexOf(Parse.User.current().get('adherent')), 1)
      this.Posts[i].likeColor="dark"
      this.Posts[i].nbr_likes -= 1
    }else{
      console.log("added")
      this.Posts[i].likes.push(Parse.User.current().get('adherent'))
      this.Posts[i].likeColor="primary"
      this.Posts[i].nbr_likes += 1
    }

    this.Posts[i].post.set('likes_list', this.Posts[i].likes)
    this.Posts[i].post.save()
  }

  comment(i){
    if(this.Posts[i].show_comment==false){
      this.Posts[i].show_comment=true
    }else{
      this.Posts[i].show_comment=false
    }

    this.getComments(i)
  }

  addComment(i){
    var Comments = new Parse.Object.extend("Comments");
    const comment = new Comments();
    comment.set("content", this.comment_content)
    comment.set("adherent", Parse.User.current().get('adherent'))
    comment.save().then((com) => {
      this.comment_content = ""
      var img = null
      if(com.get('adherent').get('photo')==null){
        img = "/assets/user.png"
      }else{
        img = com.get('adherent').get('photo').url()
      }
      this.Posts[i].comments.push(com)
      this.Posts[i].nbr_comments+=1
      this.Posts[i].post.set('comments', this.Posts[i].comments)
      this.Posts[i].post.save() 
      this.ListeComments.push({
        id: com.id,
        comment: com,
        adherent: com.get("adherent"),
        adherent_image: img,
        nom_adherent: com.get("adherent").get("name"),
        content: com.get("content")        
      })
    }, (error) => {
      alert('Failed to create new object, with error code: ' + error.message);
    });
  }

  getComments(j){
    this.ListeComments = []
    for (let i = 0; i < this.Posts[j].comments.length; i++) {
      var object = this.Posts[j].comments[i];

      var img = null
      if(object.get('adherent').get('photo')==null){
        img = "/assets/user.png"
      }else{
        img = object.get('adherent').get('photo').url()
      }


      this.ListeComments.push({
        id: object.id,
        comment: object,
        adherent: object.get("adherent"),
        adherent_image: img,
        nom_adherent: object.get("adherent").get("name"),
        content: object.get("content")        
      });
    }
  }

  async showLikes(j){

    var msg = "<ion-list lines='none'>"

    this.ListeLikes = []
    for (let i = 0; i < this.Posts[j].likes.length; i++) {
      var object = this.Posts[j].likes[i];

      var img = null
      if(object.get('photo')!=null){
        img = object.get('photo').url()
      }else{
        img = "/assets/user.png"
      }

      this.ListeLikes.push({
        id: object.id,
        nom_adherent: object.get("name"), 
        adherent_image: img,      
      });

      msg = msg+ "<ion-item *ngFor='let like of ListeLikes ; let j=index;'>\
      <ion-avatar slot='start'>\
          <img src="+img+">\
      </ion-avatar>\
      <ion-label>\
        <h5><b>"+object.get("name")+"</b></h5>\
      </ion-label>\
    </ion-item>"
    }

    var msg = msg+"</ion-list>"

    const alert = await this.alertCtrl.create({
      header: "Personnes ayant réagi",
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  async addImage(){
    console.log("clicked")
    const modal = await this.modalCtrl.create({
      component: AjouterPublicationModalPage
    });

    await modal.present();
  }

  async toastFun(msg: string){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  changePhoto(){
    if(this.changeProfileImage){
      this.changeProfileImage = false
    }else{
      this.changeProfileImage = true
    }
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.profileImage = 'data:image/jpeg;base64,' + imageData;
     var parseFile = new Parse.File("photo.jpg", { base64: this.profileImage });
     Parse.User.current().get('adherent').set("photo", parseFile)
     Parse.User.current().get('adherent').save()
    }, (err) => {
     // Handle error
    });
  }

  pickPicture(){

    const options: ImagePickerOptions = {
      quality: 100,
      outputType: 1,
      maximumImagesCount: 1
    }

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.profileImage = 'data:image/jpeg;base64,' + results[0]
          var parseFile = new Parse.File("photo.jpg", { base64: this.profileImage });
          Parse.User.current().get('adherent').set("photo", parseFile)
          Parse.User.current().get('adherent').save()
      }
    }, (err) => { });
  }


  async openOptions(i){
    const alert = await this.alertCtrl.create({
      header: "Options",
      message: "Que vous voulez faire pour cette publication?",
      buttons: [
        {
          text: 'Modifier',
          role: 'update',
          handler: (blah) => {
            this.updatePost(i)
          }
        }, {
          text: 'Supprimer',
          role: 'delete',
          handler: () => {
            this.deletePost(i)
          }
        }]
    });

    await alert.present();
  }

  async updatePost(i){
    const modal = await this.modalCtrl.create({
      component: AjouterPublicationModalPage,
      componentProps: { 
        post: this.Posts[i].post
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data.post!=null){
      this.Posts[i].post = data.post  
      this.Posts[i].image =  data.post.get('image').url()
      this.Posts[i].content = data.post.get('content')
    }
  }


  deletePost(i){
    this.Posts[i].post.destroy().then((myObject) => {
      for (let j = 0; j < this.Posts[i].comments.length; j++) {
        var object = this.Posts[i].comments[j];
        object.destroy()
      }
      this.Posts.splice(i, 1)
    }, (error) => {
      // The delete failed.
      // error is a Parse.Error with an error code and message.
    });
  }


  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPosts()
  }

}
