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

  constructor(public httpClient: HttpClient) {
    console.log("from constructor ClientService")
  }

  search(tag: string) {
    let urlSearch = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=43524ac84f8f5f79e04fc54892535281&tags=${tag}&per_page=16&page=${this.page}&format=json&nojsoncallback=1`;
    this.httpClient.get(urlSearch).subscribe((next) => {
      let photos: Photos = Object.values(next)[0];
      console.log(photos)
      // the next page
      let listResult: Array<Photo> = photos.photo;
      console.log(listResult)
      if (listResult[0]) {
        //get the image urls from flickr
        listResult.forEach(async element => {
          const resolve = await this.getSize(element)
          Object.assign(element, resolve)
          console.log(`from resolve : ${resolve}`)
          this.listPhoto.push(element)
        });
        //update the next page result
        this.page++;
      } else {
        alert(`There is no result for the search`)
      }
    },
      (error) => {
        console.log(error);
        alert(JSON.stringify(error));
      },
      () => {
        this.loader = false;
      }
    )
  }

  async getSize(photo: Photo) {
    return new Promise((resolve, reject) => {
      let sizeUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=43524ac84f8f5f79e04fc54892535281&photo_id=${photo.id}&format=json&nojsoncallback=1`
      this.httpClient.get(sizeUrl).subscribe((next) => {
        let format = Object.values(next)[0];
        let size = Object.values(format)[3];
        let labelBig = size[6];
        let labelNormal = size[4]
        let labelSquare = size[1]
        return resolve({ maxSizeUrl: labelBig.source, urlImage: labelNormal.source, minSizeUrl: labelSquare.source })
      });
    })
  }

  clean() {
    this.page = 1;
    this.listPhoto = [];
  }
}
