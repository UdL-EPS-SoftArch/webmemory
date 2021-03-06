import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-delete',
  templateUrl: './game-delete.component.html',
  styleUrls: ['./game-delete.component.css']
})
export class GameDeleteComponent implements OnInit {

  public game: Game = new Game();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService) { }

    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.gameService.get(id).subscribe(
        game => this.game = game);
    }

    delete() {
      this.gameService.delete(this.game).subscribe(
        () => this.router.navigate(['games']));
    }
}
