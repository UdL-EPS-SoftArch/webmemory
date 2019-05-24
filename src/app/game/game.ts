import { Resource } from 'angular4-hal-aot';

export class Game extends Resource {
  id: Int32Array;
  gameName: string;
  boardSeed: Int32Array;
  reward: Int32Array;
  uri: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
