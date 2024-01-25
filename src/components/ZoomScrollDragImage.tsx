import Image from 'next/image';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const ZoomScrollDragImage = ({
  src,
  alt,
  width = 500,
  height = 400,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => {
  return (
    <TransformWrapper>
      <TransformComponent>
        <Image
          className="w-auto rounded-xl transition-all"
          src={src}
          alt={alt}
          style={{
            width: '100%',
            margin: '0 auto',
          }}
          width={width}
          height={height}
        />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ZoomScrollDragImage;
