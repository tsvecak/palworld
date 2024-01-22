import { getRandomPals } from '@/lib/getPals';

import FeaturesSection from '@/components/FeaturesSection';
import FoodMeter from '@/components/FoodMeter';
import Hero from '@/components/Hero';

import { PalsListType } from '@/types/pal';

async function getData(): Promise<PalsListType> {
  const randomPals = await getRandomPals({ noCache: true, noOfPals: 3 });

  return randomPals;
}

export default async function HomePage() {
  const randomPals = await getData();
  return (
    <main>
      <Hero randomPals={randomPals} />
      <FeaturesSection />
      <FoodMeter foodAmount={5} />
    </main>
  );
}
