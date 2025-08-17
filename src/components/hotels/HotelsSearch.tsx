'use client';

import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { useHotelsSearch } from '@/hooks/useHotelsSearch';

export default function HotelsSearch() {
  const {
    searchParamsState,
    handleParamChange,
    hotels,
    loading,
    error,
    searchHotels
  } = useHotelsSearch();

  return (
    <div>
      <SearchForm 
        params={searchParamsState}
        onParamChange={handleParamChange}
        onSearch={searchHotels}
        loading={loading}
      />
      
      <SearchResults 
        hotels={hotels} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
}