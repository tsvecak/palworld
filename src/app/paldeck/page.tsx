import getElements from '@/lib/getElements';
import getPals from '@/lib/getPals';

import PalsList from '@/app/paldeck/PalsList';

async function getData() {
  const pals = await getPals();
  const elements = await getElements();

  return {
    pals: pals.data,
    elements: elements.data,
  };
}
export default async function Paldeck() {
  const data = await getData();
  const palsList = data ? data.pals : [];
  const elementsList = data ? data.elements : [];
  return <PalsList palsList={palsList} elements={elementsList} />;
}
