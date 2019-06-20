import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../model/photo';
import { Photos } from '../model/photos';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  loader: boolean = false;

  listPhoto: Array<Photo> = [];

  page: number = 1;

  tag: string;

  constructor(public httpClient: HttpClient) {
    console.log("from constructor ClientService")
  }

  search(tag: string) {
    let urlSearch = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=43524ac84f8f5f79e04fc54892535281&tags=${tag}&per_page=16&page=${this.page}&format=json&nojsoncallback=1`;
    this.httpClient.get(urlSearch).subscribe((next) => {
      let photos: Photos = Object.values(next)[0];
      // the next page
      let listResult: Array<Photo> = photos.photo
      console.log(listResult)
      if(listResult[0]){
        //get the image urls from flickr
        listResult.forEach(element => {
          element.urlImage = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`
          this.getSize(element)
          this.listPhoto.push(element)
        });
        //update the next page result
        this.page++;
      }else{
        alert(`There is no result for the search`)
      }
    },
      (error) => {
        console.log(error)
        alert(JSON.stringify(error))
      },
      () => {
        this.loader = false;
      }
    )
  }

  getSize(photo: Photo) {
    let sizeUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=43524ac84f8f5f79e04fc54892535281&photo_id=${photo.id}&format=json&nojsoncallback=1`
    this.httpClient.get(sizeUrl).subscribe((next) => {
      let format = Object.values(next)[0]
      let size = Object.values(format)[3]
      //size of the image (0-6)
      let labelBig = size[6]
      // get url to image
      photo.maxSizeUrl = labelBig.source
      //size of the image (0-6)
      let labelNormal = size[4]
      // get url to image
      photo.urlImage = labelNormal.source
      //size of the image (0-6)
      let labelSquare = size[1]
      // get url to image
      photo.minSizeUrl = labelSquare.source
    })
  }

  clean() {
    this.page = 1;
    this.listPhoto = [];
  }
}
