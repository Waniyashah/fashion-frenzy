"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#D4AF37] selection:text-black">
      <Header />

      <main>
        {/* Hero Banner */}
        <div className="relative h-[300px] w-full bg-gray-100 overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-30" />
          
          <div className="absolute inset-0 flex items-center justify-around container mx-auto px-4">
             {/* Icon Logo Style */}
            <div className="hidden md:flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#D4AF37] text-[#D4AF37]">
                <MessageCircle className="h-16 w-16" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-black z-10 uppercase tracking-wider">Contact Us</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-black">Let's talk with us</h2>
                <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                  Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4 group">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">Address</h3>
                    <p className="text-gray-500 w-64">1055 Arthur ave Elk Groot, 67. New Palmas South Carolina.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">Email</h3>
                    <p className="text-gray-500">fashionfrenzy8090@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">Phone</h3>
                    <p className="text-gray-500">03322645902</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_5px_30px_-5px_rgba(0,0,0,0.1)] border border-gray-100 animate-in fade-in slide-in-from-right-10 duration-700 delay-200">
              <form 
                action="https://formsubmit.co/fashionfrenzy8090@gmail.com" 
                method="POST"
                className="space-y-6"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="New Contact Form Submission - Fashion Frenzy" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="relative">
                      <input 
                        type="text"
                        name="name" 
                        placeholder="Name" 
                        required
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        name="lastName"
                        placeholder="Last Name" 
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                     
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email*" 
                    required
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>

                <div className="space-y-2">
                   <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number*" 
                     required
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <textarea 
                    name="message"
                    placeholder="Your message..." 
                    rows={6}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="w-full rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#D4AF37]/20 hover:bg-[#b5952f] hover:shadow-[#D4AF37]/40 transition-all flex items-center justify-center gap-2">
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
