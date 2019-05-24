import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';


@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  private id: Int32Array;
  public game: Game = new Game();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService) { }

    ngOnInit() {
      this.id = this.route.snapshot.params.id; // CHECK IF THIS IS CORRECT
      this.gameService.get(this.id).subscribe(
        game => this.game = game);
    }

    delete() {
      this.gameService.delete(this.game).subscribe(
        () => this.router.navigate(['games']));
    }

}
