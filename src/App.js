import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Movies from './components/Movies';
import Login from './components/Login';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Newui from './components/Customui';
import Favourites from './components/Favourites';
import Pagination from './components/Pagination';
import Signup from './components/Signup';
function App() {
  return (
    <>
    <BrowserRouter>

      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<><Banner/><Movies/></>}></Route>
        <Route path='/favourites' element={<Favourites/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      </BrowserRouter>
      {/* <h2>Pagination</h2> */}
    </>

  );
}

export default App;
