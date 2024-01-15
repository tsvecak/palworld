export type Pal = {
  id: number,
  attributes: {
    name: string,
    slug: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    locale: string,
    number: number,
    cover: {
      data: {
        id: number,
        attributes: {
          name: string,
          alternativeText: string,
          caption: string,
          width: number,
          height: number,
          formats: [Object],
          hash: string,
          ext: string,
          mime: string,
          size: number,
          url: string,
          previewUrl: string,
          provider: string,
          provider_metadata: string,
          createdAt: string,
          updatedAt: string
        }
      }
    }
  }
}