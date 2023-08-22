import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Reset Password',
    description: 'Reset password page'
}

const ResetPass = () => {
    return (
        <Index />
    );
}

export default ResetPass;