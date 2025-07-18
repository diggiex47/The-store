<<<<<<< HEAD
"use client";

import React from 'react';
import Button from '@/components/button/page';

export default function AddProductPage() {

=======
import prisma from '@/lib/prisma';
import React from 'react';
import Button from '@/components/button/page';
import { redirect } from 'next/navigation';

async function addProduct(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const price = Number(formData.get('price') || 0);

    // Here you would typically call your database or API to add the product
    // For example:
    // await prisma.product.create({
    //     data: { name, description, imageUrl, price }
    // });

    if(!name || !description || !imageUrl || isNaN(price) || price <= 0) {
        throw new Error('missing or invalid product data');
    }
    
    await prisma.product.create({
        data: {name, description, imageUrl, price},
    });

 redirect("/"); // Redirect to the home page after adding the product
}
export default function AddProductPage() {
>>>>>>> 69e21060e5c278c3c26577a4a8794e33e2c66ca9
    return (
        <div>
            <> 
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            </>

<<<<<<< HEAD
            <form>
=======
            <form action={addProduct}>
>>>>>>> 69e21060e5c278c3c26577a4a8794e33e2c66ca9
                <input
                 required
                 name="name"
                 placeholder="name"
                 className="input-bordered input mb-3 w-full"/>

                 <textarea
                    required
                    name="description"
                    placeholder="description"
                    className="textarea-bordered textarea mb-3 w-full h-32"/>

                     <input
                 required
                 name="imageUrl"
                 placeholder="Image URL"
                 type="url"
                 className="input-bordered input mb-3 w-full"/>

                  <input
                 required
                 name="price"
                 placeholder="Price"
                 type="number"
                 className="input-bordered input mb-3 w-full"/>
                 
<<<<<<< HEAD
                 <Button className ="w-full">Add Product</Button>
=======
                 <Button className ="w-full" >Add Product</Button>
>>>>>>> 69e21060e5c278c3c26577a4a8794e33e2c66ca9


            </form>
        </div>
    )
}