import getElements from '@/lib/getElements';
import getPals from '@/lib/getPals';
import getWorkSuitability from '@/lib/getWorkSuitability';

import PalsList from '@/app/paldeck/PalsList';

async function getData() {
  const pals = await getPals();
  const elements = await getElements();
  const workSuitability = await getWorkSuitability();

  return {
    pals: pals.data,
    elements: elements.data,
    workSuitability: workSuitability.data,
  };
}
export default async function Paldeck() {
  const data = await getData();
  const palsList = data ? data.pals : [];
  const elementsList = data ? data.elements : [];
  const workSuitability = data ? data.workSuitability : [];
  return (
    <PalsList
      palsList={palsList}
      elements={elementsList}
      workSuitability={workSuitability}
    />
  );
}
