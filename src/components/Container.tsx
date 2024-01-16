import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
export const containerClass = 'mx-auto max-w-7xl p-6 lg:px-8';
const Container = ({
  children,
  customClass,
}: {
  children: ReactNode;
  customClass?: string;
}) => {
  return (
    <div className={twMerge(clsx(containerClass, customClass))}>{children}</div>
  );
};

export default Container;
