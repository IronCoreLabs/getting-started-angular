import { Injectable } from "@angular/core";
import { IIronIdentityProvider } from '../iron/i-iron-identity-provider';
import { AnnouncementService } from '../announcement/announcement.service';

const errorMessage =
`Oops. There doesn't appear to be a backend service to sign requests.\n
Did you run ng serve? If so, please run npm start instead.`;

@Injectable({
    providedIn: "root"
})
export class UserIdentityProviderService implements IIronIdentityProvider {
    constructor(private announcementService: AnnouncementService) {
    }

    /**
     * Request a signed JWT from the server for the current project and segment.
     */
    getJWT(userID): Promise<string> {
        // TODO: See if we can eliminate node server dependency
        return fetch(`http://localhost:3001/generateJWT?userID=${userID}`)
            .then(response => response.text())
            .catch(e => {
                this.announcementService.error(errorMessage);
                // tslint:disable-next-line:no-console
                console.log(e);
                return '';
            });
    }

    getUserPasscode(): Promise<string> {
        return Promise.resolve('SAMPLE_PASSCODE');
    }
}
