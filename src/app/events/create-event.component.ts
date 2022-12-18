import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event, EventService } from './shared';

@Component({
  templateUrl: './create-event.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateEventComponent {
  isDirty = true;
  newEvent: Event;

  constructor(private router: Router, private eventService: EventService) {}

  cancel(): void {
    this.router.navigate(['/events']);
  }

  saveEvent(formsValues: Event): void {
    this.eventService.saveEvent(formsValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }
}
