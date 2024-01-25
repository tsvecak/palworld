import Link from 'next/link';

import addLeadingZeros from '@/lib/addLeadingZero';
import { isLocal } from '@/lib/utils';

import ModelImage from '@/components/cards/palCard/ModelImage';
import Element from '@/components/Element';
import IconLevel from '@/components/IconLevel';

import { Pal } from '@/types/pal';
const PalCard = ({ pal, center }: { pal: Pal; center?: boolean }) => {
  const modelUrl = pal.attributes.model?.data?.attributes?.url;
  const modelImage: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  const elements = pal.attributes.elements?.data;
  const work = pal.attributes.work_suitabilities?.data;
  const firstElement = elements?.[0];
  const bgColor1 = firstElement ? firstElement.attributes.color : '';
  const bgColor2 =
    elements?.length === 2 ? elements?.[1]?.attributes.color : '';
  const gradientBg = {
    backgroundColor: bgColor1,
    background: `radial-gradient(circle, ${bgColor1} 0%, ${bgColor2} 100%)`,
  };

  const NumberNamePlate = () => (
    <div className="drop-shadow-new mx-auto -mt-4 grid w-10/12 grid-cols-3 justify-between self-center rounded-lg bg-purple-900 p-2 px-6 text-sm">
      <div className="col-span-1 font-bold">
        #{addLeadingZeros(pal.attributes.number, 3)}
      </div>
      <div className="col-span-2 text-right font-bold">
        {pal.attributes.name}
      </div>
    </div>
  );

  return (
    <Link href={`/paldeck/${pal.attributes.slug}`}>
      <div
        className="hover:animate-gradient group relative flex h-full min-h-36 max-w-full flex-col justify-between rounded bg-emerald-800 py-4 text-white shadow-lg"
        style={bgColor2 ? gradientBg : { backgroundColor: bgColor1 }}
      >
        <ModelImage
          imageUrl={modelImage}
          isModel={!!modelUrl}
          center={center}
        />
        <NumberNamePlate />
        <div className="absolute left-0 top-0 grid grid-cols-1 px-2 pt-2">
          {elements?.map((e) => {
            const icon = e.attributes.icon;
            return <Element element={e} key={icon.data.id} />;
          })}
        </div>
        <div
          className="absolute right-0 top-0 grid grid-cols-3 justify-end px-2 pt-2"
          style={{ direction: 'rtl' }}
        >
          {work?.map((e) => {
            return <IconLevel key={e.id} item={e.attributes} />;
          })}
        </div>
      </div>
    </Link>
  );
};

export default PalCard;
