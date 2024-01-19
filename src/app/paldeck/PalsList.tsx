'use client';

import { FormEvent, useState } from 'react';

import PalCard from '@/components/cards/palCard/PalCard';
import Container from '@/components/Container';

import SearchForm from '@/app/paldeck/SearchForm';

import { Pal } from '@/types/pal';

const PalsList = ({ palsList }: { palsList: Pal[] }) => {
  const [pals, setPals] = useState(palsList);

  const filterPals = (filter: string) => {
    if (filter) {
      const newPals = pals;
      return newPals.filter((a) =>
        a.attributes.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return palsList;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>, filter: string) => {
    e?.preventDefault();
    const newPals = filterPals(filter);
    if (newPals && newPals?.length > 0) {
      setPals(newPals);
      return;
    }
    setPals([]);
  };

  const clearFilters = () => {
    setPals(palsList);
  };

  return (
    <main>
      <Container customClass="w-full">
        <div className="mx-auto max-w-xl">
          <SearchForm clearFilters={clearFilters} onSubmit={onSubmit} />
        </div>
        <div className="relative grid grid-cols-1 gap-x-2 gap-y-6 py-12 text-left sm:grid-cols-2 lg:grid-cols-4">
          {pals?.map((p) => (
            <PalCard key={p.id} pal={p} />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default PalsList;
