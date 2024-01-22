'use client';
import { FormEvent, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoCloseOutline } from 'react-icons/io5';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';

import { ItemCategory } from '@/types/items';

const SearchForm = ({
  onSubmit,
  clearFilters,
  categories,
}: {
  onSubmit: (
    // eslint-disable-next-line no-unused-vars
    e: FormEvent<HTMLFormElement>,
    // eslint-disable-next-line no-unused-vars
    filters: { name: string; categoryFilter: Array<string> }
  ) => void;
  clearFilters: () => void;
  categories: Array<ItemCategory>;
}) => {
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Array<string>>([]);

  const clearSearch = () => {
    setNameFilter('');
    setCategoryFilter([]);
    clearFilters();
  };

  const handleItemCategoryChange = (category: string) => {
    console.log(category);
    const newCategoryValue: Array<string> = categoryFilter
      ? [...categoryFilter]
      : [];
    const index = newCategoryValue.indexOf(category);

    if (newCategoryValue.length === 2 && index > -1) {
      // two already selected and user clicked on selected category
      newCategoryValue.splice(index, 1);
      setCategoryFilter(newCategoryValue);
    } else if (newCategoryValue.length === 2 && index === -1) {
      // two already selected and user clicked on new category
      newCategoryValue.splice(1, 1);
      newCategoryValue.push(category);
      setCategoryFilter(newCategoryValue);
    } else {
      // less than 2 selected categorys already
      if (index > -1) {
        // if user clicked on the same category
        newCategoryValue.splice(index, 1);
      } else {
        // if user clicked on a new category9
        newCategoryValue.push(category);
      }
      setCategoryFilter(newCategoryValue);
    }
  };

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, { name: nameFilter, categoryFilter: categoryFilter })
      }
      className="grid items-center"
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
        <IconButton
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeft: 0,
          }}
          variant="light"
          className="dark:bg-dark h-[42px] w-[44px] rounded-r-lg dark:text-white"
          icon={IoCloseOutline}
          onClick={() => clearSearch()}
          disabled={!!nameFilter}
        />
      </div>
      {categories && categories.length > 0 ? (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
          {categories.map((e) => {
            const isActive =
              categoryFilter?.findIndex(
                (el) => el === e.attributes.slug.toLowerCase()
              ) >= 0;
            return (
              <Button
                key={`category_filter_${e.attributes.slug}`}
                onClick={() =>
                  handleItemCategoryChange(e.attributes.slug.toLowerCase())
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
    </form>
  );
};

export default SearchForm;
