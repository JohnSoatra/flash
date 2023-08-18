import { Metadata } from 'next';
import React from 'react';
import Index from './index';
import EmptySearchPage from './empty';

type Prop = {
    searchParams?: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
    title: 'Flash | Search',
    description: 'Search page'
}

const Search = ({ searchParams }: Prop) => {
    if (
        searchParams &&
        searchParams['string'] &&
        typeof(searchParams['string']) === "string"
    ) {
        return (
            <Index
                string={searchParams['string']}
            />
        )
    }

    return (
        <EmptySearchPage />
    );
}

export default Search;