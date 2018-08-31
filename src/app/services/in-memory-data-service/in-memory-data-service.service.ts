import { InMemoryDbService } from "angular-in-memory-web-api";

/**
 * The InMemoryDataService mocks a simple REST API. The service is discussed
 * in the Angular tour of heroes getting started tutorial
 */
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const awayteam = [];
    const order = [
      {
        id: 2706709561083013,
        // tslint:disable-next-line:max-line-length
        // TODO:  remove this order
        document:
          "AYiILxQgCXcBR/F8tYz3mOhxOYG2qkALiJDpma+J2FlhnUc4GBfxcR8gBLvRCOXbi2NlUIFRdM+k+ZKxgh9XXdhV5bpYO6eZ4Je0JO4G4T5adyCkx8HUi1tgGCmNWFbt3wSK4zEX6MGI7XglUeE4AJFdjKktboA2qu+7xwNAnlOeTtxBow=="
      }
    ];
    return { order, awayteam };
  }
}
