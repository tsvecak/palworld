import { ReactNode } from 'react';
export const containerClass = 'mx-auto flex max-w-7xl p-6 lg:px-8';
const Container = ({ children }: { children: ReactNode }) => {
  return <div className={containerClass}>{children}</div>;
};

export default Container;
