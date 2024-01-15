const getPal = async (slug: string) => {
  return fetch(`${process.env.STRAPI_URL}/api/pals?filters[slug][$eq]=${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => data)
    .catch(errors => console.log(errors))
}

export default getPal;