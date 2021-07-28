class Api {
  token = "";
  host = "";
  constructor(host: any) {
    this.host = host;
  }

  setToken(token: string) {
    this.token = token;
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
        queryString += `${key}=${query[key]}&`;
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

  async fetchData(
    api: string,
    method = "GET",
    body: any | undefined = undefined
  ) {
    if (!api.includes(this.host)) {
      api = this.host + api;
    }
    console.log("Method: ", method, "Api", api);
    console.log("Body", body);
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
        console.log("response ", response);
        throw err;
      }
    } catch (err) {
      console.log("Response error'", err);
      return { code: -1, errors: err, success: false };
    }
  }
}

export const AppApi = new Api(process.env.BACKEND_HOST);
