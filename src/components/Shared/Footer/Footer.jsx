import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../Logo/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Information */}
          <div>
            <Logo></Logo>
            <address className="text-sm not-italic mb-4">
              300/1 Lichubagan, West Nakhalpara<br />
              Tajgaon, Dhaka<br />
              Mobile: 01919011101
            </address>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Track Order</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Shop</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Best Sellers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Special Offers</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest products and exclusive deals.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 w-full border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

       

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 mb-3 md:mb-0">
            © {new Date().getFullYear()} Janopriyo Shop. All rights reserved.
          </div>
          
          <div className="text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition mr-4">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer