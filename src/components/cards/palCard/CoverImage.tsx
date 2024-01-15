import Image from 'next/image';

/* eslint-disable @next/next/no-img-element */
const CoverImage = ({
  imageUrl,
  isModel,
}: {
  imageUrl: string;
  isModel: boolean;
}) => {
  const noModelStyles = {
    top: '40%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <Image
      className={
        isModel
          ? 'absolute -top-14 left-1/2 h-40 w-auto -translate-x-1/2'
          : 'absolute left-1/2 w-7/12'
      }
      src={imageUrl}
      alt="Sunset in the mountains"
      style={!isModel ? noModelStyles : {}}
    />
  );
};

export default CoverImage;
