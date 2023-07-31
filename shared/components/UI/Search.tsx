import React, { FC,useState } from 'react';

interface Props {
    data: any
    value?: any
    addCountry: (value:string) => void
}
const SearchComponent:FC<Props> = ({ data, addCountry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearchInputChange = (event:any) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Filter data based on the search query
    const filteredItems = data.filter((item:any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  return (
    <div>
      <input
        type="text"
        className='p-2 w-full shadow mb-1'
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search..."
      />
      <ul className='max-h-[250px] overflow-y-auto'>
      <li onClick={() => addCountry('Global')}>Global</li>
        {filteredData.map((item:any, index:number) => (
          <li className='py-1 cursor-pointer' key={index} onClick={() => addCountry(item.name)}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;