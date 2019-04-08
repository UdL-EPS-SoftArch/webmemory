import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../login-basic/user';
import { PlayerService } from '../player.service';
import { AdminService } from '../admin.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  public totalUsers = 0;

  constructor(
    public router: Router,
    private playerService: PlayerService,
    private adminService: AdminService) {
  }

  ngOnInit() {
    forkJoin(
      this.playerService.getAll(),
      this.adminService.getAll())
    .subscribe(
        ([players, admins]) => {
          this.users = players.concat(admins).sort(
            (a: User, b: User) => a.username.localeCompare(b.username)
          );
          this.totalUsers = this.users.length;
        });
  }

  showSearchResults(users) {
    this.users = users;
  }
}
