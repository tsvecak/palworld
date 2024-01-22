import { PalsListType } from '@/types/pal';
import { StrapiImage } from "@/types/strapi";

export type ItemCategory = {
  id: number;
  attributes: {
    name: string,
    slug: string
  }
}
export type ItemSource = {
  id: number;
  attributes: {
    name: string,
    slug: string
  }
}
export type Item = {
  id: number,
  attributes: {
    createdAt: string,   
    updatedAt: string,   
    publishedAt: string, 
    locale: string,
    name: string,
    description: string,      
    slug: string,
    rarity: string,
    weight: number,
    nutrition: number,
    san: number,
    capturePower: number,
    power: number,
    ct: number,
    accessoryEffect: number,
    icon: {data: {attributes: StrapiImage}},
    item_categories: {data: Array<ItemCategory>},
    item_sources: {data: Array<ItemSource> },
    pals: {data: PalsListType}
  }
}