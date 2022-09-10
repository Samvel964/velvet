import './App.css';
import { ProjectRoutes } from './ProjectRoutes';
import { ScrollToTop } from './scrollToTop';
import { FaChevronUp } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from './components/Loader/loader';
import { getUser } from './api/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setFavoritesId, setCartAddId } from './features/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loader = useSelector(state => state.configs.loader);
  const token = useSelector(state => state.user.token);
  const state = useSelector(state => state.user.state);


  useEffect(() => {
    getUser().then(res => {
      dispatch(setUserData(res.data))
      dispatch(setFavoritesId(res.data.user.favorites.map(item => item._id)))
      dispatch(setCartAddId(res.data.user.userCart.map(item => item._id)))
    });

    if (!token) {
      localStorage.removeItem('Token');
    }
    if (!token && pathname === '/cart') {
      navigate('/');
      toast.error("Sorry, for this page need log in");
    }
    //eslint-disable-next-line
  },[pathname, state])


  const [goUp, setGoUp] = useState(false);
  window.addEventListener('scroll', function() {
    if (this.scrollY >= 1500) {
      setGoUp(true)
    } else {
      setGoUp(false)
    }
  })
  
  return (
    <div className="App">
      <ScrollToTop />
      <ToastContainer/>
      <ProjectRoutes />
      {loader ? <Loader /> : null }
      {
        goUp ? <p className="go-to-top" onClick={() => window.scroll(0,0)}><FaChevronUp /></p> : null
      }      
    </div>
  );
}

export default App;
