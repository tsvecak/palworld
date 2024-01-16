import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Metadata } from 'next';
import Link from 'next/link';

import getPal from '@/lib/getPal';
import { isLocal } from '@/lib/utils';

import ModelImage from '@/components/cards/palCard/ModelImage';

import { Pal } from '@/types/pal';

async function getData(slug: string): Promise<{ data: Array<Pal> }> {
  const res = await getPal(slug);

  return res;
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await getData(params.slug);
  const currentPal = data[0];

  const modelUrl = currentPal.attributes.model?.data?.attributes?.url;
  const modelImage: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';
  return {
    title: currentPal.attributes.name,
    openGraph: {
      images: [modelImage],
    },
  };
}

export default async function SinglePalPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data } = await getData(params.slug);
  const currentPal = data[0];
  const modelUrl = currentPal.attributes.model?.data?.attributes?.url;
  const modelImage: string = modelUrl ? isLocal(modelUrl) : '/images/logo.png';

  return (
    <main>
      <section className="bg-white">
        <div className="layout relative flex min-h-screen flex-col py-12 text-left">
          <Link href="/paldeck" className=" underline underline-offset-2">
            {`< `}Back to Paldeck
          </Link>
          <h1>{currentPal.attributes.name}</h1>#{currentPal.attributes.number}
          <ModelImage imageUrl={modelImage} isModel={!!modelUrl} />
          {currentPal.attributes.caption}
          {currentPal.attributes.description && (
            <BlocksRenderer content={currentPal.attributes.description} />
          )}
        </div>
      </section>
    </main>
  );
}
