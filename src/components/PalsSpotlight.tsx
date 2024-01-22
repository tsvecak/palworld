import AdsTerra from '@/components/Adsterra';
import PalCard from '@/components/cards/palCard/PalCard';

import { Pal, PalsListType } from '@/types/pal';
const PalsSpotlight = ({ randomPals }: { randomPals: PalsListType }) => {
  return (
    randomPals &&
    randomPals.length > 0 && (
      <div className="w-full">
        <h3 className="text-dark mb-4 dark:text-white">Pals Spotlight</h3>
        <div className="grid w-full max-w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
          {randomPals.slice(0, 3).map((pal: Pal) => (
            <PalCard key={pal.id} pal={pal} center={true} />
          ))}
          <AdsTerra />
        </div>
      </div>
    )
  );
};

export default PalsSpotlight;
