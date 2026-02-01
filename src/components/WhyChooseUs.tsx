import { Gem, ShieldCheck, Truck } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#D4AF37] mb-4">Why Choose Us?</h2>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
          Experience luxury and style with our commitment to quality and service.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="text-center group">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
            <Gem className="h-10 w-10 text-[#D4AF37]" />
          </div>
          <h3 className="font-bold text-2xl text-black dark:text-white mb-3">Exquisite Quality</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Every item in our collection is crafted from the finest materials with meticulous attention to detail.
          </p>
        </div>
        <div className="text-center group">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
            <ShieldCheck className="h-10 w-10 text-[#D4AF37]" />
          </div>
          <h3 className="font-bold text-2xl text-black dark:text-white mb-3">Curated Style</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Discover timeless pieces and modern trends, hand-picked by our expert stylists to elevate your wardrobe.
          </p>
        </div>
        <div className="text-center group">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
            <Truck className="h-10 w-10 text-[#D4AF37]" />
          </div>
          <h3 className="font-bold text-2xl text-black dark:text-white mb-3">Seamless Service</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Enjoy complimentary shipping, easy returns, and dedicated customer support for a hassle-free experience.
          </p>
        </div>
      </div>
    </section>
  );
}
