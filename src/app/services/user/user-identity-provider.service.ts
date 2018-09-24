import { Injectable } from "@angular/core";
import { IIronIdentityProvider } from '../iron/i-iron-identity-provider';

@Injectable({
    providedIn: "root"
})
export class UserIdentityProviderService implements IIronIdentityProvider {
    /**
     * Request a signed JWT from the server for the current project and segment.
     */
    getJWT(userID): Promise<string> {
        // TODO: Catch and gracefully handle invalid JWT
        // TODO: See if we can eliminate node server dependency
        return fetch(`http://localhost:3001/generateJWT?userID=${userID}`)
            .then(response => response.text())
            .catch(e => {
                // tslint:disable-next-line:no-console
                console.log(e);
                return '';
            });
    }

    getUserPasscode(): Promise<string> {
        return Promise.resolve('SAMPLE_PASSCODE');
    }
}
