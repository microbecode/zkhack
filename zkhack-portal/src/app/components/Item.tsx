// components/ItemComponent.tsx
import React from 'react';
import type { Item } from '@/lib/types/item';

export const ItemComponent = ({
    item,
    x,
    y,
}: {
    item: Item;
    x: number;
    y: number;
}) => {
    return (
        <div
            style={{
                position: 'absolute',
                width: 16,
                height: 16,
                backgroundColor: 'gold',
                borderRadius: 4,
                boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                transform: `translate(${x * 32}px, ${y * 32}px)`,
                transition: 'transform 0.1s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: 'black',
            }}
        >
        </div>
    );
};
