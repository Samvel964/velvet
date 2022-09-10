import { useState } from "react";
import "./style.scss";

import ReactImageZoom from 'react-image-zoom';


export const ProductPicZoom = ({images}) => {
  const [imgNum, setImgNum] = useState(0);
  const [zoom, setZoom] = useState(false)

  return (
    <div className="col-lg-6">
      <div className="product-pic-zoom">
        { zoom && images 
        ?
        <div 
          onClick={() => setZoom(!zoom)} 
          title="Click to minmize"
          className="zoom-div"
          style={{cursor:'zoom-out'}}      
        >
          <ReactImageZoom img={images[imgNum]?.url} zoomPosition={'original'} /></div> 
        :
        <img
          src={images && images[imgNum]?.url}
          alt="image"
          title="Click to zoom"
          onClick={() => setZoom(!zoom)}
          style={{cursor: 'zoom-in'}}
        />
        }
      </div>
      <div
        className="product-thumbs"
        tabIndex="1"
        style={{ overflow: "hidden", outline: "none" }}
      >
        <div className="product-thumbs-track">
          {images?.map((image, index) => {
            return(
              <div 
                className="pt AllProducts" 
                data-imgbigurl="img/single-product/1.jpg"
                key={index + image._id}
                onClick={() => setImgNum(index)}
              >
                <img src={image?.url} alt="thumbs" />
              </div>
             )
             })}
        </div>
      </div>
    </div>
  );
};
