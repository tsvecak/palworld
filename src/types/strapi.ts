export type StrapiImage = {
  id: number;
  url: string;
  name: string;
  slug: string;
}
export type FullStrapiImage = {
  id:number;
  url: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: [any];
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
}