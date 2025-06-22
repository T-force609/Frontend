function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">AJ-Segun</h3>
            <p className="mb-4 text-gray-400" >Creating immersive 3D experiences, robust web applications, and intelligent ML solutions</p>
            <div className="flex space-x-4">
              <a href="/"><i className="fab fa-artstation text-xl hover:text-blue-400"></i></a>
              <a href="/"><i className="fab fa-github text-xl hover:text-white"></i></a>
              <a href="/"><i className="fab fa-linkedin text-xl hover:text-blue-500"></i></a>
              <a href="/"><i className="fab fa-kaggle text-xl hover:text-blue-300"></i></a>
            </div>
          </div>
  
          {/* Skills Quick Links */}
          <div>
            <h4 className="text-white mb-4 font-medium">My Expertise</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition">Blender Modeling</a></li>
              <li><a href="/" className="hover:text-white transition">Django Development</a></li>
              <li><a href="/" className="hover:text-white transition">React Applications</a></li>
              <li><a href="/" className="hover:text-white transition">Machine Learning</a></li>
              <li><a href="/" className="hover:text-white transition">3D Texturing</a></li>
            </ul>
          </div>
  
          {/* Featured Projects */}
          <div>
            <h4 className="text-white mb-4 font-medium">Featured Work</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800 aspect-square rounded"></div>
              <div className="bg-gray-800 aspect-square rounded"></div>
              <div className="bg-gray-800 aspect-square rounded"></div>
              <div className="bg-gray-800 aspect-square rounded"></div>
            </div>
          </div>
  
          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4 font-medium">Get In Touch</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-blue-400"></i>
                ajibadejohn30@gmail.com
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-red-400"></i>
                Lagos, Nigeria
              </li>
              <li className="flex items-center">
                <i className="fas fa-file-pdf mr-2 text-yellow-400"></i>
                <a href="/" className="hover:text-white">Download CV</a>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-4">
              <label className="block text-sm mb-2">Join my newsletter</label>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-gray-800 px-3 py-2 rounded-l text-sm w-full"/>
                <button className="bg-blue-600 px-3 py-2 rounded-r text-sm">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          © {new Date().getFullYear()} AJ-Segun Portfolio. All rights reserved.
          <div className="mt-2">
            <span className="mx-2">Privacy Policy</span> | 
            <span className="mx-2">Terms of Service</span>
          </div>
        </div>
      </footer>
    );
  }

  export default Footer