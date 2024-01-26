'use client';
import Image from 'next/image';
import Link from 'next/link';

import { isLocal } from '@/lib/utils';

import { Item } from '@/types/items';

const ItemCard = ({ item }: { item: Item }) => {
  const name = item.attributes.name;
  const weight = item.attributes.weight;
  const modelUrl = item.attributes.icon?.data?.attributes?.url;
  const iconUrl: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  const icon = iconUrl && (
    <Image src={iconUrl} alt={name} width={80} height={80} className="mr-2" />
  );
  return (
    <div
      key={`item_drops_${item.id}`}
      className="relative flex w-[120px] flex-col items-center justify-start text-center text-sm"
    >
      <Link
        href={`/items-list/${item.attributes.slug}`}
        className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center border bg-slate-800 p-2 hover:bg-slate-900"
      >
        <div className="flex w-full flex-col items-center justify-center text-center">
          {icon}
          {weight === 0 || weight > 0 && (
            <b className="absolute left-0 top-0 w-[40px] bg-slate-500 px-1 text-sm">
              {weight}
            </b>
          )}
        </div>
      </Link>
      {name}
    </div>
  );
};

export default ItemCard;
