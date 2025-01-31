"use client"

import React from 'react';

import { SearchBar } from '@/components/ui/search-bar';
import { LayoutAware } from '@/components/content-aware/layout-aware';

import { useState } from 'react';


export function ContentAware() {

    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
    };
    return <div>
        <div className="w-full text-center mb-4">
            <p className="italic">How can we help you today?</p>
        </div>
        <div className='w-full flex justify-center m-4'>
            <SearchBar onSearch={handleSearchChange} />
        </div>
        <div><LayoutAware searchBarValue={searchValue} /></div>
    </div>;
}