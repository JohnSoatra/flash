import React from 'react'
import Index from './index';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Flash | Account',
    description: 'Product user\'s account page'
}

const Account = () => {
    return (
        <Index />
    )
}

export default Account;