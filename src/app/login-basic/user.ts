import { Authority } from './authority';
import { Resource } from 'angular4-hal-aot';

export class User extends Resource {
  id: string;
  uri: string;
  username = '';
  email: string;
  authorities: Authority[] = [];
  authorization = '';
  password = '';

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
