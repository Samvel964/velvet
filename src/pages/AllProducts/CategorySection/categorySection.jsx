import "./style.scss";
import { getAllProducts } from "../../../api/products";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FiFilter } from 'react-icons/fi';



export const CategorySection = ({ categoryFilter, brandFilter, priceFilter, showPriceRange }) => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([20, 37]);
  const [categoryClass, setCategoryClass] = useState('col-lg-3 order-1 order-lg-1 categories-filter')
  let categories = [];
  let brands = [];

  useEffect(() => {
    getAllProducts().then(res => {
      setProducts(res.data.products)
    })
  },[])
  

  products.forEach(product => {
    if (!categories.includes(product.productTag)) {
      categories.push(product.productTag)
    }

    if (!brands.includes(product.productBrand.trim())) {
      brands.push(product.productBrand)
    }
  })
    
  const allBrands = products.map(product => product.productBrand);

  const count = allBrands.reduce((aggr, val) => {
    if (aggr[val] === undefined) {
      aggr[val] = 1
    } else {
      aggr[val] += 1
    }
    return aggr
  },{})  

  const handleChange = (event, newValue) => {
    setPrice(newValue);
    priceFilter(price)
  };

  const clickHandler = () => {
    if (categoryClass.split(" ").includes("active")) {
      setCategoryClass('col-lg-3 order-1 order-lg-1 categories-filter')
    } else {
      setCategoryClass('col-lg-3 order-1 order-lg-1 categories-filter active')
    }
  }

  return (
    <div className={categoryClass}>
      <div className="filter-widget">
        <span className="btn-filter btn btn-outline-secondary" onClick={()=> clickHandler()}>Filter <FiFilter /></span>
        <h2 className="fw-title">Categories</h2>
        <ul className="category-menu">
          {categories.map((category, index) => {
            return(
              <li key={index + 'owl'}>
                <p onClick={(e) => categoryFilter(e)}>{category}</p>
              </li>              
            )
          })}
        </ul>
      </div>
      <div className="filter-widget mb-0">
        <h2 className="fw-title">refine by</h2>
        {/* price start */}
        {showPriceRange && 
        <div className="price-range-wrap">
          <h4>Price</h4>
          <Box sx={{ width: 250}}>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={price}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
            <div className="prices">
              <span>{price[0]} $</span>
              <span>{price[1]} $</span>
            </div>
          </Box>
        </div> }
        {/* price end */}
      </div>
      <div className="filter-widget mb-0">
        <h2 className="fw-title">color</h2>
        <div className="fw-color-choose">
          <div className="cs-item">
            <input type="radio" name="cs" id="gray-color" />
            <label className="cs-gray" htmlFor="gray-color">
              <span>(3)</span>
            </label>
          </div>
          <div className="cs-item">
            <input type="radio" name="cs" id="orange-color" />
            <label className="cs-orange" htmlFor="orange-color">
              <span>(25)</span>
            </label>
          </div>
          <div className="cs-item">
            <input type="radio" name="cs" id="yollow-color" />
            <label className="cs-yollow" htmlFor="yollow-color">
              <span>(112)</span>
            </label>
          </div>
          <div className="cs-item">
            <input type="radio" name="cs" id="green-color" />
            <label className="cs-green" htmlFor="green-color">
              <span>(75)</span>
            </label>
          </div>
          <div className="cs-item">
            <input type="radio" name="cs" id="purple-color" />
            <label className="cs-purple" htmlFor="purple-color">
              <span>(9)</span>
            </label>
          </div>
          <div className="cs-item">
            <input
              type="radio"
              name="cs"
              id="blue-color"
            />
            <label className="cs-blue" htmlFor="blue-color">
              <span>(29)</span>
            </label>
          </div>
        </div>
      </div>
      <div className="filter-widget mb-0">
        <h2 className="fw-title">Size</h2>
        <div className="fw-size-choose">
          <div className="sc-item">
            <input type="radio" name="sc" id="xs-size" />
            <label htmlFor="xs-size">XS</label>
          </div>
          <div className="sc-item">
            <input type="radio" name="sc" id="s-size" />
            <label htmlFor="s-size">S</label>
          </div>
          <div className="sc-item">
            <input
              type="radio"
              name="sc"
              id="m-size"
            />
            <label htmlFor="m-size">M</label>
          </div>
          <div className="sc-item">
            <input type="radio" name="sc" id="l-size" />
            <label htmlFor="l-size">L</label>
          </div>
          <div className="sc-item">
            <input type="radio" name="sc" id="xl-size" />
            <label htmlFor="xl-size">XL</label>
          </div>
          <div className="sc-item">
            <input type="radio" name="sc" id="xxl-size" />
            <label htmlFor="xxl-size">XXL</label>
          </div>
        </div>
      </div>
      <div className="filter-widget">
        <h2 className="fw-title">Brand</h2>
        <ul className="category-menu">
          {brands?.map((brand, index) => {
            return(
              <li key={brand + index}>
                <p onClick={(e) => brandFilter(e)}>{brand}<span>({count[brand]})</span></p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};
