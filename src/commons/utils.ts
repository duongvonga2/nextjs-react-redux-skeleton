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

export function getFileUrl(path?: string, options?: { origin?: boolean }) {
  if (!path) {
    return "";
  }
  const fileHost = options?.origin
    ? process.env.ORIGIN_IMAGE_HOST
    : process.env.IMAGE_HOST;
  if (!path) {
    return path;
  }

  if (path.includes("http://") || path.includes("https://")) {
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

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

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

export const nonAccentString = (str: string) => {
  if (!str) return str;
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??/g, "I");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/??|??|???|??|???|??|???|???|???|???|???/g, "U");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/???|??|???|???|???/g, "Y");
  str = str.replace(/??/g, "d");
  str = str.replace(/??/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huy???n s???c h???i ng?? n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ??, ??, ??, ??, ??
  return str;
};

export const millisecondsToTime = (duration: number) => {
  const secondsConverter = duration / 1000;
  let [day, hour, minute, seconds] = [0, 0, 0, 0];
  const returnValue = () => ({ day, hour, minute, seconds });

  seconds = Math.floor(duration / 1000);
  if (secondsConverter < 60) {
    return returnValue();
  }

  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;

  if (secondsConverter > 60 && secondsConverter < 60 * 60) {
    return returnValue();
  }

  hour = Math.floor(minute / 60);
  minute = minute % 60;

  if (secondsConverter > 60 * 60 && secondsConverter < 60 * 60 * 24) {
    return returnValue();
  }

  day = Math.floor(hour / 24);
  hour = hour % 24;

  return returnValue();
};

export const getTimeHistory = (time: string) => {
  const deltaTime = new Date().getTime() - new Date(time).getTime();
  const { day, hour, minute, seconds } = millisecondsToTime(deltaTime);
  if (day) {
    if (day >= 2) {
      return convertTimeToString(time, "hh:mm DD/MM/YYYY");
    }
    return day + " ng??y tr?????c";
  }
  if (hour) {
    return hour + " gi??? tr?????c";
  }
  if (minute) {
    return minute + " ph??t tr?????c";
  }
  if (seconds) {
    if (seconds < 5) {
      return "V??i gi??y tr?????c";
    }
    return seconds + " gi??y tr?????c";
  }
};

export default {
  convertTimeToString,
  getFileUrl,
  validateEmail,
  isNumber,
  handleNumberInput,
  roundNumber,
  nonAccentString,
  millisecondsToTime,
  getTimeHistory,
};
