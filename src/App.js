import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DetailView from './components/DetailView';
import Home from './components/Home';
import Header from './components/Header';
import FavoritePokes from './components/FavoritePokes';


function App() {

  return (
    <div className="App">
      {/* <Home/> */}

      <BrowserRouter>
        <header className='sticky top-0'>
          <Header />
        </header>


        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/favorite' element={<FavoritePokes />}></Route>
          <Route path='/details/:id' element={<DetailView />}></Route>
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
