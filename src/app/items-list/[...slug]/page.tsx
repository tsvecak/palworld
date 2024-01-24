import Image from 'next/image';

import getItem from '@/lib/getItem';
import { getRandomPals } from '@/lib/getPals';

import BackButton from '@/components/buttons/BackButton';
import PalCard from '@/components/cards/palCard/PalCard';
import Container from '@/components/Container';
import PalsSpotlight from '@/components/PalsSpotlight';

import { Item } from '@/types/items';
import { Pal, PalsListType } from '@/types/pal';

async function getData(
  slug: string
): Promise<{ items: Array<Item>; randomPals: PalsListType }> {
  const items = await getItem(slug);
  const randomPals = await getRandomPals({ noCache: true, noOfPals: 4 });
  return { items: items.data, randomPals: randomPals };
}
export default async function SingleItemDropPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);
  const items = data ? data.items : [];
  const randomPals = data ? data.randomPals : [];

  return (
    <main
      className="dark:bg-dark flex h-full flex-col justify-between dark:text-white"
      style={{
        height: 'calc(100vh - 88px)',
      }}
    >
      <Container customClass="w-full">
        <BackButton />
        <div className="mx-auto w-full">
          {items.map((i) => {
            const name = i.attributes.name;
            const description = i.attributes.description;
            const categories = i.attributes.item_categories?.data;
            const sources = i.attributes.item_sources?.data;
            const palsList = i.attributes.pals?.data;
            const iconUrl = i.attributes.icon?.data?.attributes?.url;

            return (
              <div key={`item_drops_${i.id}`}>
                <div className="my-4 flex w-full items-center">
                  {iconUrl && (
                    <Image
                      src={iconUrl}
                      alt={name}
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                  )}

                  <h1>{name}</h1>
                </div>
                {description && <p className="mb-4">{description}</p>}
                <div>
                  Category:{' '}
                  {categories && categories.length > 0
                    ? categories.map((c) => c.attributes.name).join(', ')
                    : 'Unknown'}
                </div>
                <div>
                  Obtained by:{' '}
                  {sources && sources.length > 0
                    ? sources.map((c) => c.attributes.name).join(', ')
                    : 'Unknown'}
                </div>
                {palsList && palsList.length > 0 ? (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-2">
                    <h4 className="col-span-1 md:col-span-4 mb-4">Dropped by these Pals</h4>
                    {i.attributes.pals.data.map((p: Pal) => (
                      <PalCard key={p.id} pal={p} />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
      <Container customClass="w-full bg-slate-400/[.6] max-w-full p-2 md:p-0">
        <Container customClass="layout max-w-7xl py-2 sm:py-4 px-0 lg:px-0">
          {/* @ts-expect-error Server Component */}
          <PalsSpotlight randomPals={randomPals} noAds={true} />
        </Container>
      </Container>
    </main>
  );
}
