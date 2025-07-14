"use client";

import React from 'react';
import Button from '@/components/button/page';

export default function AddProductPage() {

    return (
        <div>
            <> 
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            </>

            <form>
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
                 
                 <Button className ="w-full">Add Product</Button>


            </form>
        </div>
    )
}