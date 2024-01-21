import { getRandomPals } from '@/lib/getPals';

import PalCard from '@/components/cards/palCard/PalCard';

import { Pal } from '@/types/pal';

const PalsSpotlight = async () => {
  const data = await getRandomPals({ noCache: true, noOfPals: 4 });
  return (
    <div className="w-full">
      <h3 className="text-dark mb-4 dark:text-white">Pals Spotlight</h3>
      <div className="grid w-full max-w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
        {data.slice(0, 3).map((pal: Pal) => (
          <PalCard key={pal.id} pal={pal} />
        ))}
      </div>
    </div>
  );
};

export default PalsSpotlight;
