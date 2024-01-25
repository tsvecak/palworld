import Image from 'next/image';

import { isLocal } from '@/lib/utils';

import { IconType } from '@/types/pal';

const IconLevel = ({
  item,
}: {
  item: {
    name: string;
    description?: string;
    icon?: IconType;
    slug: string;
  };
}) => {
  const modelUrl = item.icon?.data?.attributes?.url;
  const modelImage: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  let level = item.name.toLowerCase();
  if (level.includes(' lv')) {
    const nameArray = level.split(' lv');
    level = nameArray[nameArray.length - 1];
  } else {
    level = '';
  }
  return (
    <div className="bg-dark relative flex items-center rounded-full border-2 border-slate-500 p-[4px]">
      {modelImage && (
        <Image
          className="w-auto transition-all"
          src={modelImage}
          alt={`${item.name} item, Palworld`}
          style={{
            height: '20px',
            width: 'auto',
          }}
          width={20}
          height={20}
        />
      )}
      {level && (
        <div className="absolute bottom-0 right-0 drop-shadow-md">{level}</div>
      )}
    </div>
  );
};

export default IconLevel;
