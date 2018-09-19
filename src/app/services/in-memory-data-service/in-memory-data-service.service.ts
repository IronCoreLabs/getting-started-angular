import { InMemoryDbService } from "angular-in-memory-web-api";

/**
 * The InMemoryDataService mocks a simple REST API. The service is discussed
 * in the Angular tour of heroes getting started tutorial
 */
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const awayteam = [];
        const order = [];
        return { order, awayteam };
    }
}
