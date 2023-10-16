import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faCar, faHome, faCode, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button onClick={onClick} type="button" className="z-0 absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button onClick={onClick} type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
  );
}

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.category);
  const scrollButtonRef = useRef();

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (scrollButtonRef.current) {
        if (window.scrollY > 200) {
          scrollButtonRef.current.style.display = "block";
        } else {
          scrollButtonRef.current.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const categoryIcons = {
    "All" : faLayerGroup,
    "Website": faCode,
    "Mobile": faMicrochip,
    "Automobile": faCar,
    "Home": faHome,
  };

  // Sort the products by a date field (e.g., createdAt) to display the latest first
  const sortedProducts = [...data].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const filteredProducts = sortedProducts.filter((product) => {
    // Filter by category name
    if (selectedCategory && product.category.name !== selectedCategory) {
      return false;
    }

    // Filter by search text
    if (searchText && !product.name.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Settings for the slick carousel
  const carouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="bg-neutral-800 font-roboto flex h-full w-full min-h-screen overflow-y-auto pt-16">
      <div className={`flex-grow overflow-y-auto ml-20 mr-20`}>
        {/* Product List Section */}
        {/* <h2 className="text-white font-roboto text-4xl mb-3 mt-3 text-center">Product List</h2> */}
        <div className="relative mb-4 flex px-4 py-1.5 border-2 border-white/20 rounded-lg w-full items-center mt-12">
          <svg
            className="w-[18px] h-[18px] text-white mr-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          {/* Add search input */}
          <input
            type="text"
            placeholder="Search Products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex w-full border-0 border border-white/50 text-white/90 outline-none bg-neutral-800"
          />
        </div>

        {/* Latest Products Section as a Slick Carousel */}
        <div className="mb-8">
          {/* <h2 className="text-white font-roboto text-4xl mb-3 mt-3 text-center">Latest Products</h2> */}
          <Slider {...carouselSettings} autoplay>
            {status === "success" ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="">
                  <Link to={"/product/" + product._id}>
                    <img src={product.image.url} alt={product.name} style={{
                      height: 350
                    }} className="w-full object-cover rounded-lg" />
                  </Link>
                  {/* <div className="p-4"> */}
                  {/* <h3 className="text-white font-bold text-2xl pb-2">{product.name}</h3> */}
                  {/* Display category name below product name */}
                  {/* <p className="text-white text-sm font-medium">{product.category.name}</p>
                    <p className="text-white text-xl font-bold mt-1">$ {product.price}</p>
                    <Link to={"/product/" + product._id}>
                      <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:w-32 md:w-40 lg:w-48 xl:w-56">View Detail</button>
                    </Link> */}
                  {/* </div> */}
                </div>
              ))
            ) : status === "pending" ? (
              <p className="text-white">Loading...</p>
            ) : (
              <p className="text-white">Unexpected error occurred...</p>
            )}
          </Slider>
        </div>

        {/* Add category filter as Category Boxes with Icons */}
        <div className="mb-8 flex flex-wrap gap-2 content-center justify-center">
          <button
            onClick={() => setSelectedCategory("")}
            className={`border border-white/50 text-white/90 px-4 py-2 flex items-center rounded-full ${selectedCategory === "" ? "" : ""
              } hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600`}
          >
            <FontAwesomeIcon icon={categoryIcons['All']} className="mr-2" />
            All Categories
          </button>
          {items.map((category) => (
            <div>
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center rounded-full border border-white/50 text-white/90 px-4 py-2 ${selectedCategory === category.name ? "" : ""
                  } hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600`}
              >
                {/* <img src={require('../Assets/Images/cat1.png')} className="h-14" /> */}
                <FontAwesomeIcon icon={categoryIcons[category.name]} className="mr-2" />
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {status === "success" ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="flex flex-col bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
                <Link to={"/product/" + product._id}>
                  <img src={product.image.url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                </Link>
                <div className="flex flex-col grow p-4">
                  <h3 className="text-gray-300 font-bold text-2xl pb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm font-medium">{product.category.name}</p>
                  <p className="text-gray-100 text-xl font-bold mt-1">Rp. {product.price}</p>
                </div>
                <div className="px-2 pb-2">
                  <Link to={"/product/" + product._id}>
                    <button className="w-full rounded-lg border-2 border-navy-700 px-5 py-2 text-base font-medium text-navy-700 transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 border-white/20 bg-white/5 text-white hover:bg-white/10 active:bg-white/20">
                      View Detail
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : status === "pending" ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <p className="text-gray-400">Unexpected error occurred...</p>
          )}
        </div>

      </div>
      <button
        ref={scrollButtonRef}
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-gray-100 text-white px-4 py-4 rounded-full focus:outline-none hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 focus:ring-4 focus:ring-gray-200"
      >
        <svg class="w-[18px] h-[18px] text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
        </svg>
      </button>
    </div>
  );
};

export default Home;

const asdasd = {

}