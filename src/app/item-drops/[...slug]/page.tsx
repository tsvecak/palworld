import getItem from '@/lib/getItem';

import PalCard from '@/components/cards/palCard/PalCard';
import Container from '@/components/Container';
import PalsSpotlight from '@/components/PalsSpotlight';

import { Pal } from '@/types/pal';

async function getData(slug: string): Promise<{ data: Array<any> }> {
  const items = await getItem(slug);
  return items.data;
}
export default async function SingleItemDropPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);
  const items = data ? (data as unknown as Array<any>) : [];
  return (
    <main
      className="flex h-full flex-col justify-between"
      style={{
        height: 'calc(100vh - 72px)',
      }}
    >
      <Container customClass="w-full">
        <div className="mx-auto w-full">
          {items.map((i) => {
            const name = i.attributes.name;
            const description = i.attributes.description;
            return (
              <div key={`item_drops_${i.id}`}>
                <h1 className="mb-4">{name}</h1>
                <p>{description ? ` - ${description}` : ''}</p>
                <div className="grid grid-cols-3 gap-2">
                  <h2 className="col-span-3 mb-4">Dropped by these Pals</h2>
                  {i.attributes.pals.data.map((p: Pal) => (
                    <PalCard key={p.id} pal={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <Container customClass="w-full  bg-slate-400/[.6]">
        {/* @ts-expect-error Server Component */}
        <PalsSpotlight />
      </Container>
    </main>
  );
}
