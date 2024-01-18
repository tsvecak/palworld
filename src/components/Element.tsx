import clsx from 'clsx';
import Image from 'next/image';

import { isLocal } from '@/lib/utils';

import { PalElement } from '@/types/pal';

const Element = ({
  element,
  displayName,
}: {
  element: PalElement;
  displayName?: boolean;
}) => {
  const icon = element.attributes.icon;
  let wrapperClass = clsx(
    `mb-2 mr-2 flex items-center gap-2 rounded-full border-2 bg-white px-1 py-1 text-center text-sm font-semibold text-black hover:w-auto hover:pr-3 ${
      displayName ? 'pr-3' : ''
    }`
  );
  let elemClass = 'overflow-hidden transition-all';
  if (!displayName) {
    wrapperClass = clsx(wrapperClass, 'w-[32px] hover:w-auto');
    elemClass = clsx(elemClass, 'w-0 group-hover:w-full');
  }
  return (
    <span key={icon.data.id} className={wrapperClass}>
      <Image
        src={isLocal(icon.data.attributes.url)}
        alt={icon.data.attributes.name}
        width={24}
        height={24}
      />
      <div className={elemClass} style={{ width: '100%', textAlign: 'left' }}>
        {element.attributes.name}
      </div>
    </span>
  );
};

export default Element;
