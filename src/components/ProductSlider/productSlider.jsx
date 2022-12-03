import "./style.scss";
import Carousel from "nuka-carousel/lib/carousel";
import { BsHandbag, BsHeart } from "react-icons/bs";
import { TiTick } from 'react-icons/ti';
import { GiHearts } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { addToCard, addFavorite, removeFavorite } from "../../api/user";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../features/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";


export const ProductSlider = ({ title, products, slidesToShow = 4 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesId = useSelector(state => state.user.favoritesId);
  const cartAddId = useSelector(state => state.user.cartAddId);
  const token = localStorage.getItem('Token');
  const [screenSize, setScreenSize] = useState(window.innerWidth)

  
  window.addEventListener('resize', () => {
    setScreenSize(window.innerWidth)
  })

  if (screenSize <= 991 && screenSize >= 767) {
    slidesToShow = 3
  } else if (screenSize < 767 && screenSize >= 545) {
    slidesToShow = 2
  } else if (screenSize < 545) {
    slidesToShow = 1
  }


  const addCart = async(e,id) => {
    e.stopPropagation();

    if (token && !cartAddId.includes(id)) {
      const res = await addToCard(id);
      if (res) {
        dispatch(setState());
        toast.success('Product added in Your cart!');
      }
    }
    
    if (!token) {
      toast.error("Requires registration or log in");
    } 
  }

  const favorite = async(e,id) => {
    e.stopPropagation();

    if (token) {
      if (favoritesId.includes(id)) {
        const res = await removeFavorite(id);
        if (res) dispatch(setState());
      } else {
        const res = await addFavorite(id);
        if (res) dispatch(setState());
      }
    } else {
      toast.error("Requires registration or log in");
    }  
  }
  
  return (
    <section className="top-letest-product-section">
      <ToastContainer onClick={() => token && navigate('/cart')} />
      <div className="container">
        {!!products?.length &&
        <>
        <div className="section-title">
          <h2>{title}</h2>
        </div>
        <div className="product-slider owl-carousel">
          <Carousel
            wrapAround={true}
            autoplay={true}
            slidesToShow={slidesToShow}
            pauseOnHover={false}
          >
            {products?.map((product) => {
              return (
                <div className="product-item" 
                  key={product._id} 
                  onClick={() => navigate(`/products/${product._id}`)}>
                  <div className="pi-pic">
                    <img src={product?.productImage[0]?.url} alt="" />
                    <div className="pi-links">
                      <p className="add-card" onClick={(e) => addCart(e, product._id)}>
                        {cartAddId.includes(product._id) ? 
                            <><TiTick className="tick"/> <span style={{color:'green'}}>ADDED</span> </> :
                            <><BsHandbag /> <span>ADD TO CART</span> </>  }
                      </p>
                      <p className="wishlist-btn" onClick={(e) => favorite(e, product._id)}>
                          {favoritesId.includes(product._id) 
                          ? <GiHearts className="favorite"/> 
                          : <BsHeart/>}
                      </p>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>${product?.productPrice}.00</h6>
                    <p>{product?.productName}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        </>}
      </div>
    </section>
  );
};
