"use client"

import React, { useEffect, useState } from 'react';
import requestContent from '../../lib/ai';
import { Entry } from '@/lib/types/Entry';
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

    const [response, setResponse] = useState<Entry[] | null>(null);

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
        { //Check if message failed
            (response != null)
                ? response?.map((item, index) =>
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{item.content}</p>
                        </CardContent>
                    </Card>)
                : (isLoading ? <LoadingSpinner /> : null)
        }
    </div>

}