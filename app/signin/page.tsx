import { Metadata } from 'next';
import React from 'react';
import Index from './index';

export const metadata: Metadata = {
    title: 'Flash | Sign In',
    description: 'Sign in page'
}

const SignIn = () => {
    return <Index />
}

export default SignIn;