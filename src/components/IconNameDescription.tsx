import Image from 'next/image';
import Link from 'next/link';

import { isLocal } from '@/lib/utils';

import { IconType } from '@/types/pal';

const IconNameDescription = ({
  item,
}: {
  item: { name: string; description?: string; icon?: IconType };
}) => {
  const modelUrl = item.icon?.data?.attributes?.url;
  const modelImage: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  return (
    <div>
      <Link href={`/items-list/${item.slug}`}>
        {modelUrl && (
          <Image
            className="w-auto transition-all group-hover:scale-110"
            src={modelImage}
            alt={`${item.name} item, Palworld`}
            style={{
              height: '40px',
              width: 'auto',
              margin: '0 auto',
            }}
            width={40}
            height={40}
          />
        )}

        {item.name}
        {item.description ? ` - ${item.description}` : ''}
      </Link>
    </div>
  );
};

export default IconNameDescription;
