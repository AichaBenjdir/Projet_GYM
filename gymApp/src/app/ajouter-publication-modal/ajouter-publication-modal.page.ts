import { Component, OnInit, Input } from '@angular/core';
import { NavController , ToastController, AlertController, ModalController, NavParams  } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import Parse from 'parse';

@Component({
  selector: 'app-ajouter-publication-modal',
  templateUrl: './ajouter-publication-modal.page.html',
  styleUrls: ['./ajouter-publication-modal.page.scss'],
})
export class AjouterPublicationModalPage implements OnInit {

  post: any

  username: string
  content: string
  imageUrl: any
  show_image: boolean = false
  nb_rows: string = "100%"

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, private camera: Camera, private imagePicker: ImagePicker, private navParams: NavParams) { 
    this.username = Parse.User.current().get('adherent').get('name')
    this.post = this.navParams.get('post');
    console.log(this.post)
    if (this.post!=null){
      this.content = this.post.get("content")
      this.imageUrl = this.post.get("image").url()
      this.show_image = true
      this.nb_rows = "3"
    }
  }

  async closeModal(){
    await this.modalCtrl.dismiss()
  }

  publish(){
    var parseFile = new Parse.File("justif.jpg", { base64: this.imageUrl });
    var Post = new Parse.Object.extend("Posts");
    var post = new Post();
    if(this.post!=null){
      post = this.post
      post.set("content", this.content)
    }
    post.set("adherent", Parse.User.current().get('adherent'))
    if(this.post==null){
      post.set("likes_list", [])
      post.set("comments", [])
    }
    if(this.imageUrl != this.post.get("image").url()){
      post.set("image", parseFile)
    }
    if(this.content!='' && this.content!=null){
      post.set("content", this.content)
    }
    post.save().then((po) => {
      this.content = ""
      this.modalCtrl.dismiss({post: po})
    }, (error) => {
      alert('Failed to create new object, with error code: ' + error.message);
    });
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
     this.imageUrl = 'data:image/jpeg;base64,' + imageData;
     this.show_image = true
     this.nb_rows = "3"
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
          this.imageUrl = 'data:image/jpeg;base64,' + results[0]
          this.show_image = true
          this.nb_rows = "3"
      }
    }, (err) => { });
  }

  ngOnInit() {
  }

}
