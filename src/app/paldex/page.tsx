import getPals from '@/lib/getPals';

import { containerClass } from '@/components/Container';
import PalCard from '@/components/cards/PalCard';
import { Pal } from '@/types/pal';

async function getData() {
  const res = await getPals();

  return res;
}
export default async function Paldex() {
  const data: { data: Array<Pal> } = await getData();
  const palsList = data ? data.data : [];
  return (
    <main>
      <section className={`${containerClass} flex-col`}>
        <h1>Paldex</h1>
        <div className="layout relative grid min-h-screen grid-cols-2 gap-2 py-12 text-left lg:grid-cols-4">
          {palsList?.map((p) => (
            <PalCard key={p.id} pal={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
