import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Sign Up',
    description: 'Sign up page'
}

const SignUp = () => {
    return (
        <Index />
    );
}

export default SignUp;