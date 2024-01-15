import Link from 'next/link';

import addLeadingZeros from '@/lib/addLeadingZero';

import CoverImage from '@/components/cards/palCard/CoverImage';

import { Pal } from '@/types/pal';

const PalCard = ({ pal }: { pal: Pal }) => {
  const coverUrl = pal.attributes.cover?.data?.attributes?.url;
  const coverImage: string = coverUrl
    ? `${process.env.STRAPI_URL}${coverUrl}`
    : '/images/logo.png';
  const elements = pal.attributes.elements?.data;
  const firstElement = elements?.[0];
  const bgColor1 = firstElement ? firstElement.attributes.color : '';
  const bgColor2 =
    elements?.length === 2 ? elements?.[1]?.attributes.color : '';
  const gradientBg = {
    backgroundColor: bgColor1,
    background: `radial-gradient(circle, ${bgColor1} 0%, ${bgColor2} 100%)`,
  };
  const wrapperClass =
    'relative mb-12 max-w-full rounded bg-emerald-800 py-4 pt-28 text-white shadow-lg';

  return (
    <Link href={`/paldex/${pal.attributes.slug}`} key={pal.id}>
      <div
        className={wrapperClass}
        style={bgColor2 ? gradientBg : { backgroundColor: bgColor1 }}
      >
        <CoverImage imageUrl={coverImage} isModel={!!coverUrl} />
        <div className="drop-shadow-new mx-auto grid w-10/12 grid-cols-2 justify-between self-center rounded-lg bg-purple-900 p-2 px-6 text-sm">
          <div className="font-bold">
            #{addLeadingZeros(pal.attributes.number, 3)}
          </div>
          <div className="text-right font-bold">{pal.attributes.name}</div>
        </div>
        <div className="absolute left-0 top-0 grid grid-cols-1 px-2 pt-2">
          {elements?.map((e) => {
            const icon = e.attributes.icon.data.attributes;
            return (
              <span
                key={icon.id}
                className="mb-2 mr-2 inline-block rounded-full border-2 bg-white px-1 py-1 text-center text-sm font-semibold leading-none text-black"
              >
                <img src={`${process.env.STRAPI_URL}${icon.url}`} />
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
