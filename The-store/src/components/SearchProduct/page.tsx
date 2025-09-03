import { redirect } from "next/navigation";

export async function searchProducts(formData: FormData){
  'use server';
    const searchQuery = formData.get("searchQuery")?.toString();

    if(searchQuery){
        redirect("/search?query=" + searchQuery);
    }
}

