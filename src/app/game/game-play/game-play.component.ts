import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  public game: Game = new Game();
  //This could be one array, but I am new to angualar and | slice 0:6 - 6:12 was not working, didn't have time to learn pipes
  public images1: String[] = new Array();
  public images2: String[] = new Array();
  public images3: String[] = new Array();
  public images4: String[] = new Array();
  private images: number[] = new Array();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService) { }

    ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
          this.gameService.get(id).subscribe(
        game => this.game = game);
    }

    private StartGame():void
    {
      var temp = <HTMLInputElement> document.getElementById("submit");
      temp.disabled = true;

      //console.log(this.game.boardSeed); 
      for(let i = 0; i <= 24; i++)
      { 
        var position = this.game.boardSeed.split(' ')[i];
        this.images.push(Number(position));

        //console.log(this.images);

        if(i>=0 && i<6)this.images1.push("../../../assets/images/card" + position + ".jpg");
        if(i>5 && i<12)this.images2.push("../../../assets/images/card" + position + ".jpg");
        if(i>11 && i<18)this.images3.push("../../../assets/images/card" + position + ".jpg");
        if(i>17 && i<24)this.images4.push("../../../assets/images/card" + position + ".jpg");
      }
    }
//CONTINEU HERE ON CARD CLICKS - WE ARE GETTING THE POSITION OF EACH CARD IN AN ARRAY. MAYBE CHANGE STYLES OR SHOW IMAGE ON CLICK
    public OpenCard(temp:Number, rowNumber:Number):void
    {
      switch(rowNumber)
      {
        case 1:
          break;
        case 2:
          break;
      }
      console.log("Row Number: ", rowNumber);
      console.log("Card Number: ", temp);
    }
}

//EXPLANATION OF THE IMAGE - CARDS GENERATION

//Images are linked to array values
//When you want to instantiate an array element, you just show the image instead but keep the functionalities of the array
//More information on board seed logic in the game-create.component.ts
