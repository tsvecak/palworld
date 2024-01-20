import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Metadata } from 'next';
import Image from 'next/image';

import addLeadingZeros from '@/lib/addLeadingZero';
import getPal from '@/lib/getPal';
import { isLocal } from '@/lib/utils';

import Blob from '@/components/Blob';
import BackButton from '@/components/buttons/BackButton';
import Container from '@/components/Container';
import Element from '@/components/Element';
import IconNameDescription from '@/components/IconNameDescription';
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
  const { data }: { data: Array<Pal> } = await getData(params.slug);
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
  const habitatImage = currentPal.attributes.habitat.data[0].attributes.url;
  console.log(habitatImage);
  return (
    <main
      style={{ height: 'calc(100vh - 72px)' }}
      className="flex flex-col justify-between"
    >
      <section className="mb-4 bg-white">
        <div className="layout relative py-2 text-left">
          <BackButton label="Back to Paldeck" />
        </div>
        <div className="layout grid-col relative grid justify-center gap-y-4 py-2 text-left sm:grid-cols-2 sm:py-10">
          <div className="z-10 col-span-2 sm:col-span-1">
            #{addLeadingZeros(currentPal.attributes.number, 3)}
            <h1>{currentPal.attributes.name}</h1>
            <p className="mb-2 text-xs italic">
              {currentPal.attributes.caption}
            </p>
            {currentPal.attributes.description && (
              <div className="relative z-0 col-span-10 mb-4">
                <BlocksRenderer content={currentPal.attributes.description} />
              </div>
            )}
            <div className="flex flex-wrap">
              {currentPal.attributes.elements?.data.map((e) => (
                <Element key={e.id} element={e} displayName={true} />
              ))}
            </div>
            <div className="relative z-0 col-span-2 flex flex-col sm:col-span-1">
              {partnerSkills?.length > 0 && (
                <div className="my-2">
                  <h4>Partner Skill:</h4>
                  {partnerSkills?.map((i) => (
                    <IconNameDescription
                      key={`partnerSkills${i.id}`}
                      item={i.attributes}
                    />
                  ))}
                </div>
              )}
              {workSuitabilities?.length > 0 && (
                <div className="my-2">
                  <h4>Work Suitability:</h4>
                  {workSuitabilities?.map((i) => (
                    <IconNameDescription
                      key={`workSuitabilities${i.id}`}
                      item={i.attributes}
                    />
                  ))}
                </div>
              )}
              {itemsDrops?.length > 0 && (
                <div className="my-2">
                  <h4>Possible Drops:</h4>
                  {itemsDrops?.map((i) => (
                    <IconNameDescription
                      key={`itemsDrops${i.id}`}
                      item={i.attributes}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="relative z-0 col-span-2 flex h-full w-full items-center justify-start sm:col-span-1">
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
          <div>
            <Image
              className="w-auto transition-all group-hover:scale-110"
              src={isLocal(habitatImage)}
              alt="Sunset in the mountains"
              style={{
                height: modelUrl ? '200px' : '50px',
                width: 'auto',
                margin: '0 auto',
              }}
              width={200}
              height={180}
            />
          </div>
        </div>
      </section>
      <Container customClass="w-full bg-slate-400/[.6] max-w-full p-2 md:p-0">
        <Container customClass="layout max-w-7xl py-2 sm:py-4 px-0 lg:px-0">
          {/* @ts-expect-error Server Component */}
          <PalsSpotlight />
        </Container>
      </Container>
    </main>
  );
}
