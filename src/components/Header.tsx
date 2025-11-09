import React from 'react';
import { Shirt } from './icons';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-md mx-auto text-center pt-8 pb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
            <Shirt className="text-indigo-500" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                Outfit Oracle
            </h1>
        </div>
      <p className="text-gray-500">Your personal AI stylist for any occasion.</p>
    </header>
  );
};

export default Header;
