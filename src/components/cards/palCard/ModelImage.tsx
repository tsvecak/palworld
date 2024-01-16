import Image from 'next/image';
import { CSSProperties } from 'react';

/* eslint-disable @next/next/no-img-element */
const CoverImage = ({
  imageUrl,
  isModel,
}: {
  imageUrl: string;
  isModel: boolean;
}) => {
  let styles: CSSProperties = {
    height: '150px',
    width: 'auto',
    margin: '0 auto',
    marginTop: '-3rem',
  };
  if (!isModel) {
    styles = {
      margin: '20px auto 0',
      width: '60%',
    };
  }
  return (
    <Image
      className={
        isModel
          ? 'w-auto transition-all group-hover:scale-110'
          : 'transition-all group-hover:scale-110'
      }
      src={imageUrl}
      alt="Sunset in the mountains"
      style={styles}
      width={200}
      height={180}
    />
  );
};

export default CoverImage;
