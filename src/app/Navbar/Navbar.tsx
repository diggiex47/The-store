import { redirect } from "next/navigation";
async function searchProducts(formData: FormData){

    "use server";
    const searchQuery = formData.get("searchQuery")?.toString();


    if(searchQuery){
        redirect("/search?query=" + searchQuery);
    }
}


export default function Navbar() {
  return (
    <div className="bg-base-100 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="navbar max-w-7xl m-auto flex-col  sm:flex-row ">
        <div className="flex-1">
            {/* using normal case to make it as you write otherwise it make everything in caps 
            btn and btn-ghost to give look like btn  */}
          <a className="btn btn-ghost text-xl normal-case">The Store</a>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
                <input 
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[150px] max-w-xs"
                ></input> </div>
          </form>
        </div>
      </div>
    </div>
  );
}
