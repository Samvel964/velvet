import "./style.scss";
import { PageTopInfo } from "../../components/PageTopInfo";
import { ProductPicZoom } from "./ProductPicZoom/productPicZoom";
import { ProductDetails } from "./ProductDetails";
import { ProductSlider } from "../../components/ProductSlider";

import { getAllProducts } from "../../api/products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const Product = () => {
  const [products, setProducts] = useState();
  const [singleProduct, setSingleProduct] = useState()
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    getAllProducts().then(res => {
      setProducts(res.data.products)
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
            <ProductDetails product={singleProduct}/>
            <ProductSlider title={'RELATED PRODUCTS'} products={relatedProducts?.slice(0,8)}/>
          </div>
        </div>
      </section>
    </>
  );
};
