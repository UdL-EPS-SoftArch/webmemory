import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../user/player.service';
import { AdminService } from '../user/admin.service';
import { forkJoin } from 'rxjs';
import { User } from '../login-basic/user';




@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

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
