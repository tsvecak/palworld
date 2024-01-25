'use client';
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
          {itemsList.map((i) => (
            <ItemCard key={i.id} item={i} />
          ))}
        </div>
      </Container>
    </main>
  );
}
