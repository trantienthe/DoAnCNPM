import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss';

const Slider = () => {
  return (
    <>
        <div className="hero_item">
            <div className="hero_item_text">
                <span>Mang lại niềm tin cho khách hàng</span>
                <h2>
                    AN TÂM <br />
                    100%
                </h2>
                <p>Miễn phí giao hàng tận nơi.</p>
                <Link to="#" className="primary-btn">
                    Mua ngay
                </Link>
            </div>
        </div>
    </>
  )
}

export default Slider;