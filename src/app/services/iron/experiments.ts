import { Utils } from '../../utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Joke {
    id: Number;

    constructor(public open: string, public punchline: string) {
      this.id = Utils.randomInt();
    }

    tell() {
      console.log(this.open + '?');
      console.log(this.punchline);
    }
}

export class JokeService {
    constructor(private httpClient: HttpClient) {
    }

    roundtrip() {
        const q = 'What happened to the ducks who flew upside down';
        const p = 'They quacked up';
        const joke = new Joke(q, p);

        this.httpClient.post<Joke>('api/joke', joke)
          .subscribe((result) => {
            const jresult = Object.assign(new Joke('', ''), result);
            console.log('jresult', jresult);
            jresult.tell();
            this.httpClient.get<Joke>('api/joke')
              .subscribe((listresult) =>
                console.log('listresult', listresult)
              );
          });
      }
}
