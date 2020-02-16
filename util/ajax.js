async function getApiData(currentPage = 1) {
  // This free API_KEY is not a sensitive key.
  const API_KEY = '25130a2912004fd7a34da08a227c8d96';
  const apiHost = `https://newsapi.org/v2/top-headlines?country=au&category=business&apiKey=${API_KEY}`;
  return Promise.race([
    fetch(`${apiHost}&page=${currentPage}`),
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              'It seems that we have encountered a network related issue',
            ),
          ),
        15000,
      ),
    ),
  ]);

  // return fetch(`${apiHost}&page=${currentPage}`);
}

exports.getApiData = getApiData;
