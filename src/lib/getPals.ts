const getPals = async (query?: string, noCache?: boolean) => {
  return fetch(
    `${process.env.STRAPI_URL}/api/pals?${
      query ? `&${query}` : ''
    }&pagination[page]=1&pagination[pageSize]=200&sort=number`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      cache: noCache ? 'no-store' : 'default'
    }
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((errors) => console.log(errors));
};

export async function getRandomPalData({noCache}: {noCache:boolean}) {
  const res = await getPals('',noCache);
  const palsList = res.data;
  const item = palsList[Math.floor(Math.random() * palsList.length)];
  return item;
}

export default getPals;
