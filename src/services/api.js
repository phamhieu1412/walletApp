import React from 'react';
import {Alert} from 'react-native';

import {Auth} from '../../App';
import {toCamelCase, toPascalCase} from '../utils/CaseConverter';
// import AppConfig from '../common/AppConfig.json';

const APP_DOMAIN = '';
class APIWorker {
  constructor() {
    this.baseUrl = APP_DOMAIN;
    // this.baseUrl = AppConfig.api.url || APP_DOMAIN;
  }
  init = ({baseUrl, token}) => {
    this.baseUrl = baseUrl || this.baseUrl;
    this.authzToken = token != null ? `Bearer ${token}` : '';
  };

  setToken(token) {
    if (token) this.authzToken = `Bearer ${token}`;
  }

  setBaseUrl(url) {
    if (url) this.baseUrl = url;
  }

  clearToken() {
    this.authzToken = '';
  }

  signUpUser = async infoUser => {
    Auth()
      .createUserWithEmailAndPassword(infoUser.email, infoUser.password)
      .then(res => {
        Alert.alert(`signUpUser success: ${JSON.stringify(res)}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  signInUser = payload => {
    Auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        return true;
      })
      .catch(error => {
        return error;
      });
  };

  signOut = () => {
    Auth()
      .signOut()
      .then(res => {
        console.log('xxx res', res);
        return res;
      })
      .catch(error => {
        console.log('xxx error', error);
        return error;
      });
  };

  // get city + district + ward
  getCities = areaCode => {
    return this.get(`/area/${areaCode}/provinces`).then(res => res.data);
  };
  getDistricts = (areaCode, cityCode) => {
    return this.get(`/area/${areaCode}/provinces/${cityCode}/districts`).then(
      res => res.data,
    );
  };
  getWards = (areaCode, cityCode, districtCode) => {
    return this.get(
      `/area/${areaCode}/provinces/${cityCode}/districts/${districtCode}/wards`,
    ).then(res => res.data);
  };
  getProvinces = () => {
    return this.get('/api/v1/address/').then(res => res);
  };
  getDistricts = provinceId => {
    return this.get(`/api/v1/address/province/${provinceId}`).then(res => res);
  };
  getWards = districtId => {
    return this.get(`/api/v1/address/district/${districtId}`).then(res => res);
  };
  //

  // method get + post + patch + delete + put
  get = async function (endpoint, data) {
    return await this._request('GET', endpoint, data);
  };

  post = async function (endpoint, data) {
    return await this._request('POST', endpoint, data);
  };

  put = async function (endpoint, data) {
    return await this._request('PUT', endpoint, data);
  };

  patch = async function (endpoint, data) {
    return await this._request('PATCH', endpoint, data);
  };

  delete = async function (endpoint, data) {
    return await this._request('DELETE', endpoint, data);
  };
  //

  _getUrl = function (endpoint) {
    if (endpoint.startsWith('http')) return endpoint;
    return endpoint.startsWith('/')
      ? `${this.baseUrl}${endpoint}`
      : `${this.baseUrl}/${endpoint}`;
  };

  _join = function (obj, separator) {
    const arr = [];
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      if (val) {
        arr.push(`${key}=${val}`);
      }
    });

    return arr.join(separator);
  };

  _request = function (method, endpoint, newData) {
    const url = this._getUrl(endpoint);
    // const data = newData.params ? toPascalCase(newData.params) : false;
    const data = newData && newData.params ? newData.params : false;
    const headers = newData && newData.headers ? newData.headers : false;
    const defaultHeaders = {
      Authorization: this.authzToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const params = {
      url,
      method,
      headers: headers
        ? Object.assign(defaultHeaders, headers)
        : defaultHeaders,
      // encoding: this.encoding,
      // timeout: this.timeout,
    };

    if (method === 'GET') {
      params.headers['Cache-Control'] = 'no-cache';
      if (data) {
        params.url = `${params.url}?${this._join(data, '&')}`;
      }
    } else if (
      method === 'POST' ||
      method === 'PUT' ||
      method === 'PATCH' ||
      method === 'DELETE'
    ) {
      if (data) {
        // log(JSON.stringify(data));
        params.body = JSON.stringify(data);
      }
      //   params.headers = {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   };
      //   params.body = JSON.stringify(data);
    }

    // log(`Fetch ${params.url}`);
    return (
      fetch(params.url, params)
        .then(res => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
            // } else if (res.status === 401) {
            //   res.error = {
            //     status: res.status,
            //     code: res.code,
            //     detail: res.detail,
            //   };
            //   res.data = {};

            //   return res;
          } else if (res.status >= 300) {
            res.error = {
              status: res.status,
              code: res.code,
              detail: res.detail,
            };
            res.data = {};

            return res;
          }

          return false;
        })
        .then(res => {
          if (!res) {
            return {data: {}};
          } else if (res.error) {
            return res;
          }

          return {
            ...res,
            data: toCamelCase(res),
          };
        })
        // .then(res => ({
        //   ...res,
        //   data: toCamelCase(res),
        // }))
        .catch(() => {
          const res = {
            error: {
              status: 0,
              code: 'UNKNOWN',
              detail: 'Probably lost connection',
            },
            data: {},
          };

          return res;
        })
    );
  };

  _addLocationToParams = function (params, location) {
    if (location && location.latitude && location.longitude) {
      params.Lat = location.latitude;
      params.Lng = location.longitude;
    }

    return params;
  };
}

const apiWorker = new APIWorker();

export const apiWorkerDev = new APIWorker();
export default apiWorker;
