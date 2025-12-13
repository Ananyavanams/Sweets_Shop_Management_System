import React from 'react';
import Sweets1Img from '../assets/sweets1.jpg';
import Sweets2Img from '../assets/sweets2.jfif';
import GulabJamunImg from '../assets/Gulabjamun.jpg';
import RasgullaImg from '../assets/Rasgulla.jpg';
import MysorePakImg from '../assets/Mysore_pak.jpg';
import KajuKatliImg from '../assets/Kajukatli.jfif';
import JalebiImg from '../assets/Jalebi.jfif';
import LadooImg from '../assets/Motichoor_Laddu.jfif';


const SweetShopHome = () => {
  const products = [
    { id: 1, name: 'Gulab Jamun', price: '₹120', image: GulabJamunImg },
    { id: 2, name: 'Rasgulla', price: '₹100', image: RasgullaImg },
    { id: 3, name: 'Mysore Pak', price: '₹150', image: MysorePakImg },
    { id: 4, name: 'Kaju Katli', price: '₹300', image: KajuKatliImg },
    { id: 5, name: 'Jalebi', price: '₹80', image: JalebiImg },
    { id: 6, name: 'Ladoo', price: '₹90', image: LadooImg },
  ];

  return (
    <div className="min-h-screen bg-pink-50">


      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          {/* Left image */}
          <div className="hidden md:block">
            <img
              src={Sweets1Img}
              alt="Assorted sweets"
              className="rounded-xl shadow-md object-cover w-full h-80"
            />
          </div>

          {/* Center quotation */}
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-semibold text-gray-800">
              "Life is sweeter with every bite."
            </p>
            <p className="mt-4 text-gray-600">
              Indulge in handcrafted delights made with love.
            </p>
          </div>

          {/* Right image */}
          <div className="hidden md:block">
            <img
              src={Sweets2Img}
              alt="Delicious desserts"
              className="rounded-xl shadow-md object-cover w-full h-80"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SweetShopHome;