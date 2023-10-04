import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faUtensils, faCar, faHome } from "@fortawesome/free-solid-svg-icons";

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
    "Food": faUtensils,
    "Drink": faCoffee,
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
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600 font-roboto flex h-full w-full min-h-screen overflow-y-auto pt-16">
      <div className={`flex-grow overflow-y-auto ml-20 mr-20`}>
        {/* Product List Section */}
        <h2 className="text-white font-roboto text-4xl mb-3 mt-3 text-center">Product List</h2>

        {/* Add search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg w-full"
          />
        </div>

        {/* Add category filter as Category Boxes with Icons */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`bg-white text-gray-800 px-4 py-2 rounded-lg ${
              selectedCategory === "" ? "bg-blue-200" : ""
            }`}
          >
            <FontAwesomeIcon icon={faCoffee} className="mr-2" /> All Categories
          </button>
          {items.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.name)}
              className={`bg-white text-gray-800 px-4 py-2 rounded-lg ${
                selectedCategory === category.name ? "bg-blue-200" : ""
              }`}
            >
              <FontAwesomeIcon icon={categoryIcons[category.name]} className="mr-2" /> {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-4 gap-4">
          {status === "success" ? (
            <>
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white border border-black shadow-lg rounded-lg">
                  <Link to={"/product/" + product._id}>
                    <img src={product.image.url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-bold text-2xl pb-2">{product.name}</h3>
                    {/* Display category name below product name */}
                    <p className="text-gray-800 text-sm font-medium">{product.category.name}</p>
                    <p className="text-gray-800 text-xl font-bold mt-1">$ {product.price}</p>
                    <Link to={"/product/" + product._id}>
                      <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:w-32 md:w-40 lg:w-48 xl:w-56">View Detail</button>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : status === "pending" ? (
            <p className="text-white">Loading...</p>
          ) : (
            <p className="text-white">Unexpected error occurred...</p>
          )}
        </div>

        {/* Latest Products Section as a Slick Carousel */}
        <div className="mb-4 ml-10 mr-10">
          <h2 className="text-white font-roboto text-4xl mb-3 mt-3 text-center">Latest Products</h2>
          <Slider {...carouselSettings}>
            {status === "success" ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="bg-white border border-black shadow-lg rounded-lg ml-4">
                  <Link to={"/product/" + product._id}>
                    <img src={product.image.url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-bold text-2xl pb-2">{product.name}</h3>
                    {/* Display category name below product name */}
                    <p className="text-gray-800 text-sm font-medium">{product.category.name}</p>
                    <p className="text-gray-800 text-xl font-bold mt-1">$ {product.price}</p>
                    <Link to={"/product/" + product._id}>
                      <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:w-32 md:w-40 lg:w-48 xl:w-56">View Detail</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : status === "pending" ? (
              <p className="text-white">Loading...</p>
            ) : (
              <p className="text-white">Unexpected error occurred...</p>
            )}
          </Slider>
        </div>
      </div>
      <button
        ref={scrollButtonRef}
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-red-600 text-white px-4 py-2 rounded-full border border-gray-300 focus:outline-none hover:bg-red-700 focus:ring-4 focus:ring-gray-200"
      >
        Back to Top
      </button>
    </div>
  );
};

export default Home;
