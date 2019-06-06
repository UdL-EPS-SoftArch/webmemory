import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-edit',
  templateUrl: '../game-form/game-form.component.html',
  styleUrls: ['../game-form/game-form.component.html']
})
export class GameEditComponent implements OnInit {
  public game: Game = new Game();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private gameService: GameService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.get(id).subscribe(
      game => this.game = game);
  }

  onSubmit(): void {
      this.gameService.update(this.game)
      .subscribe(
        (game: Game) => this.router.navigate(["/games"])); 
  }

  GenerateSeed(): void{
    this.game.boardSeed = "";

    var nums = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12],
    ranNums = [],
    i = nums.length,
    j = 0;

    while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(nums[j]);
    nums.splice(j,1);
    }

     for (let i = 0; i < 24; i++) {
        this.game.boardSeed += window.location.hash = String(ranNums[i]) + " ";
    }
  }
}
