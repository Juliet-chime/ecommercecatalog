import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

let instance;

function setAuthorization(headers) {
  const token = localStorage.getItem("token");

  if (!!token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function instantiateInstance() {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  headers = setAuthorization(headers);

  if (!!instance) {
    instance.defaults.headers.common["Authorization"] = headers.Authorization;
  } else {
    instance = axios.create({
      baseURL: API_URL,
      headers,
    });
  }
  return instance;
}

export const makeApiRequest = async ({
  method = "GET",
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
    throw e;
  }
};
