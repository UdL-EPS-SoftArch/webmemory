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
  private randomNumber: number;

  constructor(private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.game = new Game();
  }

  onSubmit(): void {
    this.gameService.create(this.game).subscribe(
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

//Explanation of BoardSeed

//We have 12 cards and each card will be represented in a an array [0] = pikachu, [1] = mario, etc..
//The array will consist of 12 elements each linked with a card
//Once we generate the seed which will have 24 elements due to the repetetitive cards the instantiating of the board will be easy

//EXAMPLE:
//CardArray[12] = pikachu, mario, jigglypuff, cardX, etc..
//Board Seed: 6 3 5 5 7 1 2 8 8 3 12 9 2 11 12 4 11 6 4 1 10 7 10 9 

//The board will be generated and the card6 will be first then card3, card5, card5, etc..
//This will allow us to keep a history of replays of the games.
