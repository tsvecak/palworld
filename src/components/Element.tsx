import Image from 'next/image';

import { isLocal } from '@/lib/utils';

import { PalElement } from '@/types/pal';

const Element = ({ element }: { element: PalElement }) => {
  const icon = element.attributes.icon;
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
        {element.attributes.name}
      </div>
    </span>
  );
};

export default Element;
