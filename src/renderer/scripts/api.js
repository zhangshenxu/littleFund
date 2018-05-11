import http from 'http';

export default function api(code) {
  return new Promise((resolve, reject) => {
    http.get(`http://fundgz.1234567.com.cn/js/${code}.js?rt=1463558676006`, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
      } else if (!/^application\/x-javascript/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        reject(error);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      function jsonpgz(rawData) {
        resolve(rawData);
      }
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          eval(rawData)
        } catch (e) {
          console.error(e.message);
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
      reject(e);
    });
  });
}
