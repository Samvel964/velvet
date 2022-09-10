import "./style.scss";
import { AccordionInfo } from "../../../components/Accordion";
import { FaGooglePlusG } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ProductDetails = ({ product }) => {
  let [quantity, setQuantity] = useState(1);

  if (quantity < 1) {
    quantity = 1
  }

  return (
    <div className="col-lg-6 product-details">
      <h2 className="p-title">{product?.productTitle}</h2>
      <h3 className="p-price">${product?.productPrice}.00</h3>
      <h4 className="p-stock">
        Available: <span>In Stock</span>
      </h4>
      <div className="p-review">
        <span>3 reviews</span>|<span>Add your review</span>
      </div>
      <div className="fw-size-choose">
        <p>Size</p>
        <div className="sc-item">
          <input type="radio" name="sc" id="xs-size" />
          <label htmlFor="xs-size">32</label>
        </div>
        <div className="sc-item">
          <input type="radio" name="sc" id="s-size" />
          <label htmlFor="s-size">34</label>
        </div>
        <div className="sc-item">
          <input
            type="radio"
            name="sc"
            id="m-size"
          />
          <label htmlFor="m-size">36</label>
        </div>
        <div className="sc-item">
          <input type="radio" name="sc" id="l-size" />
          <label htmlFor="l-size">38</label>
        </div>
        <div className="sc-item ">
          <input type="radio" name="sc" id="xl-size" />
          <label htmlFor="xl-size">40</label>
        </div>
        <div className="sc-item">
          <input type="radio" name="sc" id="xxl-size" />
          <label htmlFor="xxl-size">42</label>
        </div>
      </div>
      <div className="quantity">
        <p>Quantity</p>
        <div className="pro-qty">
          <span className="qtybtn" onClick={() => setQuantity(quantity - 1)}>-</span>
          <span type="text">{quantity}</span>
          <span className="qtybtn" onClick={() => setQuantity(quantity + 1)}>+</span>
        </div>
      </div>
      <Link to="/cart" className="site-btn">
        SHOP NOW
      </Link>
      <AccordionInfo  description={product?.productDescription}/>
      <div className="social-sharing">
        <a href="#">
          <FaGooglePlusG />
        </a>
        <a href="#">
          <FaPinterest />
        </a>
        <a href="#">
          <FaFacebookF />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <a href="#">
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};
