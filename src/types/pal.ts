import { RootNode } from "@strapi/blocks-react-renderer/dist/BlocksRenderer";

import { StrapiImage } from "@/types/strapi";

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
        attributes: StrapiImage;
      };
    };
    elements: {
      data: Array<PalElement>;
    };
    items_drops: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
          description: string;
          icon:IconType;
        }
      }>
    };
    work_suitabilities: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
          description: string;
          icon: IconType;
        }
      }>
    };
    partner_skills: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
          description: string;
          icon: IconType;
        }
      }>
    };
  };
};

export type PalElement = {
  id: number;
  attributes: {
    name: string;
    color: string;
    slug: string;
    icon: {
      data: {
        id: number;
        attributes: StrapiImage;
      };
    };
  };
}
export type IconType = {
  icon: {
    data: {
      id: number;
      attributes: StrapiImage;
    };
  };
}