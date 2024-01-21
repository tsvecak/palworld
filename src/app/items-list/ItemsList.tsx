'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

import Container from '@/components/Container';
import PalsSpotlight from '@/components/PalsSpotlight';

import SearchForm from '@/app/items-list/SearchForm';

import { Item, ItemCategory } from '@/types/items';
import { Pal } from '@/types/pal';

export default function ItemsList({
  items,
  categories,
}: {
  items: Array<Item>;
  categories: Array<ItemCategory>;
}) {
  const [itemsList, setItemsList] = useState(items);
  const filterItems = (filters: {
    name: string;
    categoryFilter: Array<string>;
  }) => {
    if (filters.name) {
      const nameFilter = filters.name as string;
      const newItems = items;
      return newItems.filter((a) =>
        a.attributes.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    } else if (filters.categoryFilter.length > 0) {
      const categories = filters.categoryFilter as string[];
      const newItems = items;
      return newItems.filter((a) => {
        const hasOneOrMoreElems = categories.every((ele) =>
          a.attributes.item_categories.data.find((e) => {
            return e.attributes.slug.toLowerCase() === ele;
          })
        );
        return hasOneOrMoreElems;
      });
    }

    return items;
  };

  const onSubmit = (
    e: FormEvent<HTMLFormElement>,
    filters: { name: string; categoryFilter: Array<string> }
  ) => {
    e.preventDefault();
    const newItems = filterItems(filters);
    if (newItems && newItems?.length > 0) {
      setItemsList(newItems);
      return;
    }
    setItemsList([]);
  };

  const clearFilters = () => {
    setItemsList(items);
  };
  return (
    <main
      className="dark:bg-dark flex h-full flex-col justify-between dark:text-white"
      style={{
        height: 'auto',
        minHeight: 'calc(100% - 88px)',
      }}
    >
      <Container customClass="w-full">
        <div className="mx-auto mb-4 max-w-xl">
          <SearchForm
            clearFilters={clearFilters}
            onSubmit={onSubmit}
            categories={categories}
          />
        </div>
        <div className="mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {itemsList.map((i) => {
            const name = i.attributes.name;
            const palsList = i.attributes.pals?.data;
            const iconUrl = i.attributes.icon?.data?.attributes?.url;
            const categories: Array<ItemCategory> =
              i.attributes.item_categories?.data;
            const sources = i.attributes.item_sources?.data;

            return (
              <div key={`item_drops_${i.id}`} className="rounded border p-2">
                <Link
                  href={`/items-list/${i.attributes.slug}`}
                  className="cursor-pointer"
                >
                  <div className="flex w-full">
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={name}
                        width={50}
                        height={50}
                        className="mr-2"
                      />
                    )}
                    <b>{name}</b>
                  </div>
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
                </Link>
                <div className="flex flex-wrap gap-1">
                  {palsList && palsList.length > 0 && 'Dropped by:'}
                  {palsList.map((p: Pal) => (
                    <div key={`items_pals_${p.id}`}>
                      <Link
                        className=" underline underline-offset-2"
                        href={`/paldeck/${p.attributes.slug}`}
                      >
                        {p.attributes.name}
                      </Link>
                    </div>
                  ))}
                </div>
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
