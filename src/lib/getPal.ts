const getItem = async (slug: string, noCache?: boolean) => {
  return fetch(
    `${process.env.STRAPI_URL}/api/pals?filters[slug][$eq]=${slug}`,
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

export default getItem;
