const LOCAL_STORAGE_KEY = "fake-token";

class Client {
  constructor() {
    this.subscribers = [];
    this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (this.token) {
      this.isTokenValid().then((valid) => {
        if (!valid) {
          this.token = null;
        }
      });
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  notify() {
    this.subscribers.forEach((cb) => cb(this.isLoggedIn()));
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  login() {
    const url = "http://localhost:3001/api/login";
    return fetch(url, {
      method: "post",
      headers: {
        accept: "application/json",
      },
    })
      .then(this.checkStatus)
      .then(this.parseJson)
      .then((json) => this.setToken(json.token));
  }

  logout() {
    this.removeToken();
  }

  isTokenValid() {
    const url = "http://localhost:3001/api/check_token?token=" + this.token;
    return fetch(url, {
      method: "get",
      headers: {
        accept: "application/json",
      },
    })
      .then(this.checkStatus)
      .then(this.parseJson)
      .then((res) => res.valid === true);
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  parseJson(response) {
    return response.json();
  }
}

export default new Client();
