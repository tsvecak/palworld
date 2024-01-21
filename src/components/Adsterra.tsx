'use client';

import { useEffect, useRef } from 'react';

export default function Banner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (banner?.current?.firstChild) {
      document.getElementById('toms-ad')?.remove();
      document.getElementById('toms-ad-script')?.remove();
    }
    const atOptions = {
      key: 'f83069098ea47d989a65b6a43a0e1927',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {},
    };
    if (banner.current) {
      const conf = document.createElement('script');
      conf.id = 'toms-ad';
      const script = document.createElement('script');
      script.id = 'toms-ad-script';
      script.type = 'text/javascript';
      script.src = `//topcreativeformat.com/f83069098ea47d989a65b6a43a0e1927/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
  }, []);

  return <div ref={banner}></div>;
}
