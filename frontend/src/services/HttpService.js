import Axios from "axios";

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
Axios.defaults.baseURL = BACKEND_API_URL;

export class HttpService {
  _axios = Axios.create();

  addRequestInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };

  get = async (url) => await this.request(this.getOptionsConfig("get", url));

  post = async (url, data) => await this.request(this.getOptionsConfig("post", url, data));

  put = async (url, data) => await this.request(this.getOptionsConfig("put", url, data));

  patch = async (url, data) => await this.request(this.getOptionsConfig("patch", url, data));

  delete = async (url) => await this.request(this.getOptionsConfig("delete", url));

  getOptionsConfig = (method, url, data) => {
    return {
      method,
      url,
      data,
      headers: { "Content-Type": "application/json", "Accept": "application/json", 'Access-Control-Allow-Credentials': true },
    };
  };

  request(options) {
    return new Promise((resolve, reject) => {

        this._axios.request(options)
          .then((res) => {
            // console.log(res);
            // Directly resolve with res.data
            resolve(res.data);
          })
          .catch((ex) => {
            // Check if ex.response exists and has a data property
            if (ex.response && ex.response) {
              // Reject with the response data if it exists
              reject(ex.response.data);
            } else {
              // Reject with the entire error object or a custom error message if there's no response data
              reject('Could not fetch data');
            }
        });
      });
  }
}

export default new HttpService();