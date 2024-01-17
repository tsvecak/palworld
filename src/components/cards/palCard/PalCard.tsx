import Link from 'next/link';

import addLeadingZeros from '@/lib/addLeadingZero';
import { isLocal } from '@/lib/utils';

import ModelImage from '@/components/cards/palCard/ModelImage';
import Element from '@/components/Element';

import { Pal } from '@/types/pal';
const PalCard = ({ pal }: { pal: Pal }) => {
  const modelUrl = pal.attributes.model?.data?.attributes?.url;
  const modelImage: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  const elements = pal.attributes.elements?.data;
  const firstElement = elements?.[0];
  const bgColor1 = firstElement ? firstElement.attributes.color : '';
  const bgColor2 =
    elements?.length === 2 ? elements?.[1]?.attributes.color : '';
  const gradientBg = {
    backgroundColor: bgColor1,
    background: `radial-gradient(circle, ${bgColor1} 0%, ${bgColor2} 100%)`,
  };

  const NumberNamePlate = () => (
    <div className="drop-shadow-new mx-auto -mt-4 grid w-10/12 grid-cols-2 justify-between self-center rounded-lg bg-purple-900 p-2 px-6 text-sm">
      <div className="font-bold">
        #{addLeadingZeros(pal.attributes.number, 3)}
      </div>
      <div className="text-right font-bold">{pal.attributes.name}</div>
    </div>
  );

  return (
    <Link href={`/paldeck/${pal.attributes.slug}`}>
      <div
        className="hover:animate-gradient group relative flex h-full min-h-36 max-w-full flex-col justify-between rounded bg-emerald-800 py-4 text-white shadow-lg"
        style={bgColor2 ? gradientBg : { backgroundColor: bgColor1 }}
      >
        <ModelImage imageUrl={modelImage} isModel={!!modelUrl} />
        <NumberNamePlate />
        <div className="absolute left-0 top-0 grid grid-cols-1 px-2 pt-2">
          {elements?.map((e) => {
            const icon = e.attributes.icon;
            return <Element element={e} key={icon.data.id} />;
          })}
        </div>
      </div>
    </Link>
  );
};

export default PalCard;
