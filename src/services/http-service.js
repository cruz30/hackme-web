import 'whatwg-fetch';

class HttpService {
  getPosts = () => {
    var promise = new Promise((resolve, reject) => {
      fetch('http://localhost:3000/v1/post')
      .then(res => {
        resolve(res.json());
      })
    });
    return promise;
  }
}

export default HttpService;
