import './App.css';
import ContactPage from './Component/contactpage';
import ProjectCard from './Component/project';
import Header from './Component/header';
import Skills from './Component/skills'
import {Routes, Route, Outlet} from 'react-router-dom'
import Footer from './Component/footer';
import Home from './Home'
import ProjectDetail from './Component/projectdetail';


function Layout() {
  return (
    <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}
function App() {

  return (
      <div className="App">
        <Header />
        <div className='App-header'>
          <Routes>
            <Route element={<Layout />} />
            <Route path='codewithajdev.onrender.com/' element={<Home />} />
              <Route exact path='/project' element={<ProjectCard />} />
              <Route path='projects/:id' element={<ProjectDetail />} />
              <Route exact path='/contact' element={<ContactPage />} />
              <Route exact path='/skill' element={<Skills />} />
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
