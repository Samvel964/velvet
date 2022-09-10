import "./style.scss";
import logo from "./img/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { BsHandbag, BsPerson } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Registration } from "../../pages/Registration";
import { useState } from "react";
import { LogIn } from "../../pages/LogIn";
import { useSelector, useDispatch } from "react-redux";
import { setFavoritesId, setCartAddId } from "../../features/userSlice";


export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const currentUser = useSelector(state => state.user.data);

  const goToFavorite = async () => {
    await navigate('/cart');
    window.location.href = "#favorites";
  }

  const logOut = () => {
    localStorage.removeItem("Token");
    navigate('/velvet');
    dispatch(setFavoritesId([]));
    dispatch(setCartAddId([]));
  }

  return (
    <header className="header-section">
      <div className="header-top">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5 text-left text-lg-left">
              {/* logo */}
              <Link to="/" className="site-logo">
                <img src={logo} alt="Velvet" />
              </Link>
            </div>
            <div className="col-xl-6 col-lg-6 col-right">
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
                    <div className="shopping-card">
                      <BsHandbag />
                      <span>{currentUser?.userCart?.length}</span>
                    </div>
                    <Link to="/cart">Shopping Cart</Link>
                    <div className="shopping-card">
                      <FaHandHoldingHeart className="heart" />
                      <span>{currentUser?.favorites?.length}</span>
                    </div>
                    <span className="favorite" onClick={()=> goToFavorite()}>Favorite products</span>
                    <span 
                      className="logOut"
                      onClick={() => logOut()}
                    ><FiLogOut/> Log out</span>
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
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="" className="disabled">Women</Link>
            </li>
            <li>
              <Link to="" className="disabled">
                Jewelry
                <span className="new">New</span>
              </Link>
            </li>
            <li>
              <Link to="" className="disabled">Shoes</Link>
              <ul className="sub-menu">
                <li>
                  <Link to="" className="disabled">Sneakers</Link>
                </li>
                <li>
                  <Link to="" className="disabled">Sandals</Link>
                </li>
                <li>
                  <Link to="" className="disabled">Formal Shoes</Link>
                </li>
                <li>
                  <Link to="" className="disabled">Boots</Link>
                </li>
                <li>
                  <Link to="" className="disabled">Flip Flops</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="">Pages</Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/products">Product Page</Link>
                </li>
                <li>
                  <Link to="/cart">Cart Page</Link>
                </li>
                <li>
                  <Link to="/checkout">Checkout Page</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Page</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="" className="disabled">Blog</Link>
            </li>
          </ul>
        </div>
      </nav>
      {showRegistration ? (
        <Registration showRegistration={setShowRegistration} />
      ) : null}
      {showLogIn ? <LogIn showLogIn={setShowLogIn} /> : null}
    </header>
  );
};
