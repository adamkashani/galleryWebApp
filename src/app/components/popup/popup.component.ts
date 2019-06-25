import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit , OnDestroy{

  @Input()
  parentSubject: Subject<number>;

  indexPopup: number = 0;

  constructor(public clientService: ClientService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      this.indexPopup = event;
      this.ngxSmartModalService.open('popupModal');
    });
  }

  prev() {
    this.indexPopup--;
  }

  next() {
    this.indexPopup++;
  }

  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }
}
