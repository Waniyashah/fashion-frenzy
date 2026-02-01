
import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ProductCard, Product } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    brand,
    price,
    images,
    image,
    description,
    "slug": slug.current
  }`;

  return await client.fetch(query);
}

export default async function Home() {
  const rawProducts = await getProducts();

  const products: Product[] = rawProducts.map((item: any) => ({
    id: item._id,
    name: item.name,
    brand: item.brand,
    price: item.price,
    imageUrl: item.images && item.images[0] ? urlFor(item.images[0]).url() : (item.image ? urlFor(item.image).url() : ""),
    slug: item.slug || "",
  }));

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <Header />

      <main className="flex flex-col gap-12">
        <Hero />

        {/* Featured Products Section */}
        <section className="py-2 px-8 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-500">
              Curated for You
            </h2>
            <a href="/products" className="text-sm font-medium hover:text-[#D4AF37] transition-colors uppercase tracking-wider">
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No products found in Sanity. Please add some products in your Studio.
              </p>
            )}
          </div>
        </section>

        <WhyChooseUs />

        {/* Categories Section (Visual) */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight uppercase mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                { name: 'Bags', image: '/images/bags.jpg', slug: 'bags' },
                { name: 'Shoes', image: '/images/shoes.jpg', slug: 'shoes' },
                { name: 'Watches', image: '/images/watch.jpg', slug: 'watch' },
                { name: 'Glasses', image: '/images/glasses.jpg', slug: 'glasses' }
              ].map((cat) => (
                <Link key={cat.name} href={`/products?category=${cat.slug}`} className="group relative h-64 overflow-hidden rounded-lg cursor-pointer shadow-lg block">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  );
}

