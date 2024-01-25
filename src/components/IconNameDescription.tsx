import Image from 'next/image';
import Link from 'next/link';

import { isLocal } from '@/lib/utils';

import { IconType } from '@/types/pal';

const IconNameDescription = ({
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
  return (
    <Link
      href={`/items-list/${item.slug}`}
      className="flex items-center underline underline-offset-2"
    >
      {modelUrl && (
        <Image
          className="mr-2 w-auto transition-all group-hover:scale-110"
          src={modelImage}
          alt={`${item.name} item, Palworld`}
          style={{
            height: '30px',
            width: 'auto',
          }}
          width={30}
          height={30}
        />
      )}

      {item.name}
    </Link>
  );
};

export default IconNameDescription;
