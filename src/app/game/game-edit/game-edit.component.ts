import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  public user: Game = new Game();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private gameService: GameService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.get(id).subscribe(
      game => this.user = game);
  }

  onSubmit(): void {
      this.gameService.update(this.user)
      .subscribe(
        (game: Game) => this.router.navigate([game.uri]));
  }
}
