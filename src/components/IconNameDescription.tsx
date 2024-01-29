import Image from 'next/image';
import Link from 'next/link';

import { isLocal } from '@/lib/utils';

import { IconType } from '@/types/pal';

const IconNameDescription = ({
  item,
  noLink,
  showDescription = false
}: {
  item: {
    name: string;
    description?: string;
    icon?: IconType;
    slug: string;
  };
  noLink?: boolean;
  showDescription?: boolean
}) => {
  const modelUrl = item.icon?.data?.attributes?.url;
  const modelImage: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  const Component = () => {
    return (
      <div className="flex items-center flex-wrap">
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

        <span className="underline underline-offset-2">
          {item.name}
        </span>
        {showDescription && <p>{item.description}</p>}
      </div>
    );
  };
  return noLink ? (
    <Component />
  ) : (
    <Link
      href={`/items-list/${item.slug}`}
      className="flex items-center underline underline-offset-2"
    >
      <Component />
    </Link>
  );
};

export default IconNameDescription;
