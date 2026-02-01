
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";
import ImageGallery from "@/components/ImageGallery";
import ProductInfo from "@/components/ProductInfo";

export const revalidate = 60;

async function getProduct(slug: string) {
  const query = `*[_type == "product" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    name,
    price,
    description,
    images,
    image,
    category,
    sizes,
    colors
  }`;

  const product = await client.fetch(query, { slug });
  return product;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const displayImages = product.images && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : []);

  const mainImageUrl = displayImages.length > 0 ? urlFor(displayImages[0]).url() : "";

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#D4AF37] selection:text-white">
      <Header />

      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column - Images */}
          <div className="relative">
            {displayImages.length > 0 ? (
              <ImageGallery images={displayImages} />
            ) : (
              <div className="aspect-[3/4] flex items-center justify-center bg-gray-50 text-gray-400 rounded-sm">
                No Image Available
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <ProductInfo product={product} image={mainImageUrl} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
