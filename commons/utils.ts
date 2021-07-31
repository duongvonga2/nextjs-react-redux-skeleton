export const convertTimeToString = (time: string | Date, format: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const mon = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const min = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  return format
    .replace("YYYY", year.toString())
    .replace("yyyy", year.toString())
    .replace("dd", day.toString())
    .replace("DD", day.toString())
    .replace("MM", mon.toString())
    .replace("hh", hour.toString())
    .replace("mm", min.toString())
    .replace("ss", second.toString());
};

export function getFileUrl(path: string) {
  const fileHost = process.env.REACT_APP_IMAGE_HOST || "";
  if (!path) {
    return path;
  }

  if (
    path.includes(fileHost) ||
    path.includes("http://") ||
    path.includes("https://")
  ) {
    return path;
  }

  return fileHost + path;
}

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const millisecondsToTime = (duration: number) => {
  // const milliseconds = (duration % 1000) / 100;
  let seconds: string | number = Math.floor((duration / 1000) % 60);
  let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
  let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 *
 * @param {string} number
 * @returns {boolean}
 */
export function isNumber(number: any) {
  if (number === 0) {
    return true;
  }
  const regex = /[0-9]+/;
  if (number && number.match(regex)) {
    return true;
  }
  return false;
}

export function handleNumberInput(value: any) {
  if (!value) {
    value = 0;
  } else {
    value = value.replace(/\./gi, "");
  }
  if (!isNumber(value) || value < 0) {
    return null;
  }
  value = parseInt(value);
  return value;
}

export const roundNumber = (value: number, numberOfRounding = 0) => {
  const denom = Math.pow(10, numberOfRounding);
  const result = Math.round(value * denom) / denom;
  return result;
};
