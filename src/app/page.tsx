import React from 'react';
import ProductCard from '@/components/card/page';
import prisma from '@/lib/prisma';

export default async function home() {


    const product = await prisma.product.findMany({
        orderBy: {id:"desc"},
    })

    return (
        <div>
            
            <>
                <h1 className="text-center font-bold text-5xl">WELCOME TO THE STORE</h1>
                {/* <Navbar className= "w-full" /> */}

               <ProductCard product={product[0]}  />
            </>
        </div>
    )
}
