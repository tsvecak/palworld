'use client';
import { useEffect, useRef } from 'react';

interface AdsterraProps {
  slot?: string;
}

const getId = (slot: string) => `atContainer-${slot}`;

const Adsterra = ({
  slot = '1da3d983f33a6ba2dd5dcb675547fc78',
}: AdsterraProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current?.firstChild && slot) {
      const atAsyncOptions = {
        key: slot,
        format: 'js',
        async: true,
        container: getId(slot),
        params: {},
      };

      const conf = document.createElement('script');
      conf.innerHTML = `
        if (typeof atAsyncOptions !== 'object') var atAsyncOptions = [];
        atAsyncOptions.push(${JSON.stringify(atAsyncOptions, null, 2)});
      `;
      conf.type = 'text/javascript';

      const script = document.createElement('script');
      script.async = true;
      script.src = `//pl22226563.toprevenuegate.com/${slot}/invoke.js`;
      script.type = 'text/javascript';

      if (ref.current) {
        ref.current.append(conf);
        ref.current.append(script);
      }
    }
  }, [slot]);

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <div {...{ ref }} />
      <div id={getId(slot)} />
    </>
  );
};

export default Adsterra;
