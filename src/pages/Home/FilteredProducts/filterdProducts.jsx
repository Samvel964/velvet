import "./style.scss";
import { BsHandbag, BsHeart } from "react-icons/bs";
import { GiHearts } from "react-icons/gi";
import { TiTick } from 'react-icons/ti';
import { useNavigate } from "react-router-dom";
import { addToCard, addFavorite, removeFavorite } from "../../../api/user";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../../features/userSlice";
import { ToastContainer, toast } from 'react-toastify';


export const FilteredProducts = ({ products, tags, FilterTag, loadMore, showButton }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesId = useSelector(state => state.user.favoritesId);
  const cartAddId = useSelector(state => state.user.cartAddId);
  const token = localStorage.getItem('Token');


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
    <section className="product-filter-section">
      <ToastContainer onClick={() => token && navigate('/cart')} />
      <div className="container">
        {products.length && (
          <>
            <div className="section-title">
              <h2>BROWSE TOP SELLING PRODUCTS</h2>
            </div>
            <ul className="product-filter-menu">
              {tags &&
                tags?.map((tag, index) => {
                  return (
                    <li key={tag + index}>
                      <span onClick={(e) => FilterTag(e)}>{tag}</span>
                    </li>
                  );
                })}
            </ul>
            <div className="row">
              {products?.map((product) => {
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
                          <p className="add-card" onClick={(e) => addCart(e,product._id)}>
                           
                            {cartAddId.includes(product._id) ? 
                            <><TiTick className="tick"/> <span style={{color:'green'}}>ADDED</span> </> :
                            <><BsHandbag /> <span>ADD TO CART</span> </>  }
                          </p>
                          <p className="wishlist-btn" onClick={(e) => favorite(e,product._id)}>
                            {favoritesId.includes(product._id) 
                            ? <GiHearts className="favorite"/> 
                            : <BsHeart/>}
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
            {showButton ? (
              <div className="text-center pt-5">
                <button
                  className="site-btn sb-line sb-dark"
                  onClick={() => loadMore()}
                >
                  LOAD MORE
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
};
