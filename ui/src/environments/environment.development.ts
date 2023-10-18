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
  },
  tmdb: {
    accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWE1MTNkOTUzYzg5NDgzMzU1Mjc0ZDA2MmU5NWNhNiIsInN1YiI6IjY1MDk0NDFkODI2MWVlMDBmZjk5ZTRlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eIpjs7W8zwvXEPas6KM5opN13tvMuIEZr8NqCAq0feU',
    apiKey: 'aea513d953c89483355274d062e95ca6',
    apiUrl: 'https://api.themoviedb.org/3/'
  },
  countryApiUrl: 'https://restcountries.com/v3.1/'
};
