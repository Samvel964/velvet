import "./style.scss";
import { PageTopInfo } from "../../components/PageTopInfo";
import { CategorySection } from "./CategorySection";
import { ProductSection } from "./ProductSection";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/products";
import { setLoader } from "../../features/configSlice";
import { useDispatch } from "react-redux";

export const AllProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [fiteredProducts, setFilteredProducts] = useState([]);
  const [productMaxCount, setProductMaxCount] = useState(12);
  const [showButton, setShowButton] = useState(true);
  const [showPriceRange, setShowPriceRange] = useState(true)
  useEffect(() => {
    dispatch(setLoader(true));
    getAllProducts().then(res => {
      setProducts(res.data.products);
      dispatch(setLoader(false));
    })
  },[])

  useEffect(() => {
    setFilteredProducts(products.slice(0,productMaxCount));
    if (products.length > 0 && productMaxCount >= products.length) {
      setShowButton(false)
    }    
  },[products, productMaxCount])

  const filterByCategory = (e) => {
    setFilteredProducts(products.filter(product => 
      product.productTag === e.target.innerHTML)
    )
    window.scrollTo(0,400);
    setShowButton(false);
    setShowPriceRange(false);
  }

  const filterByBrands = (e) => {
    setFilteredProducts(products.filter(product => 
      product.productBrand === e.target.innerText.split("\n(")[0])
    )
    window.scrollTo(0,400);
    setShowButton(false);
    setShowPriceRange(false);
  }

  const filterByPrice = (price) => {
    setFilteredProducts(products.filter(product => 
      product.productPrice >= price[0] && 
      product.productPrice <= price[1]).slice(0,productMaxCount)
    )
  }

  const loadMore = () => {
    setProductMaxCount(productMaxCount + 12);
  } 


  return (
    <>
    <PageTopInfo pageName={'Shop'} title={'Product page'}/>
    <section className="category-section spad">
		<div className="container">
			<div className="row">
        <CategorySection 
          categoryFilter={filterByCategory} 
          brandFilter={filterByBrands}
          priceFilter={filterByPrice}
          showPriceRange={showPriceRange}
        />
        <ProductSection  
          products={fiteredProducts} 
          loadMore={loadMore} 
          showButton={showButton}
        />				
			</div>
		</div>
	</section>
    </>
  );
};
