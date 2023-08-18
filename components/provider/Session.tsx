'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Prop = {
    children: React.ReactNode
}

const Provider = ({ children }: Prop) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    );
}

export default Provider;