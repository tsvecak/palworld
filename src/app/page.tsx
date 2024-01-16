import { getRandomPalData } from '@/lib/getPals';

import PalCard from '@/components/cards/palCard/PalCard';
import { containerClass } from '@/components/Container';
import Hero from '@/components/Hero';

export default async function HomePage() {
  const data = await getRandomPalData();

  return (
    <main>
      <Hero />
      <section className={`${containerClass} flex-col`}>
        <div className="w-60">
          <h3>Pal Spotlight</h3>
          <div className="mt-12 w-60 max-w-full">
            <PalCard pal={data} />
          </div>
        </div>
      </section>
    </main>
  );
}
