import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  public games: Game[] = [];
  public totalGames = 0;

  constructor(public router: Router,
    private gameService: GameService) {
  }

  ngOnInit() {
      this.gameService.getAll()
    .subscribe(
        (games: Game[]) => {
          this.games = games;

          this.totalGames = this.gameService.totalElement();
        });
  }

}
