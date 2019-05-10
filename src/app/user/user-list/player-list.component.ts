import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { Sort } from 'angular4-hal-aot';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html'
})
export class PlayerListComponent implements OnInit {
  public players: Player[] = [];
  public pageSize = 10;
  public page = 1;
  public totalPlayers = 0;
  private sorting: Sort[] = [{ path: 'username', order: 'ASC' }];

  constructor(
    public router: Router,
    private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.getAll({size: this.pageSize, sort: this.sorting}).subscribe(
        (players: Player[]) => {
          this.players = players;
          this.totalPlayers = this.playerService.totalElement();
        });
  }

  changePage() {
    this.playerService.page(this.page - 1).subscribe(
      (players: Player[]) => this.players = players);
  }
}
