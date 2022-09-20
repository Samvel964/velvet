import "./style.scss";
import Carousel from "nuka-carousel/lib/carousel";
import { useState, useEffect } from "react";
import { removeCart } from "../../api/user";
import { getAllProducts } from "../../api/products";
import { Favorites } from "../Favorites";
import { MdDeleteForever } from 'react-icons/md';
import { setState } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { PageTopInfo } from "../../components/PageTopInfo";
import { setLoader } from "../../features/configSlice";
import Swal from 'sweetalert2';

export const Cart = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const currentUser = useSelector(state => state.user.data);

  useEffect(() => {
    dispatch(setLoader(true));
    getAllProducts().then((res) => {
      setProducts(res.data.products);
      dispatch(setLoader(false));
    });
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    setSelectedProduct(currentUser.userCart)
  }, [currentUser]);

  const removeItem = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        removeCart(id).then(res => {if (res) dispatch(setState())})
      }
    })    
  };

  const totalPrice = () => {
    const prices = [];
    currentUser?.userCart?.forEach((item) => {
      prices.push(item.productPrice);
    });

    return prices.reduce((first, second) => {
      return first + second;
    }, 0);
  };

  const selectProduct = (id) => {
    setSelectedProduct(products.filter(product => product._id === id));
    window.location.href = "#selected";
  }  

  return (
    <>
    <PageTopInfo title={'YOUR CART'} pageName={'Cart'} />
    <section className="cart-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-table">
              <h3>Your Cart</h3>
              <div className="cart-table-warp">
                <table>
                  <thead>
                    <tr>
                      <th className="product-th">Product</th>
                      <th className="total-th">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser?.userCart?.map((product) => {
                        return (
                          <tr className="product-tr" key={product._id}>
                            <td
                              className="product-col"
                              onClick={() => selectProduct(product._id)}
                            >
                              <img src={product?.productImage[0].url} alt="product" />
                              <div className="pc-title">
                                <h4>{product?.productTitle}</h4>
                              </div>
                            </td>
                            <td className="total-col">
                              <h4>${product?.productPrice}</h4>
                            </td>
                            <td
                              className="total-col"
                              onClick={() => removeItem(product._id)}
                            >
                            <MdDeleteForever />
                            </td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="total-cost">
                <button className="btn-buy">Buy</button>
                <h6>
                  Total <span>${totalPrice()}</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-4 card-right">
          <Carousel
            wrapAround={true}
            autoplay={true}
            slidesToShow={1}
            pauseOnHover={false}
          >
            {selectedProduct && selectedProduct[0]?.productImage?.map((item) => {
              return (
                <div className="product-item" 
                  key={item._id}
                  id="selected"
                  >
                  <div className="pi-pic">
                    <img src={item?.url} alt="" />                    
                  </div>
                </div>
              );
            })}
          </Carousel>
          </div>
        </div>
      </div>
      <div className="your-favorites">
        <Favorites />
      </div>
    </section>
    </>    
  );
};
