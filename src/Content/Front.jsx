import React from 'react';
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram } from 'react-icons/fa';

const VowForYou = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">VowForYou</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-20 text-center text-white" style={{ backgroundImage: "url('/hero_bg.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Share the Love with <span className="text-orange-500">VowForYou</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl">Send and receive sweet anonymous messages. Open them on Valentine's Day!</p>
          <button className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-lg"
          onClick={ () => window.location.replace("/?section=login")}
          >
            
            Start Now
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-extrabold mb-4 text-gray-800">How VowForYou Works</h3>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li><strong>Create Your Profile:</strong> Sign up to receive your personal profile link.</li>
              <li><strong>Share Your Link:</strong> Send the link to your friends and loved ones.</li>
              <li><strong>Open on Valentine's Day:</strong> All messages are unlocked on February 14!</li>
            </ul>
          </div>
          <div>
            <img src="  /hero_bg.png" alt="How VowForYou works" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-extrabold mb-6 text-center text-orange-500">Contacts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              
              <a href="mailto:valdezmarkjohn21@gmail.com" className="hover:text-orange-500 text-lg"><FaEnvelope className="text-orange-500 text-3xl" /></a>
            </div>
            <div className="flex flex-col items-center space-y-3">
              
              <a href="tel:09266215236" className="hover:text-orange-500 text-lg"><FaPhone className="text-orange-500 text-3xl" /></a>
            </div>
            <div className="flex flex-col items-center space-y-3">
              
              <a href="https://www.facebook.com/share/1AvFtmMzYT/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-lg"><FaFacebook className="text-orange-500 text-3xl" /></a>
            </div>
            <div className="flex flex-col items-center space-y-3">
             
              <a href="https://www.instagram.com/_easytechsolutions/profilecard/?igsh=YmNvam9rdnZpNWdp" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-lg"> <FaInstagram className="text-orange-500 text-3xl" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-white font-bold mb-4 text-lg">VowForYou</h4>
          <p>Share your profile link to receive sweet anonymous messages, openable only on February 14.</p>
          <p className="mt-4">&copy; {new Date().getFullYear()} VowForYou. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VowForYou;
