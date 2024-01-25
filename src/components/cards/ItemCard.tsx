'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { isLocal } from '@/lib/utils';

import { Item } from '@/types/items';

const ItemCard = ({ item }: { item: Item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const name = item.attributes.name;
  const weight = item.attributes.weight;
  const palsList = item.attributes.pals?.data;
  const categories = item.attributes.item_categories?.data;
  const sources = item.attributes.item_sources?.data;
  const modelUrl = item.attributes.icon?.data?.attributes?.url;
  const iconUrl: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  const icon = iconUrl && (
    <Image src={iconUrl} alt={name} width={80} height={80} className="mr-2" />
  );
  console.log({ item });
  return (
    <div
      key={`item_drops_${item.id}`}
      className="relative flex w-[120px] flex-col items-center justify-start text-center text-sm"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/items-list/${item.attributes.slug}`}
        className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center border bg-slate-800 p-2"
      >
        <div className="flex w-full flex-col items-center justify-center text-center">
          {icon}
          {weight > 0 && (
            <b className="absolute left-0 top-0 w-[40px] bg-slate-500 px-1 text-sm">
              {weight}
            </b>
          )}
        </div>
      </Link>
      {name}
      {isHovered && (
        <div className="absolute bottom-0 right-0 z-50 w-[350px] border bg-slate-500 p-4 text-left">
          {name}
          {icon}
          {categories.map((c) => c.attributes.name).join(', ')}
          <br />
          {item.attributes.rarity && (
            <div className=" capitalize">Rarity: {item.attributes.rarity}</div>
          )}
          {item.attributes.description}
        </div>
      )}
    </div>
  );
};

export default ItemCard;
