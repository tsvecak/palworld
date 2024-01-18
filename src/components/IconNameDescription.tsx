import { IconType } from '@/types/pal';

const IconNameDescription = ({
  item,
}: {
  item: { name: string; description?: string; icon: IconType };
}) => {
  return (
    <div>
      {item.name}
      {item.description ? ` - ${item.description}` : ''}
    </div>
  );
};

export default IconNameDescription;
