import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal-aot';
import { Game } from './game'

@Injectable()
export class GameService extends RestService<Game> {

    constructor(injector: Injector) {
        super(Game, 'games', injector);
      }
}
