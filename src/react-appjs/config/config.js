const config = {
  url: {
    'currentUser': '/users/me.json?api-version=v2',
    'settings': '/settings.json?contain[header]=0',
    'accountSettings' : '/account/settings.json?api-version=v2'
  }
};

// We could modify here the dev config if needed.
//const dev = {};
//const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;