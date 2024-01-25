'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

import Adsterra from '@/components/Adsterra';
import ItemCard from '@/components/cards/ItemCard';
import Container from '@/components/Container';

import SearchForm from '@/app/items-list/SearchForm';

import { Item, ItemCategory } from '@/types/items';

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

  const listItems = (items: Array<Item>) => {
    return items.map((i) => {
      return (
        <div
          key={`item_drops_${i.id}`}
          className="relative flex w-[120px] flex-col items-center justify-start text-center text-sm"
        >
          <Link
            href={`/items-list/${i.attributes.slug}`}
            className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center border bg-slate-800 p-2"
          >
            <div className="flex w-full flex-col items-center justify-center text-center">
              {iconUrl && (
                <Image
                  src={iconUrl}
                  alt={name}
                  width={80}
                  height={80}
                  className="mr-2"
                />
              )}
              {weight > 0 && (
                <b className="absolute left-0 top-0 w-[40px] bg-slate-500 px-1 text-sm">
                  {weight}
                </b>
              )}
            </div>
          </Link>
          {name}
        </div>
      );
    });
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
        <div className="col-span-4 mb-4 flex h-[90px] items-center justify-center">
          <Adsterra
            adKey="e3cbc1a0abc253ccf6768736ea421faf"
            width={728}
            height={90}
          />
        </div>
        <div className="mx-auto mb-4 max-w-xl">
          <SearchForm
            clearFilters={clearFilters}
            onSubmit={onSubmit}
            categories={categories}
          />
        </div>
        <div className="mx-auto flex w-full flex-wrap justify-center gap-4">
          {items.map((i) => (
            <ItemCard key={i.id} item={i} />
          ))}
        </div>
      </Container>
    </main>
  );
}
