'use client';
import { FormEvent, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoCloseOutline } from 'react-icons/io5';

import IconButton from '@/components/buttons/IconButton';
import Element from '@/components/Element';

import { PalElement } from '@/types/pal';

const SearchForm = ({
  onSubmit,
  clearFilters,
  elements,
}: {
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    e: FormEvent<HTMLFormElement>,
    // eslint-disable-next-line no-unused-vars
    filters: { name: string; elements: Array<string> }
  ) => void;
  clearFilters: () => void;
  elements: Array<PalElement>;
}) => {
  const [nameFilter, setNameFilter] = useState('');
  const [elemFilter, setElemFilter] = useState<Array<string>>([]);
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
  return (
    <form
      onSubmit={(e) => onSubmit(e, { name: nameFilter, elements: elemFilter })}
      className="grid items-center"
    >
      <div className="flex w-full items-center">
        <input
          type="text"
          id="pals_name_input"
          className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
          className="h-[42px] w-[44px] rounded-r-lg"
        />
        <IconButton
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeft: 0,
          }}
          type="submit"
          variant="light"
          className="h-[42px] w-[44px] rounded-r-lg"
          icon={IoCloseOutline}
          onClick={() => clearSearch()}
          disabled={!nameFilter && elemFilter.length < 1}
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
    </form>
  );
};

export default SearchForm;
