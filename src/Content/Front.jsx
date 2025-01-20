import React from 'react';
import { FaFacebookSquare, FaInstagram, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Front = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header
        className="text-center py-20 bg-cover bg-center relative shadow-lg"
        style={{ backgroundImage: `url('/src/assets/hero_bg.png')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-extrabold leading-tight">
            Share the Love with <span className="text-red-500">VowForYou</span>
          </h1>
          <p className="text-xl mt-6">
            Send and receive sweet anonymous messages. Open them on Valentine's Day!
          </p>
          <div className="mt-10 space-x-6 pb-9">
            <a
              href="/?section=signup"
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 inline-flex items-center space-x-3"
            >
              <FaUserPlus className="w-6 h-6" />
              <span>Sign Up</span>
            </a>
            <a
              href="/?section=login"
              className="px-8 py-4 bg-gray-700 hover:bg-gray-800 text-lg font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 inline-flex items-center space-x-3"
            >
              <FaSignInAlt className="w-6 h-6" />
              <span>Log In</span>
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-10">How VowForYou Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="p-8 shadow-lg rounded-lg bg-pink-50 hover:bg-white transition-all duration-300">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up to receive your personal profile link and start collecting messages.
              </p>
            </div>
            <div className="p-8 shadow-lg rounded-lg bg-pink-50 hover:bg-white transition-all duration-300">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Share Your Link</h3>
              <p className="text-gray-600">
                Spread the word by sharing your unique link with friends and loved ones.
              </p>
            </div>
            <div className="p-8 shadow-lg rounded-lg bg-pink-50 hover:bg-white transition-all duration-300">
              <h3 className="text-2xl font-bold text-red-500 mb-4">Open on Valentine's Day</h3>
              <p className="text-gray-600">
                Unlock all the heartfelt messages you've received on February 14!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="bg-red-100 py-10">
        <div className="container mx-auto text-center pb-8">
          <h2 className="text-2xl font-bold text-red-600 mb-6">Connect with Us</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-red-500 hover:text-red-600 text-4xl transition-transform transform hover:scale-110"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="#"
              className="text-red-500 hover:text-red-600 text-4xl transition-transform transform hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Front;
