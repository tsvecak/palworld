import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import addLeadingZeros from '@/lib/addLeadingZero';
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

  const itemsDrops = currentPal.attributes.items_drops?.data;
  const workSuitabilities = currentPal.attributes.work_suitabilities?.data;
  const partnerSkills = currentPal.attributes.partner_skills?.data;
  return (
    <main
      style={{ height: 'calc(100vh - 72px)' }}
      className="flex flex-col justify-between"
    >
      <section className="mb-4 h-full bg-white">
        <div className="layout relative py-2 text-left">
          <Link
            href="/paldeck"
            className="mb-auto underline underline-offset-2"
          >
            {`< `}Back to Paldeck
          </Link>
        </div>
        <div className="layout grid-col relative grid h-full grid-cols-10 justify-center gap-y-4 py-4 text-left">
          <div className="col-span-10 grid grid-cols-5 flex-col justify-between">
            <div className="z-10 col-span-2">
              #{addLeadingZeros(currentPal.attributes.number, 3)}
              <h1>{currentPal.attributes.name}</h1>
              <p className="mb-2 text-xs italic">
                {currentPal.attributes.caption}
              </p>
              <div style={{ width: '140px' }}>
                {currentPal.attributes.elements?.data.map((e) => (
                  <Element key={e.id} element={e} displayName={true} />
                ))}
              </div>
            </div>
            <div className="relative z-0 col-span-3 flex items-center justify-start">
              <Image
                className="w-auto transition-all group-hover:scale-110"
                src={modelImage}
                alt="Sunset in the mountains"
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
          </div>
          {currentPal.attributes.description && (
            <div className="relative z-0 col-span-10">
              <BlocksRenderer content={currentPal.attributes.description} />
            </div>
          )}
          <div className="relative z-0 col-span-10 flex flex-col">
            {itemsDrops?.length > 0 && (
              <div className="my-2">
                <h4>Possible Drops:</h4>
                {itemsDrops?.map(
                  (i) => `${i.attributes.name} - ${i.attributes.description}`
                )}
              </div>
            )}
            {workSuitabilities?.length > 0 && (
              <div className="my-2">
                <h4>Work Suitability:</h4>
                {workSuitabilities?.map(
                  (i) => `${i.attributes.name} - ${i.attributes.description}`
                )}
              </div>
            )}
            {partnerSkills?.length > 0 && (
              <div className="my-2">
                <h4>Partner Skill:</h4>
                {partnerSkills?.map(
                  (i) => `${i.attributes.name} - ${i.attributes.description}`
                )}
              </div>
            )}
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
