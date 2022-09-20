import "./style.scss";
import logo from "./img/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { BsHandbag, BsPerson } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

import { Registration } from "../../pages/Registration";
import { useState } from "react";
import { LogIn } from "../../pages/LogIn";
import { useSelector, useDispatch } from "react-redux";
import { setFavoritesId, setCartAddId } from "../../features/userSlice";
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation()
  const token = localStorage.getItem("Token");
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = useSelector(state => state.user.data);

  useEffect(() => {
    setMenuOpen(false)
  },[pathname])

  const goToFavorite = async () => {
    await navigate('/cart');
    window.location.href = "#favorites";
  }

  const logOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("Token");
        navigate('/velvet');
        dispatch(setFavoritesId([]));
        dispatch(setCartAddId([]));        
      }
    })    
  }

  return (
    <header className="header-section">
      <div className="header-top">
        {menuOpen ? <GrClose className="burger-menu" onClick={()=>setMenuOpen(!menuOpen)} /> 
        : <GiHamburgerMenu className="burger-menu" onClick={()=>setMenuOpen(!menuOpen)}/>}
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-6 col-lg-5 text-left logo text-lg-left col-md-3 col-sm-5 col-4">
              {/* logo */}
              <Link to="/velvet" className="site-logo">
                <img src={logo} alt="Velvet" />
              </Link>
            </div>
            <div className="col-xl-6 col-lg-6 col-right col-md-9 col-sm-6 col-8">
              <div className="user-panel">
                {!token ? (
                  <div className="up-item">
                    <BsPerson />
                    <span onClick={() => setShowLogIn(true)}>
                      Sign In
                    </span> or{" "}
                    <span onClick={() => setShowRegistration(true)}>
                      Create Account
                    </span>
                  </div>
                ) : (
                  <div className="up-item">
                    <Link to="/cart" className="shopping-cart-a" >
                      <div className="beauty-cart"> 
                        <BsHandbag />
                        <span>{currentUser?.userCart?.length}</span>
                      </div>Shopping Cart
                    </Link>
                    
                    <Link to="/cart" className="shopping-cart-a-icon">
                      <div className="beauty-cart"> 
                        <BsHandbag />
                        <span>{currentUser?.userCart?.length}</span>
                      </div>
                    </Link>

                    <div className="beauty-cart">
                      <FaHandHoldingHeart className="heart" onClick={()=> goToFavorite()} />
                      <span>{currentUser?.favorites?.length}</span>
                    </div>
                    <span className="favorite" onClick={()=> goToFavorite()}>Favorite products</span>
                    <span 
                      className="logOut"
                      onClick={() => logOut()}
                    ><FiLogOut/> Log out</span>
                    <span className="logOut-icon"><FiLogOut  onClick={() => logOut()}/></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="main-navbar">
        <div className="container">
          {/* menu  */}
          <ul className="main-menu">
            <li>
              <Link to="/velvet">Home</Link>
            </li>
            <li>
              <Link to="/products">Products
              <span className="new">New</span>
              </Link>
              
            </li>
            <li className="disabled">
              <Link to="" className="disabled">Women</Link>
            </li>
            <li className="disabled">
              <Link to="" className="disabled">
                Jewelry
              </Link>
            </li>
            <li className="disabled">
              <Link to="" className="disabled">Shoes</Link>
              <ul className="sub-menu">
                <li className="disabled">
                  <Link to="" className="disabled">Sneakers</Link>
                </li>
                <li className="disabled">
                  <Link to="" className="disabled">Sandals</Link>
                </li>
                <li className="disabled">
                  <Link to="" className="disabled">Formal Shoes</Link>
                </li>
                <li className="disabled">
                  <Link to="" className="disabled">Boots</Link>
                </li>
                <li className="disabled">
                  <Link to="" className="disabled">Flip Flops</Link>
                </li>
              </ul>
            </li>
            <li>
              <span>Pages</span>
              <ul className="sub-menu">
                <li>
                  <Link to="/products">Product Page</Link>
                </li>
                <li>
                  <Link to="/cart">Cart Page</Link>
                </li>
                <li className="disabled">
                  <Link to="" className="disabled">Checkout Page</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Page</Link>
                </li>
              </ul>
            </li>
            <li className="disabled">
              <Link to="" className="disabled">Blog</Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className={menuOpen ? "main-navbar-icon active" : "main-navbar-icon"}>
      <ul className="main-menu-icon">
            <li><Link to="/velvet">Home</Link></li>
            <li><Link to="/products">Product Page</Link></li>
            <li><Link to="/cart">Cart Page</Link></li>
            <li><Link to="/checkout">Checkout Page</Link></li>
            <li><Link to="/contact">Contact Page</Link></li>
          </ul>
      </nav>
      {showRegistration ? (
        <Registration showRegistration={setShowRegistration} />
      ) : null}
      {showLogIn ? <LogIn showLogIn={setShowLogIn} /> : null}
    </header>
  );
};
