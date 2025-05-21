'use client'
import React from 'react';
import { Heart, Share2, Star } from 'lucide-react';

function Card({item}) {
    const  image = 'https://www.livemint.com/lm-img/img/2025/03/31/600x338/ghibli_grok_1743247886899_1743386997031.png'
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative">
        <img 
          src={item.imageUrl} 
          alt="Card Image" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-white dark:bg-gray-800 p-1.5 rounded-full text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
          New
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill={i < 4 ? 'currentColor' : 'none'} />
          ))}
          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">4.0 (24)</span>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className="text-blue-600 dark:text-blue-400 font-medium">$29.99</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{item.
createdAt}
</div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src={image}
            alt="Avatar" 
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Jagdish Dhage</span>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Card;