import { Component, Input } from '@angular/core';
import { Session } from '../shared';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent {
  @Input() sessions: Session[];
}
