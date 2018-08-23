import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const order = [
      {
        id: 6368309738752113,
        document: 'AV76/bySGaZkVJKKUHOwwP6QNOVTqYIdqlhdh19gm1SFJXJuc3…91J9Iroszdu6uVj7z28C1fTwk+dMPD06NA4G7ZkBUxkl12BY='
      },
    ];
    return {order};
  }
}
