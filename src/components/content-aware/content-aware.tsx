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
        <SearchBar onSearch={handleSearchChange} />
        <LayoutAware searchBarValue={searchValue} />
    </div>;
}