import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLocal(url: string) {
  let notProd = process.env.NODE_ENV !== 'production';
  if(url.includes('cloudinary')) notProd = false
  return notProd ? process.env.STRAPI_URL + url : url;
};