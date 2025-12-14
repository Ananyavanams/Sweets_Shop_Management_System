import React from 'react';
import { Link } from 'react-router-dom';
import Sweets1Img from '../assets/sweets1.jpg';
import GulabJamunImg from '../assets/Gulabjamun.jpg';
import RasgullaImg from '../assets/Rasgulla.jpg';
import MysorePakImg from '../assets/Mysore_pak.jpg';
import KajuKatliImg from '../assets/Kajukatli.jfif';

const SweetShopHome = () => {
  const featuredProducts = [
    { id: 1, name: 'Gulab Jamun', price: '₹120', image: GulabJamunImg },
    { id: 2, name: 'Rasgulla', price: '₹100', image: RasgullaImg },
    { id: 3, name: 'Mysore Pak', price: '₹150', image: MysorePakImg },
    { id: 4, name: 'Kaju Katli', price: '₹300', image: KajuKatliImg },
  ];

  return (
    <div className="font-sans text-gray-700 bg-[#FDFBF7] min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Decorative Ribbon for Premium Look */}
        <div className="absolute top-0 left-8 md:left-16 w-24 h-32 bg-[#D32F2F] shadow-lg flex items-center justify-center text-center text-white p-2 rounded-b-lg z-10">
          <span className="font-serif italic text-xl leading-tight">Sweets Store</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center relative">
          <div className="md:w-1/2 mt-20 md:mt-0 z-10 pl-4 md:pl-8">
            <h1 className="text-5xl md:text-7xl font-bold text-[#D32F2F] mb-2 drop-shadow-sm font-serif">
              Sweet Delights
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-[#8D6E63] mb-6 italic">
              for your happy Family
            </h2>
            <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
              Experience the authentic taste of tradition. Our sweets are handcrafted with love, using only the finest ingredients to bring joy to every celebration.
            </p>

          </div>

          <div className="md:w-1/2 relative mt-12 md:mt-0 flex justify-center">
            {/* Main Hero Image with effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#D32F2F] rounded-full opacity-5 transform translate-x-4 translate-y-4"></div>
              <img
                src={Sweets1Img}
                alt="Assorted Sweets"
                className="relative w-full max-w-lg object-contain drop-shadow-2xl rounded-xl z-0 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="bg-[#FAF8F5] py-20 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5D4037] mb-4 font-serif">
            Our Premium Collection
          </h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto">
            Discover our most loved delicacies. From syrupy delights to rich dry fruit sweets, we have something for everyone.
          </p>

          {/* Navigation Arrows (Visual) */}
          <div className="relative">
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 text-[#D32F2F] cursor-pointer hover:scale-110 transition-transform hidden md:block">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            </div>
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-[#D32F2F] cursor-pointer hover:scale-110 transition-transform hidden md:block">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-12">
              {featuredProducts.map(product => (
                <div key={product.id} className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300">
                  <div className="h-48 w-48 mx-auto mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-[#FDFBF7] shadow-inner group-hover:border-pink-100 transition-colors duration-300"></div>
                    <img
                      src={product.image}
                      className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
                      alt={product.name}
                    />

                    {/* Floating Price Badge */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#ef5350] text-white w-14 h-14 flex items-center justify-center rounded-full text-sm font-bold shadow-lg border-4 border-white z-10 group-hover:bg-[#c62828] transition-colors">
                      {product.price}
                    </div>
                  </div>

                  <div className="pt-8 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-4 px-2">A classic favorite, perfect for every occasion.</p>
                    <Link to="/purchase" className="text-[#D32F2F] font-semibold text-sm hover:underline uppercase tracking-wide">
                      Order Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Wave */}
      <footer className="relative bg-[#ef5350] text-white mt-auto pt-24 pb-8">
        {/* Wave SVG Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
          
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ef5350"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Navigation */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-pink-100 uppercase tracking-wider border-b border-pink-400 pb-2 inline-block md:block">NAVIGATION</h4>
            <ul className="space-y-3 text-sm text-pink-50">
              <li><Link to="/home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Order Online</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Login / Signup</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-pink-100 uppercase tracking-wider border-b border-pink-400 pb-2 inline-block md:block">GET HELP</h4>
            <div className="space-y-3 text-sm text-pink-50">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                support@sweetshop.com
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +91 1234567890
              </p>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-pink-100 uppercase tracking-wider border-b border-pink-400 pb-2 inline-block md:block">CONTACT ADDRESS</h4>
            <p className="text-sm text-pink-50 leading-relaxed max-w-xs mx-auto md:mx-0">
              123 Sweet Street, Sector 5<br />
              Flavor Town, Hyderabad<br />
              Telangana, India 500001
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-pink-100 uppercase tracking-wider border-b border-pink-400 pb-2 inline-block md:block">GET EMAIL UPDATES</h4>
            <p className="text-xs text-pink-100 mb-4">Subscribe to get special offers and sweet news.</p>
            <div className="flex justify-center md:justify-start">
              <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              <button className="bg-[#b71c1c] px-4 py-2 rounded-r-lg hover:bg-[#c62828] transition-colors font-bold text-sm">ENTER</button>
            </div>

            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {/* Social Icons placeholders */}
              <a href="#" className="bg-pink-800 p-2 rounded-full hover:bg-pink-700 transition-colors"><span className="sr-only">Facebook</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a>
              <a href="#" className="bg-pink-800 p-2 rounded-full hover:bg-pink-700 transition-colors"><span className="sr-only">Twitter</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg></a>
              <a href="#" className="bg-pink-800 p-2 rounded-full hover:bg-pink-700 transition-colors"><span className="sr-only">Instagram</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"></line></svg></a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-400 mt-12 py-6 text-center text-xs text-pink-200">
          © 2024 Sweet Shop Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SweetShopHome;