"use client"

import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";

import { useState } from 'react';

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    return (
        <div className="flex items-center space-x-2">
            <form onSubmit={(e) => {
                e.preventDefault();
                onSearch?.(query);
            }}>
                <div className="flex items-center space-x-2 ">
                    <Input type="text" placeholder="Search..." className="flex-grow" value={query}
                        onChange={(e) => setQuery(e.target.value)} />
                    <Button type='submit' >
                       <Search size={64} />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export { SearchBar };