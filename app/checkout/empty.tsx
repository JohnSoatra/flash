'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const Empty = () => {
    const { status } = useSession({ required: true });

    if (status === 'loading') {
        return (
            <p>loading...</p>
        );
    }

    return (
        <div>
            <p>Your card is empty</p>
        </div>
    );
}

export default Empty;