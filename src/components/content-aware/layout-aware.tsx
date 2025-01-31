"use client"

import React, { useEffect, useState } from 'react';
import requestContent from '../../lib/ai';
import { Document } from '@/lib/types/Document';
import { LoadingSpinner } from '../ui/loading-spinner';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface LayoutAwareProps {
    searchBarValue?: string;
}

export function LayoutAware({ searchBarValue }: LayoutAwareProps) {

    const [response, setResponse] = useState<Document[] | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setResponse(null);
            const response = await requestContent(searchBarValue);
            setResponse(response);
            setIsLoading(false);
        };

        if (searchBarValue) {
            fetchData();
        }
    }, [searchBarValue]);

    return <div>
        {
            (response != null)
                ? response?.map((item, index) =>
                    <div key={index} className='m-4'>
                        <Card  >
                            <CardHeader>
                                <CardTitle>{item.heading}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                        </Card></div>)
                : (isLoading ? <div className='w-full flex justify-center'><LoadingSpinner size={64} /> </div> : null)
        }
    </div>

}