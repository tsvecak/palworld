import { IconType } from "@/types/pal";

export type WorkSuitability = {
  attributes: {
    name: string;
    slug: string;
    icon: IconType;
  },
  id: number
}