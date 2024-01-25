import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Metadata } from 'next';

import addLeadingZeros from '@/lib/addLeadingZero';
import getPal from '@/lib/getPal';
import { getRandomPals } from '@/lib/getPals';
import { isLocal } from '@/lib/utils';

import BackButton from '@/components/buttons/BackButton';
import Container from '@/components/Container';
import Element from '@/components/Element';
import FoodMeter from '@/components/FoodMeter';
import IconNameDescription from '@/components/IconNameDescription';
import PalsSpotlight from '@/components/PalsSpotlight';

import PalImage from '@/app/paldeck/[...slug]/PalImage';

import { PalsListType } from '@/types/pal';
type SinglePalData = {
  pal: PalsListType;
  randomPals: PalsListType;
};

async function getData(slug: string): Promise<SinglePalData> {
  const res = await getPal(slug);
  const randomPals = await getRandomPals({ noCache: true, noOfPals: 3 });

  return { pal: res?.data, randomPals };
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getData(params.slug);
  const currentPal = data.pal[0];

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
  const data: SinglePalData = await getData(params.slug);
  const currentPal = data.pal[0];
  const randomPals = data.randomPals;
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
  const habitatImage =
    currentPal.attributes.habitat?.data?.[0]?.attributes?.url;

  return (
    <main
      style={{ height: 'calc(100vh - 88px)' }}
      className="dark:bg-dark flex flex-col justify-between dark:text-white"
    >
      <section className="mb-4">
        <div className="layout relative py-2 text-left">
          <BackButton />
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
            <div className="relative z-0 col-span-2 flex flex-col gap-1 sm:col-span-1">
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
              <div className="my-2">
                <FoodMeter />
              </div>
              {itemsDrops?.length > 0 && (
                <div className="my-2">
                  <div className="mg-40px flex">
                    <h4>Possible Drops:</h4>
                  </div>
                  <div className="  flex flex-col items-start gap-1">
                    {itemsDrops?.map((i) => (
                      <IconNameDescription
                        key={`itemsDrops${i.id}`}
                        item={i.attributes}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <PalImage
            modelName={currentPal.attributes.name}
            bgColor1={bgColor1}
            bgColor2={bgColor2}
            habitatImage={habitatImage}
            modelImage={modelImage}
            modelUrl={modelUrl}
          />
        </div>
      </section>
      <Container customClass="w-full bg-slate-400/[.6] max-w-full p-2 md:p-0">
        <Container customClass="layout max-w-7xl py-2 sm:py-4 px-0 lg:px-0">
          {/* @ts-expect-error Server Component */}
          <PalsSpotlight randomPals={randomPals} />
        </Container>
      </Container>
    </main>
  );
}
