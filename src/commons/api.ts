import { IApiResponse, IFetchData } from "./interface";
import FormData from "form-data";
class Api {
  private token = "";
  private host = "";
  constructor(host: any) {
    this.host = host;
  }

  setToken(token: string) {
    this.token = token;
  }
  getToken() {
    return this.token;
  }

  formatQuery(query: any) {
    let queryString = "?";
    for (const key in query) {
      if (
        (!query[key] &&
          query[key] !== 0 &&
          typeof query[key] !== "boolean" &&
          typeof query[key] !== "number") ||
        query[key] === ""
      )
        delete query[key];
      else if (typeof query[key] != "undefined") {
        if (query[key] instanceof Array) {
          query[key].forEach((item: string, index: number) => {
            queryString += `${key}[${index}]=${item}&`;
          });
        } else {
          queryString += `${key}=${query[key]}&`;
        }
      }
    }
    return queryString;
  }

  formatData(data: any) {
    for (const key in data) {
      if ((!data[key] && data[key] !== 0) || data[key] === "") delete data[key];
    }
    return data;
  }

  async fetchData<T>(request: IFetchData): Promise<IApiResponse<T>> {
    const {
      api: requestApi,
      method = "GET",
      body: requestBody,
      query,
    } = request;
    let api = requestApi;

    if (query) {
      const queryString = this.formatQuery(query);
      api = api + queryString;
    }

    const body =
      requestBody instanceof FormData
        ? requestBody
        : JSON.stringify(requestBody);

    if (
      !api.includes(this.host) &&
      !api.includes("https://") &&
      !api.includes("http://")
    ) {
      api = this.host + api;
    }
    try {
      const options: any = {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "",
          Authorization: "",
        },
        body,
      };
      if (typeof body === "string") {
        options.headers["Content-Type"] = "application/json;charset=UTF-8";
      } else if (body instanceof FormData) {
        delete options.headers["Content-Type"];
        // options.headers['Content-Type'] = 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL';
      }
      if (this.token) {
        options.headers["Authorization"] = "Bearer " + this.token;
      }
      const response = await fetch(api, options);
      try {
        const json = await response.json();

        console.log("Response of", api, json);
        return { ...json, code: json.statusCode, success: response.ok };
      } catch (err) {
        console.log("response error", err);
        throw err;
      }
    } catch (err) {
      console.log("Response error'", err);
      return { code: -1, errors: err, success: false };
    }
  }
}

export const AppApi = new Api(process.env.BACKEND_HOST);
