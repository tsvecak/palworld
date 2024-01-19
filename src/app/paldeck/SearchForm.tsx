import { FormEvent, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IoCloseOutline } from 'react-icons/io5';

import IconButton from '@/components/buttons/IconButton';

const SearchForm = ({
  onSubmit,
  clearFilters,
}: {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: FormEvent<HTMLFormElement>, filter: string) => void;
  clearFilters: () => void;
}) => {
  const [nameFilter, setNameFilter] = useState('');
  const clearSearch = () => {
    setNameFilter('');
    clearFilters();
  };
  return (
    <form
      onSubmit={(e) => onSubmit(e, nameFilter)}
      className="flex items-center"
    >
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
        disabled={!nameFilter}
      />
    </form>
  );
};

export default SearchForm;
