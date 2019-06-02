import { Resource } from 'angular4-hal-aot';

export class Game extends Resource {
  id: Int32Array;
  uri: string;
  gameName: string;
  boardSeed: string;
  reward: Int32Array;
 
  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }

  public getBoardSeed(){return this.boardSeed;}
}
