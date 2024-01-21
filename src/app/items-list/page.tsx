import Link from 'next/link';

import getItems from '@/lib/getItems';

import Container from '@/components/Container';
import PalsSpotlight from '@/components/PalsSpotlight';

async function getData() {
  const items = await getItems();

  return {
    items: items.data,
  };
}
export default async function Paldeck() {
  const data = await getData();
  const items = data ? data.items : [];

  return (
    <main
      className="dark:bg-dark flex h-full flex-col justify-between dark:text-white"
      style={{
        height: 'auto',
        minHeight: 'calc(100% - 72px)',
      }}
    >
      <Container customClass="w-full">
        <div className="mx-auto grid w-full grid-cols-4 gap-2">
          {items.map((i: any) => {
            const name = i.attributes.name;
            const description = i.attributes.description;
            const palsLength = i.attributes.pals?.data?.length || 0;
            const hasPals = palsLength > 0;
            const palsWording = palsLength > 1 ? 'Pals' : 'Pal';
            return (
              <div key={`item_drops_${i.id}`} className="rounded border p-2">
                <Link
                  href={`/items-list/${i.attributes.slug}`}
                  className="cursor-pointer"
                >
                  <b>{name}</b>
                  {description ? ` - ${description}` : ''}
                  <div className="grid grid-cols-3">
                    {hasPals
                      ? `Dropped by: ${palsLength} ${palsWording}`
                      : 'Gatherable'}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
      <Container customClass="w-full bg-slate-400/[.6] max-w-full p-2 md:p-0">
        <Container customClass="layout max-w-7xl py-2 sm:py-4 px-0 lg:px-0">
          {/* @ts-expect-error Server Component */}
          <PalsSpotlight />
        </Container>
      </Container>
    </main>
  );
}
