'use client';

import { Input, InputProps } from '../ui/input';

interface Props extends InputProps {
  query: string;
  handleChangeQuery: (query: string) => void;
}

const SearchBar = ({ query, handleChangeQuery, ...other }: Props) => {
  return (
    <Input
      placeholder="Search"
      {...other}
      value={query}
      onChange={event => handleChangeQuery(event.target.value)}
      className="max-w-md"
    />
  );
};

export default SearchBar;
