
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export interface Product {
    id: string;
    brand: string;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice?: number;
    slug: string;
    category?: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.slug}`} className="group relative block overflow-hidden rounded-sm bg-transparent transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={400}
                        height={600}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">
                        No Image
                    </div>
                )}
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#D4AF37] text-white transition-all shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <Heart className="w-5 h-5" />
                </button>
                {/* Optional Sale Badge */}
                {product.originalPrice && (
                    <span className="absolute top-2 left-2 bg-[#4169E1] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        Sale
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase text-black dark:text-white tracking-widest">
                    {product.brand}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                </p>

                <div className="flex items-center gap-2 pt-1">
                    <p className="text-sm font-medium text-black dark:text-white">
                        PKR {product.price.toLocaleString()}
                    </p>
                    {product.originalPrice && (
                        <p className="text-xs text-gray-600 line-through">
                            {product.originalPrice.toLocaleString()}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
