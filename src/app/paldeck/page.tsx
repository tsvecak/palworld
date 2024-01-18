import getPals from '@/lib/getPals';

import PalCard from '@/components/cards/palCard/PalCard';
import Container from '@/components/Container';

import { Pal } from '@/types/pal';

async function getData() {
  const res = await getPals();

  return res;
}
export default async function Paldeck() {
  const data: Array<Pal> = await getData();
  const palsList = data ? data : [];
  return (
    <main>
      <Container customClass="w-full">
        <div className="relative grid grid-cols-1 gap-x-2 gap-y-6 py-12 text-left sm:grid-cols-2 lg:grid-cols-4">
          {palsList?.map((p) => (
            <PalCard key={p.id} pal={p} />
          ))}
        </div>
      </Container>
    </main>
  );
}
