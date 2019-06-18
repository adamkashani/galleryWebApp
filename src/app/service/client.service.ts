import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../model/photo';
import { Photos } from '../model/photos';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  listPhoto: Array<Photo> = [];

  page: number = 1;

  tag: string;

  constructor(public httpClient: HttpClient) {
    console.log("from constructor ClientService")
    // this.search('cats');
  }

  search(tag: string) {
    let urlSearch = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d25153be5c89fddc9fffdf012b835027&tags=${tag}&per_page=7&page=${this.page}&format=json&nojsoncallback=1`;
    this.httpClient.get(urlSearch).subscribe((next) => {
      console.log(Object.values(next)[0])
      let photos: Photos = Object.values(next)[0];
      let listResult: Array<Photo> = photos.photo
      console.log(listResult)

      listResult.forEach(element => {
        element.urlImage = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`
        this.listPhoto.push(element)
      });

      //update the next page result
      this.page++;
    },
      (error) => {
        console.log(error)
        alert(JSON.stringify(error))
      })
  }

  clean() {
    this.page = 1;
    this.listPhoto = [];
  }
}
