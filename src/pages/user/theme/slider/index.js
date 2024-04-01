import slide1 from "assets/user/image/categories/Banner1.webp";
import slide2 from "assets/user/image/categories/Banner2.webp";
import slide3 from "assets/user/image/categories/Banner3.webp";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.scss";

const spanStyle = {
  padding: "20px",
  color: "#000000",
  opacity: "0.5",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
  width: "850px",
};
const slideImages = [
  {
    url: slide1,
  },
  {
    url: slide2,
  },
  {
    url: slide3,
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide className>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
