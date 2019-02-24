import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/core/services/events-service';

@Component({
  selector: 'app-obituario',
  templateUrl: './obituario.component.html',
  styleUrls: ['./obituario.component.scss']
})
export class ObituarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    EventsService.get('BREADCRUMB').emit({show: true, name: "OBITUÁRIO"});
  }

}
