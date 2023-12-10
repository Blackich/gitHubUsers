export const apiKey = process.env.REACT_APP_API_KEY;
export const fetchOptions = {
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${apiKey}`,
  },
};

export const declOfNum = (num: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
};

export const convertBigNumber = (num: number) => {
  if (num >= 1000) {
    return `${Number((num / 1000).toFixed(1))}k`;
  }
  return num;
};

export const fetchRequest = (url: string) => {
  return fetch(url, fetchOptions)
    .then((response) => response.json())
    .catch((error) => new Error(error));
};

export const fetchMultipleRequests = (urls: string[]) => {
  const requests = urls.map((url) => fetchRequest(url));
  return Promise.all(requests);
};
