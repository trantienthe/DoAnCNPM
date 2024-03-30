import { memo } from "react";
import "./style.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import nhomongtayImg1 from "assets/user/image/categories/Banner1.webp";
import nhomongtayImg2 from "assets/user/image/categories/Banner2.webp";
import nhomongtayImg3 from "assets/user/image/categories/Banner3.webp";
import nhonamphiImg1 from "assets/user/image/categories/Banner4.webp";
import nhonamphiImg2 from "assets/user/image/categories/Banner1.webp";
import featured1 from "assets/user/image/categories/Banner1.webp";
import featured2 from "assets/user/image/categories/Banner2.webp";
import featured3 from "assets/user/image/categories/Banner1.webp";
import featured4 from "assets/user/image/categories/Banner2.webp";
import featured5 from "assets/user/image/categories/Banner1.webp";
import { render } from "@testing-library/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AiOutlineEye, AiOutlineIdcard, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formater } from "utils/fomater";


const HomePage = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const sliderItems = [
        {
            bgImg: nhomongtayImg1,
            name: "Sản phẩm 1",
        },
        {
            bgImg: nhonamphiImg1,
            name: "Sản phẩm 2",
        },
        {
            bgImg: nhomongtayImg2,
            name: "Sản phẩm 3",
        },
        {
            bgImg: nhonamphiImg2,
            name: "Sản phẩm 4",
        },
        {
            bgImg: nhomongtayImg3,
            name: "Sản phẩm 5",
        },
        {
            bgImg: nhomongtayImg3,
            name: "Sản phẩm 6",
        },
    ];

    const featProducts = {
        all: {
            title: "Toàn bộ",
            products: [
                {
                    img: featured1,
                    name: "PANADOL",
                    price: 15900,
                },
                {
                    img: featured2,
                    name: "Thuốc nhỏ mắt",
                    price: 7500,
                },
                {
                    img: featured3,
                    name: "Thuốc đau đầu",
                    price: 10500,
                },
                {
                    img: featured4,
                    name: "Thuốc ho",
                    price: 6900,
                },
                {
                    img: featured5,
                    name: "Thuốc cảm",
                    price: 32500,
                },
                {
                    img: featured1,
                    name: "Thuốc tiêu chảy",
                    price: 17900,
                },
                {
                    img: featured2,
                    name: "Thuốc tiêu hóa",
                    price: 8500,
                },
                {
                    img: featured3,
                    name: "thuốc xổ",
                    price: 9500,
                }
            ],
        },

        freshMeat: {
            title: "Đau đầu",
            products: [
                {
                    img: featured5,
                    name: "Thuốc panadol",
                    price: 32500,
                },
            ],
        },
        fruist: {
            title: "Nhỏ mắt",
            products: [
                {
                    img: featured2,
                    name: "Thuốc đau đầu",
                    price: 7500,
                },
            ],
        },
        fastFood: {
            title: "Hỗ trợ",
            products: [
                {
                    img: featured4,
                    name: "Sửa vinamik",
                    price: 6900,
                },
                {
                    img: featured4,
                    name: "Sửa vinamik",
                    price: 5900,
                },
            ],
        },
    };

    const renderFeaturedProducts = (data) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(data).forEach((key, index) => {
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);

            const tabPanel = [];
            data[key].products.forEach((item, j) => {
                tabPanel.push(
                    <div className="col-lg-3" key={j}>
                        <div className="featured_item">
                            <div
                                className="featured_item_pic"
                                style={{
                                    background: `url(${item.img})`
                                }}>

                                <ul className="featured_item_pic_hover">
                                    <li>
                                        <AiOutlineEye />
                                    </li>
                                    <li>
                                        <AiOutlineShoppingCart />
                                    </li>
                                </ul>
                            </div>
                            <div className="featured_item_text">
                                <h6>
                                    <Link to="">{item.name}</Link>
                                </h6>
                                <h5>
                                    {formater(item.price)}
                                </h5>
                            </div>
                        </div>
                    </div>
                );
            })
            tabPanels.push(tabPanel);
        });


        return (
            <Tabs>
                <TabList>{tabList}</TabList>

                {tabPanels.map((item, key) => (
                    <TabPanel key={key}>
                        <div className="row">{item}</div>
                    </TabPanel>
                ))}
            </Tabs>
        );
    }


    return (
        <>
            {/*Categories Begin*/}
            <div className="container container_categories_slider">
                <Carousel responsive={responsive} className="container_slider">
                    {sliderItems.map((item, key) => (
                        <div
                            className="container_slider_item"
                            style={{ backgroundImage: `url(${item.bgImg})` }}
                        >
                            <p>{item.name}</p>
                        </div>
                    ))}
                </Carousel>
            </div >

            {/*Categories End*/}

            {/*Featured Begin*/}
            <div className="container">
                <div className="featured">
                    <div className="section-title">
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                    {renderFeaturedProducts(featProducts)}
                </div>
            </div>
            {/*Featured End*/}

            {/*Banner Begin*/}
            <div className="container">
                <div className="banner">
                    <div className="banner_pic">
                        <img src={nhomongtayImg1} alt="banner1" />
                    </div>
                    <div className="banner_pic">
                        <img src={nhomongtayImg1} alt="banner2" />
                    </div>
                </div>
            </div>
            {/*Banner End*/}

        </>
    );
};

export default memo(HomePage);