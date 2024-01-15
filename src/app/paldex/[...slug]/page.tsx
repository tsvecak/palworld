import Link from 'next/link';

import getPal from '@/lib/getPal';

import { Pal } from '@/types/pal';

async function getData(slug: string): Promise<{ data: Array<Pal> }> {
  const res = await getPal(slug);

  return res;
}
export default async function SinglePalPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data } = await getData(params.slug);
  const currentPal = data[0];
  return (
    <main>
      <header>
        <Link href="/paldex">Back to Paldex</Link>
      </header>
      <section className="bg-white">
        <div className="layout relative flex min-h-screen flex-col py-12 text-left">
          <h1>{currentPal.attributes.name}</h1>#{currentPal.attributes.number} -{' '}
          {currentPal.attributes.name}
        </div>
      </section>
    </main>
  );
}
