
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Gitlab } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-gray-50 py-12 md:py-24 border-t border-gray-200 dark:border-gray-800 dark:bg-black">
            <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-4">

                {/* Brand Column */}
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-[#D4AF37]">
                        FASHION FRENZY
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        The definitive fashion shopping platform, used by over 200 million
                        shoppers a year to find the items they love.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                        Company
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-[#D4AF37] transition-colors">Careers</Link></li>
                        <li><Link href="/mobile" className="hover:text-[#D4AF37] transition-colors">Mobile App</Link></li>
                        <li><Link href="/legal" className="hover:text-[#D4AF37] transition-colors">Legal & Privacy</Link></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                        Help
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <li><Link href="/help" className="hover:text-[#D4AF37] transition-colors">Help Center</Link></li>
                        <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
                        <li><Link href="/shipping" className="hover:text-[#D4AF37] transition-colors">Shipping & Returns</Link></li>
                        <li><Link href="/partners" className="hover:text-[#D4AF37] transition-colors">Partners</Link></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                        Stay Updated
                    </h3>
                    <form className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                        <button className="rounded-md bg-[#D4AF37] px-3 py-2 text-sm font-medium text-black hover:bg-[#b5952f] transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Fashion Frenzy. All rights reserved.
            </div>
        </footer>
    );
}
