import getPals from '@/lib/getPals';

import PalCard from '@/components/cards/palCard/PalCard';

import { Pal } from '@/types/pal';

async function getData() {
  const res = await getPals();

  return res;
}
export default async function HomePage() {
  const data: { data: Array<Pal> } = await getData();
  const palsList = data ? data.data : [];

  return (
    <main>
      <section className="bg-white">
        <div className="layout relative flex min-h-screen flex-col py-12 text-left">
          {palsList?.map((p) => (
            <PalCard key={p.id} pal={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
