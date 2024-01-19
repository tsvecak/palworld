'use client';

import { useEffect, useState } from 'react';

import PalCard from '@/components/cards/palCard/PalCard';

import { Pal } from '@/types/pal';

const AdsComponent = (props: { dataAdSlot: any; pal: Pal }) => {
  const { dataAdSlot } = props;
  const [hasAd, setHasAd] = useState(true);

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle.push({});
      console.log('aaa');
    } catch (e) {
      console.log('bbb');
      setHasAd(false);
    }
  }, []);

  return hasAd ? (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-7m+eo+1+2-5"
      data-ad-client="ca-pub-3782270251926648"
      data-ad-slot={dataAdSlot}
      data-full-width-responsive="true"
      data-adtest="on"
    ></ins>
  ) : (
    <PalCard pal={props.pal} />
  );
};

export default AdsComponent;
