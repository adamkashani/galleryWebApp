import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(public clientService: ClientService,public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  onScroll() {
    console.log(`scroling....`)
    this.clientService.search(this.clientService.tag)
  }

  switchMode(index: number) {
    console.log(index)
    this.clientService.indexPopup = index;
    this.ngxSmartModalService.open('myModal');
  }

  prev(){
    this.clientService.indexPopup--;
  }
  next(){
    this.clientService.indexPopup++;
  }
}
