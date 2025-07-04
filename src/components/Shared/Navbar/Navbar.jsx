import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router';
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import Container from '../Container';
import Logo from '../Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/images/placeholder.jpg';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logOut();
    setIsOpen(false);
    navigate('/');
  };

  // Navigation links
  const navLinks = [
    { path: '/', name: 'Home' },
    { path: '/shop', name: 'Shop' },
    { path: '/about', name: 'About Us' },
  ];

  return (
    <div className={`fixed w-full bg-white z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      <div className='py-3 border-b'>
        <Container>
          <div className='flex items-center justify-between gap-4'>
            {/* Logo */}
            <Link to='/' className='flex-shrink-0'>
              <Logo className='h-10' />
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-8 ml-8'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                      isActive ? 'text-blue-600 border-b-2 border-blue-600' : ''
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className='hidden md:block flex-grow mx-8'>
              <SearchBar />
            </div>

            {/* Navigation Icons */}
            <div className='flex items-center gap-4'>
              {/* Search Icon - Mobile */}
              <button className='md:hidden p-2 rounded-full hover:bg-gray-100'>
                <AiOutlineSearch size={20} />
              </button>

              {/* Cart Icon */}
              <Link to='/cart' className='p-2 relative rounded-full hover:bg-gray-100'>
                <AiOutlineShoppingCart size={20} />
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                  0
                </span>
              </Link>

              {/* User Menu */}
              <div className='relative'>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition'
                >
                  <div className='hidden md:flex items-center gap-1'>
                    <span className='text-sm font-medium'>{user ? user.displayName : 'Account'}</span>
                  </div>
                  <img
                    className='rounded-full h-8 w-8 object-cover'
                    src={user?.photoURL || avatarImg}
                    alt='profile'
                    referrerPolicy='no-referrer'
                  />
                </button>

                {isOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                    {user ? (
                      <>
                        <Link
                          to='/profile'
                          className='block px-4 py-2 text-sm hover:bg-gray-100'
                          onClick={() => setIsOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to='/orders'
                          className='block px-4 py-2 text-sm hover:bg-gray-100'
                          onClick={() => setIsOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          to='/dashboard'
                          className='block px-4 py-2 text-sm hover:bg-gray-100'
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='block px-4 py-2 text-sm hover:bg-gray-100'
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='block px-4 py-2 text-sm hover:bg-gray-100'
                          onClick={() => setIsOpen(false)}
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className='md:hidden p-2 rounded-full hover:bg-gray-100'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AiOutlineMenu size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className='md:hidden mt-3'>
            <SearchBar />
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className='md:hidden bg-white py-2'>
              <nav className='flex flex-col space-y-2'>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md ${
                        isActive ? 'bg-blue-50 text-blue-600' : ''
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;