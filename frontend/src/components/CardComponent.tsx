import React from 'react';

interface Card{
    id: number;
    name: string;
    email: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg p-2 mb-2 hover:bg-gray-100'>
            <div className='text-sm text-gray-600'>id: {card.id}</div>
            <div className='text-lg font-bold'>{card.name}</div>
            <div className='text-md text-gray-600'>{card.email}</div>
        </div>
    );
};

export default CardComponent;