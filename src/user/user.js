let instance = null;
let usr = '';
let pwd = '';

class User {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  setUsr = usr => {
    this.usr = usr;
  }

  getUsr = () => {
    return this.usr;
  }

  setPwd = pwd => {
    this.pwd = pwd;
  }

  getPwd = () => {
    return this.pwd;
  }
}

export default User;
