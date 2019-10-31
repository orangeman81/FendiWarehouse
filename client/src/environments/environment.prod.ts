export const environment = {
  production: true,
  apiUrl: 'https://inventariofendi.innovaway.it/fendi/private/',
  auth0options: {
    domain: "fendi-warehouse.eu.auth0.com",
    client_id: "dOcLCHYs2crEX24FuyWYtjmTMsfa9Dr1",
    redirect_uri: `${window.location.origin}/fendife/callback`,
    responseType: 'token id_token',
    audience: "https://fendi-api.com",
    scope: 'openId'
  },
  logoutRedirect: '/fendife/login',
};