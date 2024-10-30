import { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export default function SearchProvider({ children}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchGenre, setSearchGenre] = useState('');
    const [searchBudget, setSearchBudget] = useState('');
    const [searchVerify, setSearchVerify] = useState('');

    useEffect(() => {
        console.log('Search Term:', searchTerm);
        console.log('Search Genre:', searchGenre);
        console.log('Search Budget:', searchBudget);
        console.log('Search Verify:', searchVerify);
    }, [searchTerm, searchGenre, searchBudget, searchVerify]);

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchGenre, setSearchGenre, searchBudget, setSearchBudget, searchVerify, setSearchVerify }}>
            {children}
        </SearchContext.Provider>
    )
}
