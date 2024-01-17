import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import getPal from '@/lib/getPal';
import { isLocal } from '@/lib/utils';

import Blob from '@/components/Blob';
import Container from '@/components/Container';
import Element from '@/components/Element';
import PalsSpotlight from '@/components/PalsSpotlight';

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
  const elements = currentPal.attributes.elements?.data;
  const firstElement = elements?.[0];
  const bgColor1 = firstElement ? firstElement.attributes.color : '';
  const bgColor2 =
    elements?.length === 2 ? elements?.[1]?.attributes.color : '';

  return (
    <main>
      <section className="bg-white">
        <div className="layout relative flex flex-col py-12 text-left">
          <div className="z-10">
            <Link href="/paldeck" className=" underline underline-offset-2">
              {`< `}Back to Paldeck
            </Link>
            <h1>{currentPal.attributes.name}</h1>#{currentPal.attributes.number}
          </div>
          <div className="relative z-0">
            <Image
              className="w-auto transition-all group-hover:scale-110"
              src={modelImage}
              alt="Sunset in the mountains"
              style={{
                height: '150px',
                width: 'auto',
                margin: '0 auto',
              }}
              width={200}
              height={180}
            />
            <Blob color1={bgColor1} color2={bgColor2} />
          </div>
          {currentPal.attributes.caption}
          {currentPal.attributes.description && (
            <BlocksRenderer content={currentPal.attributes.description} />
          )}
          <div style={{ width: '140px' }}>
            {currentPal.attributes.elements?.data.map((e) => (
              <Element key={e.id} element={e} displayName={true} />
            ))}
          </div>
        </div>
      </section>
      <Container customClass="w-full bg-slate-400/[.6] max-w-full">
        <Container customClass="w-full max-w-full py-0">
          {/* @ts-expect-error Server Component */}
          <PalsSpotlight />
        </Container>
      </Container>
    </main>
  );
}
