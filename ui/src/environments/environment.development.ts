export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/',
  brandName: 'Andromeda cinema',
  okta: {
    clientId: '0oa91yzxnq9kZaIt75d7',
    issuer: 'https://dev-65177433.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  }
};
