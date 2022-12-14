import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from './shared/event.service';

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) {}

  resolve(): Observable<any> {
    return this.eventService.getEvents().pipe(map((events) => events));
  }
}
