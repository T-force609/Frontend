import ImageIcon from './ImageIcon.jpeg'
function Header() {
    return (
      <header className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo/Name */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-gray-700 w-10 h-10 rounded-full mr-3 overflow-hidden"><img src={ImageIcon} alt='icon' /></div>
            <h1 className="text-lg font-bold">AJ-Segun Portfolio</h1>
            
          </div>
  
          {/* Navigation */}
          <nav className="flex space-x-1 md:space-x-6">
          <a href="/" className="nav-link hover:text-red-400 transition">
              <i className="fas fa-cubes mr-2"></i>Home
            </a>
            <a href="/project" className="nav-link hover:text-blue-400 transition">
              <i className="fas fa-cubes mr-2"></i>Projects
            </a>
            <a href="/project" className="nav-link hover:text-blue-400 transition">
              <i className="fas fa-cubes mr-2"></i>3D Art
            </a>
            <a href="#web-dev" className="nav-link hover:text-green-400 transition">
              <i className="fas fa-code mr-2"></i>Web Dev
            </a>
            <a href="#ml-projects" className="nav-link hover:text-purple-400 transition">
              <i className="fas fa-brain mr-2"></i>ML Projects
            </a>
            <a href="/skill" className="nav-link hover:text-yellow-400 transition">
              <i className="fas fa-chart-bar mr-2"></i>Skills
            </a>
          </nav>
  
          {/* Contact CTA */}
          <a href="/contact" className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            <i className="fas fa-envelope mr-2"></i>Contact Me
          </a>
        </div>
      </header>
    );
  }

  export default Header