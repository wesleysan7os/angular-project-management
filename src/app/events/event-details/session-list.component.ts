import { Component, Input, OnChanges } from '@angular/core';
import { Session } from '../shared';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: Session[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: Session[] = [];

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ?
        this.visibleSessions.sort(sortByNameAsc) :
        this.visibleSessions.sort(sortByVotesDsc);
    }
  }

  filterSessions(filterBy: string): void {
    if (filterBy === 'all') {
      this.visibleSessions = [...this.sessions];
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filterBy;
      });
    }
  }
}

function sortByNameAsc(s1: Session, s2: Session): number {
  if (s1.name > s2.name) { return 1; }
  else if (s1.name === s2.name) { return 0; }
  else { return -1; }
}

function sortByVotesDsc(s1: Session, s2: Session): number {
  return s2.voters.length - s1.voters.length;
}
