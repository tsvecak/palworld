import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLocal(url: string) {
  const notProd = process.env.NODE_ENV !== 'production';
  return notProd ? process.env.STRAPI_URL + url : url;
};