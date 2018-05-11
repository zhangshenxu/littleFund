import http from 'http';

export default function valid(code) {
  return new Promise((resolve, reject) => {
    http.get(`http://fundgz.1234567.com.cn/js/${code}.js?rt=1463558676006`, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error = false;
      if (statusCode !== 200) {
        error = true;
      } else if (!/^application\/x-javascript/.test(contentType)) {
        error = true;
      }

      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
}
