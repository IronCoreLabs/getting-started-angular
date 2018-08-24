import * as IronWeb from '@ironcorelabs/ironweb';
import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { from, Observable } from 'rxjs';
import { Utils } from '../../utils';
import { Order } from '../order/order';

// TODO: Figure out if this is needed; if so npm package needs to be adjusted
declare module '@ironcorelabs/ironweb' {
  let codec: Codec;
  let document: Document;
  let group: Group;
}

/**
 * The Angular InMemory Web Api service needs a numeric primary key
 * with property name 'id'. Map the IronWeb response to make it easy
 * to work with.
 */
export class EncryptedDocument {
  id: Number;
  document: IronWeb.Base64Bytes;

  constructor(response?: IronWeb.EncryptedDocumentResponse) {
    this.id = response ? +response.documentID : -1;
    this.document = response ? response.document : '';
  }

  static from(json: string): EncryptedDocument {
    return {
      id: json['id'],
      document: json['document']
    };
  }
}

export class DecryptedDocument {
  id: Number;
  document: string;
  constructor(response?: IronWeb.DecryptedDocumentResponse) {
    this.id = +response.documentID;
    this.document = IronWeb.codec.utf8.fromBytes(response.data);
  }
}

@Injectable({
  providedIn: 'root'
})
export class IronService {
  private initp: Promise<any>;

  constructor() {
    this.initp = null;
  }

  asUser(user: User): Promise<any> {
    // First time through
    if (!this.initp) {
      this.initp = Promise.resolve();
    }

    // Serialize SDK requests on completion of init
    return this.initp = this.initp.then(() => {
      return IronWeb.initialize(() => this.getJWT(user.id), () => this.getUserPasscode());
    });
  }

  createGroup(options?: IronWeb.GroupCreateOptions) {
    return this.initp.then(() => {
      return IronWeb.group.create(options);
    });
  }

  decrypt(encryptedDocument: EncryptedDocument): Observable<DecryptedDocument> {
    return from(this.initp
            .then(() => {
              return IronWeb.document.decrypt('' + encryptedDocument.id, encryptedDocument.document)
                .then((ddr) => {
                  return new DecryptedDocument(ddr);
                });
            }));
  }

  getGroup(groupID: string) {
    return this.initp.then(() => {
      return IronWeb.group.get(groupID);
    });
  }

  /**
    * Encrypt the data transfer object
    */
  encrypt(dto: any): Observable<EncryptedDocument> {
    // TODO: Guard assertions and/or strong types

    const documentId = '' + dto.id;
    const documentData = IronWeb.codec.utf8.toBytes(JSON.stringify(dto));

    const policy = this.getPolicy(dto);
    const groupId = policy.groupId;

    return from(this.initp
      .then(() => {
        return IronWeb.document
          .encrypt(documentData, {accessList: {groups: [{id: groupId}]}, documentID: documentId}).then((response) => {
            return new EncryptedDocument(response);
          });
      })
      .catch(() => {
        return new EncryptedDocument();
      }));

      //  .catch((e) => {
      //      showSnackbar(`Error encrypting document: ${e.message}`, "error");
      //      if (action.onFail) {
      //          action.onFail();
      //      }
      //  });
  }

  /**
   * Request a signed JWT from the server for the current project and segment.
   */
  getJWT(userID) {
    // TODO: Catch and gracefully handle invalid JWT
    // TODO: See if we can eliminate node server dependency
    return fetch(`http://localhost:3001/generateJWT?userID=${userID}`)
        .then((response) => response.text())
        .catch((e) => { console.log(e); return ''; });
  }

  private getPolicy(o: any) {
    return o && o.__ironpolicy;
  }

  /**
   * Mocked out method to get a users passcode. Fixed for now for PoC purposes.
   */
  getUserPasscode() {
    return Promise.resolve('SAMPLE_PASSCODE');
  }

  metadata(encryptedDocument: EncryptedDocument) {
    return from(this.initp.then(() => {
      IronWeb.document.getMetadata('' + encryptedDocument.id)
        .then((response) => {
          console.log('getMetadata response', response);
        });
    }));
  }
}
