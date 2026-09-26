import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product }) {
  return (
    <Card 
      data-testid="product-card" 
      className="flex flex-col justify-between h-full overflow-hidden border border-slate-800 bg-slate-900/80 backdrop-blur-md hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group"
    >
      <div>
        <div className="relative w-full aspect-video overflow-hidden bg-slate-950 flex items-center justify-center p-2">
          <img
            data-testid="product-image"
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader className="p-5 pb-2">
          <CardTitle 
            data-testid="product-name" 
            className="text-lg font-bold text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors"
          >
            {product.name}
          </CardTitle>
          <CardDescription 
            data-testid="product-description" 
            className="text-sm text-slate-400 mt-2 line-clamp-2 min-h-[2.5rem]"
          >
            {product.description}
          </CardDescription>
        </CardHeader>
      </div>

      <CardFooter className="p-5 pt-4 flex items-center justify-between border-t border-slate-800/80 mt-auto">
        <span 
          data-testid="product-price" 
          className="text-xl font-extrabold text-indigo-400 tracking-tight"
        >
          {product.price}
        </span>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
