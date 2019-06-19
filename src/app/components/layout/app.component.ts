import { Component } from '@angular/core';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gallery Web Side';
  constructor(public clientService:ClientService){}
}
