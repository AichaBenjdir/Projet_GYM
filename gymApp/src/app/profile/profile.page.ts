import { Component, OnInit } from '@angular/core';
import { NavController , ToastController, AlertController, ModalController } from '@ionic/angular';

import { AjouterPublicationModalPage } from '../ajouter-publication-modal/ajouter-publication-modal.page'
import Parse from 'parse';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string
  user_email: string
  profileImage: string

  Posts: any[]= [];
  likeColor: string;
  comment_content: string;
  ListeComments: any[] = [];
  ListeLikes: any[] = [];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController) { 
    //this.getPosts()
    this.username = Parse.User.current().get('adherent').get('name')
    this.user_email = Parse.User.current().get('email')
    if(Parse.User.current().get('adherent').get('photo')==null){
      this.profileImage = "/assets/user.png"
    }else{
      this.profileImage = Parse.User.current().get('adherent').get('photo').url()
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

      var img = null
      if(object.get('adherent').get('photo')!=null){
        img = object.get('adherent').get('photo').url()
      }else{
        img = "/assets/user.png"
      }

      this.Posts.push({
        post: object,
        id: object.id,
        date: object.get('createdAt'),
        adherent: object.get('adherent').get('name'),
        adherent_image: img,
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

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.navigateForward('home');
    }, err => {
      console.log('Error logging out', err);

      this.toastFun(err.message)
    })
  }

  goToProfile(){
    this.navCtrl.navigateForward('mon-profile')    
  }

  goToAbonnements(){
    this.navCtrl.navigateForward('liste-abonnements')    
  }

  goToSeances(){
    this.navCtrl.navigateForward('liste-seances')    
  }

  goToEvenements(){
    this.navCtrl.navigateForward('liste-evenements')    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPosts()
  }

}
