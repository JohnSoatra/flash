import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Reset Password',
    description: 'Reset password page'
}

const ResetPass = () => {
    const networkSecret = process.env.NETWORK_SECRET || 'none';

    return (
        <Index
            networkSecret={networkSecret}
        />
    );
}

export default ResetPass;