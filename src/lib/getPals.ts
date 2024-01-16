const getPals = async (query?: string) => {
  return fetch(
    `${process.env.STRAPI_URL}/api/pals?${
      query ? `&${query}` : ''
    }&pagination[page]=1&pagination[pageSize]=200`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      next: { revalidate: 1000 },
    }
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((errors) => console.log(errors));
};

export async function getRandomPalData() {
  const res = await getPals();
  const palsList = res.data;
  const item = palsList[Math.floor(Math.random() * palsList.length)];
  return item;
}

export default getPals;
