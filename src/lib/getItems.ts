const getItems = async (query?: string, noCache?: boolean) => {
  return fetch(
    `${process.env.STRAPI_URL}/api/items-drops?${
      query ? `&${query}` : ''
    }`,
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

export default getItems