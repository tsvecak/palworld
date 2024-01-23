import { getRandomPals } from '@/lib/getPals';

import FeaturesSection from '@/components/FeaturesSection';
import Hero from '@/components/Hero';

import { PalsListType } from '@/types/pal';

async function getData(): Promise<PalsListType> {
  const randomPals = await getRandomPals({ noCache: true, noOfPals: 4 });

  return randomPals;
}

export default async function HomePage() {
  const randomPals = await getData();
  return (
    <main>
      <Hero randomPals={randomPals} />
      <FeaturesSection />
    </main>
  );
}
