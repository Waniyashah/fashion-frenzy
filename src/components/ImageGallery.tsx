"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useState } from "react";

interface ImageGalleryProps {
    images: any;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [bigImage, setBigImage] = useState(images[0]);

    return (
        <div className="grid gap-4 lg:gap-8">
            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-50 dark:bg-gray-800">
                <Image
                    src={urlFor(bigImage).url()}
                    alt="Product image"
                    fill
                    className="object-cover w-full h-full transition-all duration-300"
                    priority
                />

                {/* Floating Tags - replicating previous design */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/80 backdrop-blur-sm text-[10px] font-bold px-3 py-1 uppercase tracking-widest border border-gray-100">
                        New Arrival
                    </span>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-4">
                {images.map((image: any, idx: number) => (
                    <div
                        key={idx}
                        className={`relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-50 cursor-pointer border-2 transition-all ${bigImage._key === image._key ? "border-[#D4AF37]" : "border-transparent hover:border-gray-200"
                            }`}
                        onClick={() => setBigImage(image)}
                    >
                        <Image
                            src={urlFor(image).url()}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
