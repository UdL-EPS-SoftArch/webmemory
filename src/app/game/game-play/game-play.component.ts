import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../game';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GamePlayComponent implements OnInit {

  public game: Game = new Game();
  //This could be one array, but I am new to angualar and | slice 0:6 - 6:12 was not working, didn't have time to learn pipes
  public images1: String[] = new Array();
  public images2: String[] = new Array();
  public images3: String[] = new Array();
  public images4: String[] = new Array();
  private images: number[] = new Array();

  private opened:boolean = false;
  private firstCard:number;
  private firstCardRow:number;
  private firstCardColumn:number;
  private gameOver:boolean;

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

      for(let i =0; i<6;i++)
      {
        this.images1.push("../../../assets/images/cardback.png");
        this.images2.push("../../../assets/images/cardback.png");
        this.images3.push("../../../assets/images/cardback.png");
        this.images4.push("../../../assets/images/cardback.png");
      }


      for(let i = 0; i < 24; i++)
      { 
        var position = this.game.boardSeed.split(' ')[i];
        this.images.push(Number(position));
        //REPLAY GAME FUNCTIONALITY
        // if(i>=0 && i<6)this.images1.push("../../../assets/images/card" + position + ".jpg");
        // if(i>5 && i<12)this.images2.push("../../../assets/images/card" + position + ".jpg");
        // if(i>11 && i<18)this.images3.push("../../../assets/images/card" + position + ".jpg");
        // if(i>17 && i<24)this.images4.push("../../../assets/images/card" + position + ".jpg");
      }
    }
//CONTINEU HERE ON CARD CLICKS - WE ARE GETTING THE POSITION OF EACH CARD IN AN ARRAY. MAYBE CHANGE STYLES OR SHOW IMAGE ON CLICK
//SORRY THIS CODE IS BAD, BUT I DIDN'T HAVE TIME TO THINK SO WE JUST TRIED HARDCODING FASTLY
    public OpenCard(temp:number, rowNumber:number):void
    {
      var positionInImages = ((rowNumber-1) * 6) + Number(temp);
      var cardNumber = this.images[positionInImages];

      switch(rowNumber)
      {
        case 1:
          this.images1[temp] = "../../../assets/images/card" + cardNumber + ".jpg";
          break;
        case 2:
          this.images2[temp] = "../../../assets/images/card" + cardNumber + ".jpg";
          break;
        case 3:
          this.images3[temp] = "../../../assets/images/card" + cardNumber + ".jpg";
          break;
        case 4:
          this.images4[temp] = "../../../assets/images/card" + cardNumber + ".jpg";
          break;
      }
      
      //CHECK IF THE CARDS ARE THE SAME AND DO AN IF ELSE 
      if(this.opened && this.firstCard != null)
      {
        if(cardNumber == this.firstCard)
        {
          console.log("THEY ARE THE SAME");
          var tempp = this.firstCardRow*6-6+Number(this.firstCardColumn);
          this.images[tempp] = 0;
          this.images[positionInImages] = 0;

          //CHECKING IF ALL THE CARDS ARE TURNED
          this.gameOver = true;
          for(let i = 0; i < this.images.length; i++)
            if(this.images[i] != 0)this.gameOver = false;

            if(this.gameOver)
            {
              window.confirm("Congratulations your score is: X\nPress 'OK' to check the highscores\nPress 'Cancel' to go back to the lobby");
              if (confirm("Congratulations your score is: X\nPress 'OK' to check the highscores\nPress 'Cancel' to go back to the lobby")) {
                this.router.navigate([`/highscores`]);
              } else {
                console.log("You are going back to the lobby");
                this.router.navigate([`/games`]);
              }

              console.log("GAME OVEEEER");
            }

          this.firstCard = null;
        }
        else
        {
          console.log("THEY ARE NOT THE SAME");
          (async () => { 
              
          await this.delay(500);
          for(let i = 0; i < 2;i ++)
          {
             
            if(i==1)
            {
              rowNumber = this.firstCardRow;
              temp = this.firstCardColumn;
            }

            if(i==i)
              switch(rowNumber)
              {
                case 1:
                  this.images1[temp] = "../../../assets/images/cardback.png";
                  break;
                case 2:
                  this.images2[temp] = "../../../assets/images/cardback.png";
                  break;
                case 3:
                  this.images3[temp] = "../../../assets/images/cardback.png";
                  break;
                case 4:
                  this.images4[temp] = "../../../assets/images/cardback.png";
                  break;
              }
        }})();
        this.opened = false;         
        }
      }
      else
      {
        this.firstCard = this.images[positionInImages]
        this.firstCardRow = rowNumber;
        this.firstCardColumn = temp;
        this.opened = true;
      }
    }
     delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
}

//EXPLANATION OF THE IMAGE - CARDS GENERATION

//Images are linked to array values
//When you want to instantiate an array element, you just show the image instead but keep the functionalities of the array
//More information on board seed logic in the game-create.component.ts

//BIG NOTE
//DON'T GO TOO FAST, WE HAVE A DELAY OF 500MS FOR THE CLOSING OF THE CARDS, IF YOU RAPIDLY PRESS AND GO FASTER THAN 500MS YOU WILL OVERFLOW THE BUFFER AND GET ERRORS
