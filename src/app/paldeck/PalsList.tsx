'use client';

import { FormEvent, useState } from 'react';

import PalCard from '@/components/cards/palCard/PalCard';
import Container from '@/components/Container';

import SearchForm from '@/app/paldeck/SearchForm';

import { Pal, PalElement } from '@/types/pal';

const PalsList = ({
  palsList,
  elements,
}: {
  palsList: Pal[];
  elements: Array<PalElement>;
}) => {
  const [pals, setPals] = useState(palsList);

  const filterPals = (filters: { name: string; elements: Array<string> }) => {
    if (filters.name) {
      const nameFilter = filters.name as string;
      const newPals = pals;
      return newPals.filter((a) =>
        a.attributes.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    } else if (filters.elements.length > 0) {
      const elemsList = filters.elements as string[];
      const newPals = palsList;
      return newPals.filter((a) => {
        const hasOneOrMoreElems = elemsList.every((ele) =>
          a.attributes.elements.data.find((e) => {
            return e.attributes.name.toLowerCase() === ele;
          })
        );
        return hasOneOrMoreElems;
      });
    }

    return palsList;
  };

  const onSubmit = (
    e: FormEvent<HTMLFormElement>,
    filters: { name: string; elements: Array<string> }
  ) => {
    e?.preventDefault();
    const newPals = filterPals(filters);
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
    <main className="dark:bg-dark dark:text-white">
      <Container customClass="w-full">
        <div className="mx-auto max-w-xl">
          <SearchForm
            clearFilters={clearFilters}
            onSubmit={onSubmit}
            elements={elements}
          />
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
