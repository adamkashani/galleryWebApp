import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Router} from '@angular/router';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { Photo } from 'src/app/model/photo';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(public clientService:ClientService , private _lightbox: Lightbox) { }

  ngOnInit() {
  }

  onScroll(){
    console.log(`scroling....`)
    this.clientService.search(this.clientService.tag)
  }

  switchMode(index : number){
    console.log(index)
    const albums : Array<IAlbum> = this.createAlbumList(this.clientService.listPhoto)
    console.log(`the albums array : ` , albums)
     // open lightbox
     this._lightbox.open(albums , index);
  }

  createAlbumList(list : Array<Photo>):Array<IAlbum>{
    const albums : Array<IAlbum> = []
    list.forEach(element => {
       let album = {src:element.urlImage , thumb:element.urlImage}
       albums.push(album)
    });
    return albums;
  }
}
