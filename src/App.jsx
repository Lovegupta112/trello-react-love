import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import BoardPage from './pages/BoardPage';
import ListPage from './pages/ListPage';
import NoMatchPage from './pages/NoMatchPage';



function App() {
  

  return (
    <>
    <Header />
    <Routes>
      <Route path='/boards' element={<BoardPage/>}/>
      <Route path='/boards/:id' element={<ListPage />}/>
      <Route path='*' element={<NoMatchPage />} />
    </Routes>
  
    </>
  )
}

export default App
