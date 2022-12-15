import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from './shared';
import { EventService } from './shared/event.service';

@Injectable()
export class EventListResolver implements Resolve<Event[]> {
  constructor(private eventService: EventService) {}

  resolve(): Observable<Event[]> {
    return this.eventService.getEvents().pipe(map((events) => events));
  }
}
