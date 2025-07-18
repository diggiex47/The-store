import getProductPage from "@/components/getProduct/page";

export default async function home() {
  
  return (
    <div>
      <div
        className="hero rounded-2xl m-auto bg-center min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-content  text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-4 text-5xl font-bold text-green-300">
              WELCOME TO THE STORE
            </h1>
          </div>
        </div>
        
      </div>
      <div className="mx-auto p-4">
        {getProductPage()}
      </div>
      
    </div>
  );
}
