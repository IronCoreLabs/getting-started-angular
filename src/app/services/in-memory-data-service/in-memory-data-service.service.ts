import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const order = [
      // {
      //   id: 397667380994437,
      //   document: 'AZxIRjfk1g4Hyaz6iSXK1hTsBOOqgtnr0VRy3OVeYu084B5BLs5cvw=='
      // },
      {
        id: 2706709561083013,
        // tslint:disable-next-line:max-line-length
        document: 'AYiILxQgCXcBR/F8tYz3mOhxOYG2qkALiJDpma+J2FlhnUc4GBfxcR8gBLvRCOXbi2NlUIFRdM+k+ZKxgh9XXdhV5bpYO6eZ4Je0JO4G4T5adyCkx8HUi1tgGCmNWFbt3wSK4zEX6MGI7XglUeE4AJFdjKktboA2qu+7xwNAnlOeTtxBow=='
      }
    ];
    const joke = [
      { id: 2332323, opening: 'Hello', punchline: 'World'}
    ];
    return {order, joke};
  }
}
