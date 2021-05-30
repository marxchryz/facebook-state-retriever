let state = [];

const getAllCookies = () => {
  if (!chrome.cookies) {
    chrome.cookies = chrome.experimental.cookies;
  }
  return new Promise((promise) => {
    chrome.cookies.getAll({ url: 'https://www.facebook.com/' }, (cookies) => {
      cookies = cookies.map((c) => {
        c.sameSite = 'None';
        c.key = c.name;
        delete c.hostOnly;
        delete c.name;
        return c;
      });
      cookies = cookies.filter((c) => {
        return ['sb', 'c_user', 'fr', 'xs'].includes(c.key);
      });
      promise(cookies);
    });
  });
};

const app = async () => {
  state = await getAllCookies();
  document.getElementById('state').value = JSON.stringify(state);
};

app();
