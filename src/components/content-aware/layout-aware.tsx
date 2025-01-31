
import React, { useState } from 'react';

interface LayoutAwareProps {
    searchBarValue?: string;
}

export function LayoutAware({ searchBarValue }: LayoutAwareProps) {
    return <div>{searchBarValue}</div>;
}