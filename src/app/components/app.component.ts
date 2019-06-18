import { Component } from '@angular/core';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gallery Web App';
  constructor(public clientService:ClientService){}

  search(tag:string){
    this.clientService.clean();
    this.clientService.tag=tag;
    this.clientService.search(this.clientService.tag);
  }
}
