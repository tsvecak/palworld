'use client';

import { useEffect, useRef, useState } from 'react';

import AdBlockModal from '@/components/AdsModal';

export default function Adsterra({
  height = 250,
  width = 300,
  adKey = 'f83069098ea47d989a65b6a43a0e1927',
}): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);
  const [hasAdBlock, setHasAdBlock] = useState(false);

  useEffect(() => {
    if (banner?.current?.firstChild) {
      document.getElementById(`ad_${adKey}`)?.remove();
      document.getElementById(`ad_script_${adKey}`)?.remove();
    }
    const atOptions = {
      key: adKey,
      format: 'iframe',
      height,
      width,
      params: {},
    };
    if (banner.current) {
      const conf = document.createElement('script');
      conf.id = `ad_${adKey}`;
      const script = document.createElement('script');
      script.id = `ad_script_${adKey}`;
      script.type = 'text/javascript';
      script.src = `//topcreativeformat.com/${adKey}/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
      script.onerror = function () {
        setHasAdBlock(true);
      };

      banner.current.append(conf);
      banner.current.append(script);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={banner}>
      <AdBlockModal isOpen={hasAdBlock} setIsOpen={setHasAdBlock} />
    </div>
  );
}
