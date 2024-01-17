import { RootNode } from "@strapi/blocks-react-renderer/dist/BlocksRenderer";

export type Pal = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    number: number;
    caption: string;
    description: RootNode[];
    model: {
      data: {
        id: number;
        attributes: {
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
          url: string;
          previewUrl: string;
          provider: string;
          provider_metadata: string;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
    elements: {
      data: Array<PalElement>;
    };
  };
};

export type PalElement = {
  id: number;
  attributes: {
    name: string;
    color: string;
    icon: {
      data: {
        id: number;
        attributes: {
          id: number;
          url: string;
          name: string;
          slug: string;
        };
      };
    };
  };
}