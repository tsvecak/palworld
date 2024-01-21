'use client';

import { useEffect, useRef } from 'react';

export default function Banner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atOptions = {
      key: '1da3d983f33a6ba2dd5dcb675547fc78',
      format: 'iframe',
      height: 50,
      width: 320,
      params: {},
    };
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//pl22226563.toprevenuegate.com/1da3d983f33a6ba2dd5dcb675547fc78/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
      banner.current.append(conf);
      banner.current.append(script);
    }
  }, [banner]);

  return (
    <div
      style={{
        height: 50,
        width: 320,
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        marginTop: '1.25rem',
        marginBottom: '1.25rem',
        color: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: '1px',
        borderColor: '#E5E7EB',
      }}
      ref={banner}
    ></div>
  );
}
