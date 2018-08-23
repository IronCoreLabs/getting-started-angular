import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const order = [
      { id: -1, document: '' },
    ];
    return {order};
  }
}
