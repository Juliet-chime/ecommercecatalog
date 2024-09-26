import axios from "axios";
// import { isSessionExpired } from '../utils/authUtils'

const API_URL = import.meta.env.VITE_BASE_URL;

console.log(API_URL)

let instance;

function setAuthorization(headers) {
  const token = localStorage.getItem("authToken");
  // const newUserToken = localStorage.getItem('newUserToken')

  // if (!!newUserToken) {
  //     headers.Authorization = `Bearer ${newUserToken}`
  // } else if (!!token) {
  //     headers.Authorization = `Bearer ${token}`
  // }
  // return headers
}

function instantiateInstance() {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  headers = setAuthorization(headers);

  if (!!instance) {
    // instance.defaults.headers.common["Authorization"] = headers.Authorization;
  } else {
    instance = axios.create({
      baseURL: API_URL,
      headers,
    });
  }
  return instance;
}

export const makeApiRequest = async ({
  method='GET',
  url,
  data = null,
  params = null,
}) => {
  instantiateInstance();

  const buildParams = (data) => {
    const param = new window.URLSearchParams();

    for (let [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          param.append(`${key}${index}`, item);
        });
      } else {
        param.append(key, value);
      }
    }

    return param;
  };

  if (params) {
    params = buildParams(params);
  }

  try {
    const res = await instance.request({
      method,
      url,
      data,
      params,
    });

    return res.data;
  } catch (e) {
     console.log(e,'pppp')
    // if (
    //   e.response.status === 401 &&
    //   e.response.data.errorMessage
    //     .toLowerCase()
    //     .includes("error occured while validating token")
    // ) {
    // //   const token = localStorage.getItem("authToken");
    // //   const isExpired = isSessionExpired(token);
    // //   if (isExpired) {
    // //     localStorage.setItem("authToken", "");
    // //     window?.location?.reload();
    // //   }
    // }
    throw e;
  }
};
