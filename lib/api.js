import { baseUrl, authUrl } from "../utils/urlConfig";

export function getStrapiURL(path = "") {
  return `${baseUrl}/${path}`;
}

export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}
export function getAuthURL(path = "") {
  return `${authUrl}/${path}`;
}

export async function fetchAuthAPI(path) {
  const requestUrl = getAuthURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}
