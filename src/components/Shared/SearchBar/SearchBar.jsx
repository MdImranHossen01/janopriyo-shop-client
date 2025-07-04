import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  return (
    <div className='relative w-full'>
      <input
        type='text'
        placeholder='Search products...'
        className='w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      />
      <button className='absolute right-3 top-2 text-gray-500 hover:text-blue-500'>
        <AiOutlineSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;