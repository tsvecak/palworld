import Script from 'next/script';

import { getRandomPals } from '@/lib/getPals';

import AdsComponent from '@/components/AdSense';
import PalCard from '@/components/cards/palCard/PalCard';

import { Pal } from '@/types/pal';

const PalsSpotlight = async () => {
  const data = await getRandomPals({ noCache: true, noOfPals: 4 });
  return (
    <div className="w-full">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3782270251926648"
        crossOrigin="anonymous"
      />
      <h3>Pals Spotlight</h3>
      <div className="mt-12 grid w-full max-w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
        {data.slice(0, 3).map((pal: Pal) => (
          <PalCard key={pal.id} pal={pal} />
        ))}
        <AdsComponent dataAdSlot="1663993890" pal={data[3]} />
      </div>
    </div>
  );
};

export default PalsSpotlight;
