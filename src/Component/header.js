import AjLogo from '../AjLogo.png';
import menu from '../menu.png';
import Close from '../Close.png';
import { useState } from 'react';

function Header() {
  const [toggle, setToggle] = useState(false);

  // Array of navigation items for cleaner code
  const navItems = [
    { href: "/", text: "Home", icon: "fa-cubes", color: "text-red-400" },
    { href: "/project", text: "Projects", icon: "fa-cubes", color: "text-blue-400" },
    { href: "/project", text: "3D Art", icon: "fa-cubes", color: "text-blue-400" },
    { href: "#web-dev", text: "Web Dev", icon: "fa-code", color: "text-green-400" },
    { href: "#ml-projects", text: "ML Projects", icon: "fa-brain", color: "text-purple-400" },
    { href: "/skill", text: "Skills", icon: "fa-chart-bar", color: "text-yellow-400" },
  ];

  return (
    <header className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-row justify-between items-center">
        {/* Logo/Name */}
        <div className="flex items-center">
          <div className="bg-gray-700 w-10 h-10 rounded-full mr-3 overflow-hidden">
            <img src={AjLogo} alt='icon' className='w-full h-full' />
          </div>
          <h1 className="text-lg font-bold">AJ-Segun Portfolio</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={item.href} 
              className={`nav-link hover:${item.color} transition`}
            >
              <i className={`fas ${item.icon} mr-2`}></i>
              {item.text}
            </a>
          ))}
          <a 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            <i className="fas fa-envelope mr-2"></i>Contact Me
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center w-[28px] h-[28px]'>
          <img 
            src={toggle ? Close : menu} 
            alt='menu' 
            className='w-7 h-7 cursor-pointer'
            onClick={() => setToggle(!toggle)} 
          /> 
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <div className="lg:hidden absolute top-20 right-0 left-0 bg-gray-800 mx-4 py-4 rounded-xl shadow-lg z-40">
            <div className="flex flex-col space-y-4 px-6">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href} 
                  className={`py-2 hover:${item.color} transition border-b border-gray-700`}
                  onClick={() => setToggle(false)}
                >
                  <i className={`fas ${item.icon} mr-3`}></i>
                  {item.text}
                </a>
              ))}
              <a 
                href="/contact" 
                className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition text-center"
                onClick={() => setToggle(false)}
              >
                <i className="fas fa-envelope mr-2"></i>Contact Me
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;