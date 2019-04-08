import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PlayerService } from '../player.service';
import { AdminService } from '../admin.service';
import { User } from '../../login-basic/user';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html'
})

export class UserSearchComponent {
  @Input() users: User[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private playerService: PlayerService,
              private adminService: AdminService) {
  }

  performSearch(text: string): void {
    forkJoin(
      this.playerService.findByUsernameContaining(text),
      this.adminService.findByUsernameContaining(text))
    .subscribe(
      ([players, admins]) => {
        this.emitResults.emit(players.concat(admins).sort((a, b) => a.username.localeCompare(b.username)));
      });
  }
}

