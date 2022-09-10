import "./style.scss";
import { BsHeart, BsHandbag } from "react-icons/bs";
import { GiHearts } from "react-icons/gi";
import { TiTick } from 'react-icons/ti';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCard, addFavorite, removeFavorite } from "../../api/user";
import { setState } from "../../features/userSlice";
import { ToastContainer, toast } from 'react-toastify';

export const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.data);
  const favoritesId = useSelector((state) => state.user.favoritesId);
  const cartAddId = useSelector(state => state.user.cartAddId);
  const token = localStorage.getItem('Token');

  const addCart = async (e, id) => {
    e.stopPropagation();

    if (token && !cartAddId.includes(id)) {
      const res = await addToCard(id);
      if (res) {
        dispatch(setState());
        toast.success('Product added in Your cart!');
      }
    } 
    if (!token) {
      toast.error("Need to log in or registration");
    }
  };

  const favorite = async (e, id) => {
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
      toast.error("Need to log in or registration");
    }  
  };


  return (
    <section className="favorite product-filter-section">
      <ToastContainer onClick={() => token && navigate('/cart')} />
      <div className="container">
        {currentUser?.favorites.length > 0 && 
        <>
        <div className="section-title">
          <h2 id="favorites">YOUR FAVORITES</h2>
        </div>
        <div className="row">
          {currentUser?.favorites?.map((product) => {
            return (
              <div
                className="col-lg-3 col-sm-6"
                onClick={() => navigate(`/products/${product._id}`)}
                key={product._id}
              >
                <div className="product-item">
                  <div className="pi-pic">
                    <img src={product?.productImage[0].url} alt="" />
                    <div className="pi-links">
                      <p
                        className="add-card"
                        onClick={(e) => addCart(e, product._id)}
                      >
                        {cartAddId.includes(product._id) ? 
                      <><TiTick className="tick"/> <span style={{color:'green'}}>ADDED</span> </> :
                      <><BsHandbag /> <span>ADD TO CART</span> </>  }
                        
                      </p>
                      <p
                        className="wishlist-btn"
                        onClick={(e) => favorite(e, product._id)}
                      >
                        {favoritesId.includes(product._id) ? (
                          <GiHearts className="favorite" />
                        ) : (
                          <BsHeart />
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="pi-text">
                    <h6>${product?.productPrice}.00</h6>
                    <p>{product?.productTitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </>}
      </div>
    </section>
  );
};
