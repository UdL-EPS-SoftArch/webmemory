import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ExternalConfigurationHandlerInterface, ExternalConfiguration} from 'angular4-hal-aot';
import { environment } from '../environments/environment';

@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {

  constructor(private http: HttpClient) {
  }

  getRootUri(): string {
    return environment.API;
  }

  getHttp(): HttpClient {
    return this.http;
  }

  getProxyUri(): string {
    return null;
  }

  getExternalConfiguration(): ExternalConfiguration {
    return null;
  }

  setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
  }

  serialize() {
  }

  deserialize() {
  }
}
