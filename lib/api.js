import { baseUrl } from "../utils/urlConfig";
export function getStrapiURL(path = "") {
  // return `${process.env.Backend}${path}`;
  return `${baseUrl}/${path}`;
}

export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}
