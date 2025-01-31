"use client"

import React, { useEffect, useState } from 'react';
import requestContent from '../../lib/ai';

interface LayoutAwareProps {
    searchBarValue?: string;
}

export function LayoutAware({ searchBarValue }: LayoutAwareProps) {
    
    const [response, setResponse] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await requestContent(searchBarValue);
            setResponse(response);
        };

        if (searchBarValue) {
            fetchData();
        }
    }, [searchBarValue]);

    return <div>{response}</div>;

}