import "./style.scss";
import { PageTopInfo } from "../../components/PageTopInfo";
import { ProductPicZoom } from "./ProductPicZoom/productPicZoom";
import { ProductDetails } from "./ProductDetails";
import { ProductSlider } from "../../components/ProductSlider";
import { getAllProducts } from "../../api/products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { setLoader } from "../../features/configSlice";
import { useDispatch } from "react-redux";


export const Product = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState();
  const [singleProduct, setSingleProduct] = useState()
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    dispatch(setLoader(true));
    getAllProducts().then(res => {
      setProducts(res.data.products);
      dispatch(setLoader(false));
    })    
  },[])

  useEffect(() => {
    products?.filter(product => {
      if (product._id === id) {
        setSingleProduct(product)
      }
    })
  },[products,id])

  useEffect(() => {
    setRelatedProducts(products?.filter(product => 
      product.productTag === singleProduct.productTag && 
      product._id !== singleProduct._id))
  },[singleProduct])

  console.log(singleProduct,'singl')

  
  return (
    <>
      <PageTopInfo pageName={"Shop"} />
      <section className="product-section">
        <div className="container">
          <div className="back-link">
            <Link to="/products"> &lt;&lt; Back to Products</Link>
          </div>
          <div className="row">
            <ProductPicZoom images={singleProduct?.productImage}/>
            <ProductDetails product={singleProduct} id={singleProduct?._id}/>
            <ProductSlider title={'RELATED PRODUCTS'} products={relatedProducts?.slice(0,8)}/>
          </div>
        </div>
      </section>
    </>
  );
};
