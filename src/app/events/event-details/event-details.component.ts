import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, Session } from '../shared';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding: 0, 20px;
      }
      .event-image {
        height: 100px;
      }
      a { cursor: pointer; }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  addMode = false;
constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.event = this.eventService.getEvent(+this.route.snapshot.params.id);
  }

  addSession(): void {
    this.addMode = true;
  }

  saveNewSession(session: Session): void {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession(): void {
    this.addMode = false;
  }
}
