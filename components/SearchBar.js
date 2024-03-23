import { useState } from 'react';
import searchstyles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className={searchstyles.search_container}>
      <input
        id='pesquisa'
        className={searchstyles.search_input}
        type="text"
        placeholder="Digite o nome ou o número do Pokemon"
        value={searchInput}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
