import getPals from '@/lib/getPals';

import PalsList from '@/app/paldeck/PalsList';

import { Pal } from '@/types/pal';

async function getData() {
  const res = await getPals();

  return res;
}
export default async function Paldeck() {
  const { data }: { data: Array<Pal> } = await getData();
  const palsList = data ? data : [];
  return <PalsList palsList={palsList} />;
}
