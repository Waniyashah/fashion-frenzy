import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard, Product } from "@/components/ProductCard";
import { client, urlFor } from "@/lib/sanity";

// No 'use client' - This is now a Server Component

export const revalidate = 60; // Revalidate at most every 60 seconds

async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    price,
    "slug": slug.current,
    images,
    category,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const productsRaw = await getProducts();
  
  let products: Product[] = productsRaw.map((item: any) => ({
    id: item._id,
    brand: "Fashion Frenzy",
    name: item.name,
    imageUrl: item.images && item.images.length > 0 ? urlFor(item.images[0]).url() : "",
    price: item.price,
    slug: item.slug || item._id, // Fallback to ID if slug is missing!
    category: item.category,
  }));

  // Filter Logic
  if (category) {
    products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }

  if (q) {
    const searchLower = q.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.category?.toLowerCase().includes(searchLower)
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#D4AF37] selection:text-black">
      <Header />

      <main className="container mx-auto px-4 md:px-6 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 text-[#D4AF37]">Our Products</h1>
            <p className="text-gray-500">
              {`Showing ${products.length} results`}
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          
          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
               <div className="text-center py-20 flex flex-col items-center justify-center">
                 <p className="text-xl text-gray-400 mb-4">No products found in the collection.</p>
                 <p className="text-sm text-gray-500">Please add items to your Sanity Studio (http://localhost:3333).</p>
               </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <div key={product.id} className="animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            
            {/* Load More - Removed static button for now as pagination is next level */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
