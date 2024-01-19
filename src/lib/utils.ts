import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLocal(url: string) {
  const currEnv = process.env.NODE_ENV
  if(currEnv === 'production') return url;
  if(url.includes('cloudinary')) return url
  const newUrl = `${process.env.STRAPI_URL}${url}`
  return newUrl
};