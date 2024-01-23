'use client';
import { FormEvent, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoCloseOutline } from 'react-icons/io5';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Element from '@/components/Element';

import { PalElement } from '@/types/pal';
import { WorkSuitability } from '@/types/workSuitability';

const SearchForm = ({
  onSubmit,
  clearFilters,
  elements,
  workSuitability,
}: {
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    e: FormEvent<HTMLFormElement>,
    // eslint-disable-next-line no-unused-vars
    filters: {
      name: string;
      elements: Array<string>;
      workSuitability: Array<string>;
    }
  ) => void;
  clearFilters: () => void;
  elements: Array<PalElement>;
  workSuitability: Array<WorkSuitability>;
}) => {
  const [nameFilter, setNameFilter] = useState('');
  const [elemFilter, setElemFilter] = useState<Array<string>>([]);
  const [workSuitFilter, setWorkSuitFilter] = useState<Array<string>>([]);
  const [hidden, setHidden] = useState(true);
  const clearSearch = () => {
    setNameFilter('');
    setElemFilter([]);
    clearFilters();
  };

  const handleElementChange = (element: string) => {
    const newElementValue: Array<string> = elemFilter ? [...elemFilter] : [];
    const index = newElementValue.indexOf(element);

    if (newElementValue.length === 2 && index > -1) {
      // two already selected and user clicked on selected element
      newElementValue.splice(index, 1);
      setElemFilter(newElementValue);
    } else if (newElementValue.length === 2 && index === -1) {
      // two already selected and user clicked on new element
      newElementValue.splice(1, 1);
      newElementValue.push(element);
      setElemFilter(newElementValue);
    } else {
      // less than 2 selected elements already
      if (index > -1) {
        // if user clicked on the same element
        newElementValue.splice(index, 1);
      } else {
        // if user clicked on a new element9
        newElementValue.push(element);
      }
      setElemFilter(newElementValue);
    }
  };
  const handleWorkSuitabilityChange = (workSuitability: string) => {
    const newWorkSuitability: Array<string> = workSuitFilter
      ? [...workSuitFilter]
      : [];
    const index = newWorkSuitability.indexOf(workSuitability);

    if (newWorkSuitability.length === 2 && index > -1) {
      // two already selected and user clicked on selected workSuitability
      newWorkSuitability.splice(index, 1);
      setWorkSuitFilter(newWorkSuitability);
    } else if (newWorkSuitability.length === 2 && index === -1) {
      // two already selected and user clicked on new workSuitability
      newWorkSuitability.splice(1, 1);
      newWorkSuitability.push(workSuitability);
      setWorkSuitFilter(newWorkSuitability);
    } else {
      // less than 2 selected workSuitabilitys already
      if (index > -1) {
        // if user clicked on the same workSuitability
        newWorkSuitability.splice(index, 1);
      } else {
        // if user clicked on a new workSuitability9
        newWorkSuitability.push(workSuitability);
      }
      setWorkSuitFilter(newWorkSuitability);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) =>
          onSubmit(e, {
            name: nameFilter,
            elements: elemFilter,
            workSuitability: workSuitFilter,
          })
        }
        className="mb-1 grid items-center"
        style={{ height: hidden ? '42px' : 'auto', overflow: 'hidden' }}
      >
        <div className="flex w-full items-center">
          <input
            type="text"
            id="pals_name_input"
            className="dark:bg-dark block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:text-white"
            placeholder="Lovander"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <IconButton
            style={{
              borderRadius: 0,
              borderLeft: 0,
            }}
            type="submit"
            icon={GoSearch}
            variant="light"
            className="dark:bg-dark h-[42px] w-[44px] rounded-r-lg dark:text-white"
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          {elements.map((e) => {
            const isActive =
              elemFilter?.findIndex(
                (el) => el === e.attributes.name.toLowerCase()
              ) >= 0;
            return (
              <Element
                key={`element_filter_${e.attributes.slug}`}
                element={e}
                displayName={true}
                onClick={() =>
                  handleElementChange(e.attributes.name.toLowerCase())
                }
                isActive={isActive}
              />
            );
          })}
        </div>
        {workSuitability && workSuitability.length > 0 ? (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {workSuitability
              .sort((a, b) => (a.attributes.slug < b.attributes.slug ? -1 : 1))
              .map((e) => {
                const isActive =
                  workSuitFilter?.findIndex(
                    (el) => el === e.attributes.slug.toLowerCase()
                  ) >= 0;
                return (
                  <Button
                    key={`category_filter_${e.attributes.slug}`}
                    onClick={() =>
                      handleWorkSuitabilityChange(
                        e.attributes.slug.toLowerCase()
                      )
                    }
                    variant={isActive ? 'ghost' : 'outline'}
                    style={{
                      backgroundColor: isActive ? '#306734' : '',
                      borderColor: isActive ? '#306734' : '#6b74a1',
                    }}
                  >
                    {e.attributes.name}
                  </Button>
                );
              })}
          </div>
        ) : null}
        {!hidden && (
          <div className="my-2 text-center">
            <Button variant="outline" className="mr-2" onClick={() => clearSearch()}>Clear Filters</Button>
            <Button type="submit">Filter</Button>
          </div>
        )}
      </form>
      <div className="text-center">
        <Button variant="outline" onClick={() => setHidden(!hidden)}>
          {hidden ? 'Open ' : 'Close '}Filters
        </Button>
      </div>
    </>
  );
};

export default SearchForm;
