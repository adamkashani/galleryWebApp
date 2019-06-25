import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  tag: string = '';
  parentSubject: Subject<number> = new Subject();

  constructor(public clientService: ClientService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  search(tag: string) {
    if (tag.length > 0) {
      if (tag != this.tag) {
        this.clientService.loader = true;
        this.clientService.clean();
        this.tag = tag;
        this.clientService.search(this.tag);
      }
    } else {
      alert(`you must insert text to the input`)
    }
  }

  onScroll() {
    console.log(`scroling....`)
    this.clientService.loader = true;
    this.clientService.search(this.tag)
  }

  switchMode(index: number) {
    this.parentSubject.next(index);
  }
}
