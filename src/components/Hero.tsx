import Link from 'next/link';

import Adsterra from '@/components/Adsterra';
import Container from '@/components/Container';
import PalsSpotlight from '@/components/PalsSpotlight';

import { PalsListType } from '@/types/pal';

export default function Hero({ randomPals }: { randomPals: PalsListType }) {
  return (
    <div
      className="w-100 background-pattern negativeIndex relative isolate flex h-full flex-col justify-between pb-2 md:h-[calc(100vh_-_88px)] md:max-h-screen"
      style={{
        backgroundImage: 'url(/images/palworld-large.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto flex h-full items-center px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Fan made Paldeck
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              This page is still in progress and some of the info might not be
              100% correct. This will be corrected as we get access to the game.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://store.steampowered.com/app/1623730/Palworld/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                target="_blank"
              >
                Get on Steam
              </Link>
              <Link
                href="/paldeck"
                className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Paldeck
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 my-4 flex h-[90px] items-center justify-center">
        <Adsterra
          adKey="e3cbc1a0abc253ccf6768736ea421faf"
          width={728}
          height={90}
        />
      </div>
      <Container customClass="w-full  bg-slate-400/[.6]">
        {/* @ts-expect-error Server Component */}
        <PalsSpotlight randomPals={randomPals} noAds={true} />
      </Container>
    </div>
  );
}
