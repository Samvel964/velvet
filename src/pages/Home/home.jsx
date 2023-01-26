import "./style.scss";
import { HeroSlider } from "./HeroSlider";
import { ProductSlider } from "../../components/ProductSlider";
import { Features } from "./FeaturesSection";
import { FilteredProducts } from "./FilteredProducts";
import banner from '../../img/banner-bg.jpg';
import { getAllProducts } from "../../api/products";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoader } from "../../features/configSlice";
import { useDispatch } from "react-redux";


export const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsMaxCount, setProductsMaxCount] = useState(8);
  const [showButton, setShowButton] = useState(true);
  const tags = [];
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(setLoader(true));
    getAllProducts().then(res => {
      setProducts(res.data.products);
      dispatch(setLoader(false));
    })
  },[])

  useEffect(() => {
    setFilteredProducts(products.slice(0, productsMaxCount));

    if (productsMaxCount >= 16) {
      setShowButton(false)
    }
  }, [products, productsMaxCount])
  
  products?.forEach(product => {
    if (!tags.includes(product.productTag)){
      tags?.push(product.productTag)
    }
  })  

  const filterByTag = (e) => {
    setFilteredProducts(products.filter(product => 
      product.productTag === e.target.innerHTML)
    )
    setShowButton(false)
  }

  const loadMore = () => {
    setProductsMaxCount(productsMaxCount + 8)
  }
  

  return (
  <>
  <HeroSlider />
  <Features /> 
  <ProductSlider 
    title={'BEST PRODUCTS'} 
    products={products?.slice(0,15)}
  />
  <FilteredProducts 
    tags={tags?.slice(0,8)}
    products={filteredProducts}
    FilterTag={filterByTag}
    loadMore={loadMore}
    showButton={showButton}
  />
  <section className="banner-section">
		<div className="container">
			<div className="banner set-bg" data-setbg="img/banner-bg.jpg" style={{backgroundImage: `url(${banner})`}}>
				<div className="tag-new">NEW</div>
				<span>New Arrivals</span>
				<h2>STRIPED SHIRTS</h2>
				<span className="site-btn" onClick={() => navigate('/products')}>SHOP NOW</span>
			</div>
		</div>
	</section>
  </>
  );
};
