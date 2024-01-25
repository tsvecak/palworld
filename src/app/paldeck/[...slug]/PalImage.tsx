'use client';
import Image from 'next/image';
import { useState } from 'react';

import { isLocal } from '@/lib/utils';

import Blob from '@/components/Blob';
import Button from '@/components/buttons/Button';
import ZoomScrollDragImage from '@/components/ZoomScrollDragImage';

const PalImage = ({
  modelName,
  habitatImage,
  modelImage,
  modelUrl,
  bgColor1,
  bgColor2,
}: {
  modelName: string;
  habitatImage: string;
  modelImage: string;
  modelUrl: string;
  bgColor1: string;
  bgColor2: string;
}) => {
  const [activeView, setActiveView] = useState('gallery');

  return (
    <div className="relative z-0 col-span-2 flex h-full w-full flex-wrap items-center justify-start overflow-hidden sm:col-span-1">
      {habitatImage && (
        <div className="relative z-10 mb-2 w-full">
          <Button
            style={{ opacity: activeView === 'gallery' ? 0.8 : 1 }}
            onClick={() => setActiveView('gallery')}
            variant={activeView === 'gallery' ? 'primary' : 'light'}
            className="mr-2"
          >
            Gallery
          </Button>
          <Button
            onClick={() => setActiveView('habitat')}
            variant={activeView !== 'gallery' ? 'primary' : 'light'}
          >
            Habitat
          </Button>
        </div>
      )}
      {activeView === 'gallery' ? (
        <div className="relative z-0 flex h-full w-full items-center justify-start">
          <Image
            className="w-auto transition-all group-hover:scale-110"
            src={modelImage}
            alt={`${modelName} model, Palworld`}
            style={{
              height: modelUrl ? '200px' : '50px',
              width: 'auto',
              margin: '0 auto',
            }}
            width={200}
            height={180}
          />
          <Blob color1={bgColor1} color2={bgColor2} />
        </div>
      ) : habitatImage ? (
        <div className="habitat-image h-full w-full">
          <ZoomScrollDragImage src={isLocal(habitatImage)} alt={modelName} />
        </div>
      ) : null}
    </div>
  );
};

export default PalImage;
