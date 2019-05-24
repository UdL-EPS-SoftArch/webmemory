import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { Game } from '../game';

@Component({
  selector: 'app-game-create',
  templateUrl: '../game-form/game-form.component.html',
  styleUrls: ['../game-form/game-form.component.css']
})
export class GameCreateComponent implements OnInit {
  public game: Game;

  constructor(private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.game = new Game();
  }

  onSubmit(): void {
    this.gameService.create(this.game).subscribe(
      (game: Game) => this.router.navigate(['/games'])); // OVDJE STAVITI GAME.URI, STR ZA DETALJE IGRE
  }

}
