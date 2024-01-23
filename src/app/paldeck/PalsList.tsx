'use client';

import { FormEvent, useState } from 'react';

import Adsterra from '@/components/Adsterra';
import PalCard from '@/components/cards/palCard/PalCard';
import Container from '@/components/Container';

import SearchForm from '@/app/paldeck/SearchForm';

import { Pal, PalElement } from '@/types/pal';
import { WorkSuitability } from '@/types/workSuitability';

const PalsList = ({
  palsList,
  elements,
  workSuitability,
}: {
  palsList: Pal[];
  elements: Array<PalElement>;
  workSuitability: Array<WorkSuitability>;
}) => {
  const [pals, setPals] = useState(palsList);

  const filterPals = (filters: {
    name: string;
    elements: Array<string>;
    workSuitability: Array<string>;
  }) => {
    const newPals = palsList;
    let filteredPals = [...newPals];
    if (filters.name) {
      const nameFilter = filters.name as string;
      filteredPals = filteredPals.filter((a) =>
        a.attributes.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (filters.elements.length > 0) {
      const elemsList = filters.elements as string[];
      filteredPals = filteredPals.filter((a) => {
        const hasOneOrMoreElems = elemsList.every((ele) =>
          a.attributes.elements.data.find((e) => {
            return e.attributes.name.toLowerCase() === ele;
          })
        );
        return hasOneOrMoreElems;
      });
    }
    if (filters.workSuitability.length > 0) {
      const workList = filters.workSuitability as string[];
      filteredPals = filteredPals.filter((a) => {
        const hasOneOrMoreWorks = workList.every((ele) =>
          a.attributes.work_suitabilities.data.find((e) => {
            return e.attributes.slug.toLowerCase() === ele;
          })
        );
        return hasOneOrMoreWorks;
      });
    }
    return filteredPals;
  };

  const onSubmit = (
    e: FormEvent<HTMLFormElement>,
    filters: { name: string; elements: Array<string>; workSuitability: any }
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
        <div className="col-span-4 my-4 flex h-[90px] items-center justify-center">
          <Adsterra
            adKey="e3cbc1a0abc253ccf6768736ea421faf"
            width={728}
            height={90}
          />
        </div>
        <div className="mx-auto max-w-xl">
          <SearchForm
            clearFilters={clearFilters}
            onSubmit={onSubmit}
            elements={elements}
            workSuitability={workSuitability}
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
