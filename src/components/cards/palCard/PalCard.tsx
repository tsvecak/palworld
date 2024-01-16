import Image from 'next/image';
import Link from 'next/link';

import addLeadingZeros from '@/lib/addLeadingZero';
import { isLocal } from '@/lib/utils';

import ModelImage from '@/components/cards/palCard/ModelImage';

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
            return (
              <span
                key={icon.data.id}
                className="mb-2 mr-2 flex w-[32px] items-center gap-2 rounded-full border-2 bg-white px-1 py-1 text-center text-sm font-semibold leading-none text-black transition-all duration-500 hover:w-auto"
              >
                <Image
                  src={isLocal(icon.data.attributes.url)}
                  alt={icon.data.attributes.name}
                  width={20}
                  height={20}
                />
                <div
                  className="w-0 overflow-hidden transition-all group-hover:w-full"
                  style={{ lineHeight: 1 }}
                >
                  {e.attributes.name}
                </div>
                {/* TODO: add hover effect to show name */}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default PalCard;
