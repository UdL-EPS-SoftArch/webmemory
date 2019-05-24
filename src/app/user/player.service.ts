import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from 'angular4-hal-aot';
import { Player } from './player';

@Injectable()
export class PlayerService extends RestService<Player> {

  constructor(injector: Injector) {
    super(Player, 'players', injector);
  }

  public findByUsernameContaining(text: string): Observable<Player[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByUsernameContaining', options);
  }
}
