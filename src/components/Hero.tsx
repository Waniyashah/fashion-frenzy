"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative w-full h-[600px] flex items-center justify-center bg-black dark:bg-gray-900 border-b border-[#D4AF37]">
            <div className="container mx-auto px-4 md:px-6 z-10 text-white text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-7xl"
                >
                    THE FASHION CURATOR
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-4 text-lg md:text-xl font-light"
                >
                    Discover the world&apos;s best fashion brands, all in one place.
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                >
                    <Link href="/products" className="group mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-8 text-black transition-transform hover:scale-105 hover:bg-[#b5952f]">
                        Shop Now
                    </Link>
                </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-60">
                <Image
                    src="/images/shoes.jpg"
                    alt="Fashion Frenzy"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </section>
    );
}
