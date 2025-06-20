import './App.css';
import ContactPage from './Component/contactpage';
import ProjectCard from './Component/project';
import Header from './Component/header';
import {Routes, Route, Outlet} from 'react-router-dom'
import Footer from './Component/footer';


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
              <Route path='/project' element={<ProjectCard />} />
              <Route path='/contact' element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
  );
}

export default App;
