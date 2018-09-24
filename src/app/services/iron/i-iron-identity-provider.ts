export interface IIronIdentityProvider {
    getJWT(userID: string): Promise<string>;
    getUserPasscode(): Promise<string>;
}
