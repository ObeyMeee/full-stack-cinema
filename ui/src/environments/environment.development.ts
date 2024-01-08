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
  firebase: {
    apiKey: "AIzaSyBkuaB3uSqMdnYCwMHxOyVnhFJgbw6GUhw",
    authDomain: "andromeda-cinema-f4271.firebaseapp.com",
    databaseURL: "https://andromeda-cinema-f4271-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "andromeda-cinema-f4271",
    storageBucket: "andromeda-cinema-f4271.appspot.com",
    messagingSenderId: "593938470141",
    appId: "1:593938470141:web:acd80ad19ab52fdbc5da94",
    measurementId: "G-P9LKPLEES1",
  },
  countryApiUrl: 'https://restcountries.com/v3.1/'
};
