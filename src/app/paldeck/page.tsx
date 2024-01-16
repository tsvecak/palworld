import getPals from '@/lib/getPals';

import PalCard from '@/components/cards/palCard/PalCard';
import { containerClass } from '@/components/Container';

import { Pal } from '@/types/pal';

async function getData() {
  const res = await getPals();

  return res;
}
export default async function Paldeck() {
  const data: { data: Array<Pal> } = await getData();
  const palsList = data ? data.data : [];
  return (
    <main>
      <section className={`${containerClass} flex-col`}>
        <div className="layout relative grid grid-cols-2 gap-x-2 gap-y-6 py-12 text-left lg:grid-cols-4">
          {palsList?.map((p) => (
            <PalCard key={p.id} pal={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
