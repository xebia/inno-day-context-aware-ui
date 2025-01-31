"use client"

import React, { useEffect, useState } from 'react';
import requestContent from '../../lib/ai';
import { Entry } from '@/lib/types/Entry';

interface LayoutAwareProps {
    searchBarValue?: string;
}

export function LayoutAware({ searchBarValue }: LayoutAwareProps) {

    const [response, setResponse] = useState<Entry[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await requestContent(searchBarValue);
            setResponse(response);
        };

        if (searchBarValue) {
            fetchData();
        }
    }, [searchBarValue]);

    return response?.map((item, index) => 
    <div key={index}>
        <h1 className="text-center text-4xl" >{item.title}</h1>
        <p>{item.content}</p>
    </div>);

}