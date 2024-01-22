const getPals = async (query?: string, noCache?: boolean) => {
  const apiUrl = `${process.env.STRAPI_URL}/api/pals?${
    query ? `&${query}` : ''
  }&pagination[page]=1&pagination[pageSize]=200`

  return fetch(
    apiUrl,
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

export async function getRandomPal({noCache}: {noCache:boolean}) {
  const res = await getPals('',noCache);
  const palsList = res;
  const item = palsList[Math.floor(Math.random() * palsList.length)];
  return item;
}
export async function getRandomPals({noCache, noOfPals = 4}: {noCache:boolean, noOfPals?: number}) {
  const res = await getPals('',noCache);
  const palsList = res?.data;
  if(palsList && palsList.length > 0) {
    const shuffled = palsList.sort(() => 0.5 - Math.random());
  
    const selected = shuffled.slice(0, noOfPals);
  
    return selected;
  }
  return []
}

export default getPals;
