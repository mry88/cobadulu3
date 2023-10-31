import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../slices/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import ModalImage from "react-modal-image";
import Slider from "react-slick";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: data } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    desc: "",
    price: 0,
    image: null,
    image2: null,
    image3: null,
    features: [],
    video: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedFeaturePrice, setSelectedFeaturePrice] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [galleryType, setGalleryType] = useState("image"); // Menyimpan tipe galeri yang aktif (image atau video)
  const [hoveredFeature, setHoveredFeature] = useState(null); // Menyimpan fitur yang sedang dihover
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/products/find/${params.id}`);
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = (product, selectedFeatures) => {
    let selectedFeaturePrice = 0;
    selectedFeatures.forEach((featureName) => {
      const feature = product.features.find((f) => f.name === featureName);
      if (feature) {
        selectedFeaturePrice += parseFloat(feature.price);
      }
    });

    const productWithFeatures = {
      ...product,
      selectedFeatures: selectedFeatures,
      selectedFeaturePrice: selectedFeaturePrice,
    };
    dispatch(addToCart(productWithFeatures));
    navigate("/cart");
  };

  const handleFeatureChange = (e, featureName) => {
    const featurePrice = parseFloat(e.target.value);
    if (e.target.checked) {
      setSelectedFeaturePrice((prevPrice) => prevPrice + featurePrice);
      setSelectedFeatures((prevFeatures) => [...prevFeatures, featureName]);
    } else {
      setSelectedFeaturePrice((prevPrice) => prevPrice - featurePrice);
      setSelectedFeatures((prevFeatures) =>
        prevFeatures.filter((fn) => fn !== featureName)
      );
    }
  };

  const toggleGallery = (type) => {
    setGalleryType(type);
  };

  const handleFeatureHover = (featureName) => {
    setHoveredFeature(featureName);
  };

  const handleFeatureLeave = () => {
    setHoveredFeature(null);
  };

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

  const imageSlider = [
    {
      id: 1,
      image: product.image,
    },
    {
      id: 2,
      image: product.image2,
    },
    {
      id: 3,
      image: product.image3,
    },
  ];

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
    <div className="flex bg-gray-200 min-h-screen pt-[80px] items-center justify-center">
      <div className="rounded-lg flex container p-8 bg-gray-100 w-[650px] h-[100%] my-[20px] shadow-xl">
        <div className="flex flex-col w-[600px] h-[100%]">
          <div>
            <div className="rounded-lg shadow-xl">
              {galleryType === "image" ? (
                // <ModalImage
                //   className="rounded-lg w-[100%] h-[400px]"
                //   small={product.image?.url}
                //   large={product.image?.url}
                //   alt="product"
                //   hideDownload={true}
                // />
                <Slider {...carouselSettings} autoplay className="rounded-lg w-[586px] h-[400px]">
                  {imageSlider.map((product) => (
                    <div key={product.id} className="rounded-lg w-[100%] h-[400px]">
                      <img src={product.image?product.image.url:"#"} alt={product.id} style={{
                        height: 400
                      }} className="rounded-lg w-[586px] h-[400px] object-cover" />
                    </div>
                  ))}
                </Slider>
              ) : (
                <iframe
                  className="rounded-lg w-[100%] h-[400px]"
                  src={product.video}
                  title="product-video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="my-4 flex justify-center space-x-4">
              <button
                onClick={() => toggleGallery("image")}
                className={`${galleryType === "image"
                  ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-gray-100"
                  : "bg-gray-100"
                  } py-2 px-4 rounded-lg text-dark font-bold transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:text-gray-100 shadow-xl`}
              >
                Image
              </button>
              <button
                onClick={() => toggleGallery("video")}
                className={`${galleryType === "video"
                  ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-gray-100"
                  : "bg-gray-100"
                  } text-dark py-2 px-4 rounded-lg font-bold transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:text-gray-100 shadow-xl`}
              >
                Video
              </button>
            </div>
          </div>
          <div>
            {loading ? (
              <p className="text-center text-2xl">Loading...</p>
            ) : (
              <>
                <h2 className="text-3xl font-semibold">{product.name}</h2>
                <p className="text-lg font-bold mt-2">
                  Category: {product.category.name}
                </p>
                <p className="text-lg mt-2">
                  Description:{" "}
                  {product.desc.split(" ").length > 50
                    ? product.desc.split(" ").slice(0, 50).join(" ") + " ..."
                    : product.desc}
                </p>
                <p className="text-3xl font-bold mt-4">
                  Price Basic: Rp.{product.price}
                </p>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    Add Features:
                  </h3>
                  {product.features.map((feature) => (
                    <label
                      key={feature.name}
                      className="flex items-center text-lg mb-2 relative"
                    >
                      <input
                        type="checkbox"
                        name={feature.name}
                        value={feature.price}
                        onChange={(e) => handleFeatureChange(e, feature.name)}
                        className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-900 rounded focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-100"
                      />
                      {feature.name} (Rp.{feature.price})
                      {hoveredFeature === feature.name && (
                        <FeatureDescription description={feature.description} />
                      )}
                    </label>
                  ))}
                </div>
                <p className="text-3xl font-bold mt-4">
                  Total: Rp.{product.price + selectedFeaturePrice}
                </p>
                <button
                  onClick={() => handleAddToCart(product, selectedFeatures)}
                  className="bg-gray-900 mt-4 w-full text-gray-100 px-6 py-3 rounded-lg text-base font-bold transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:text-gray-100 shadow-xl"
                >
                  Add To Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

const StyledProduct = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  background-color: #fff;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const GalleryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const GalleryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const GalleryButton = styled.button`
  background-color: ${(props) => (props.active ? "#0070f3" : "#ddd")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-size: 24px;
  font-weight: bold;
  border: none;
  padding: 8px 12px;
  border-radius: 50px;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#ddd")};
  }
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`;

const ProductName = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProductCategory = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
  max-width: 600px;
  text-align: justify;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const TotalPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const ProductVideo = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeatureLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 0.5rem;
  position: relative;
`;

const FeatureCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const FeatureDescription = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1;
  display: none;
  pointer-events: none;
  transition: opacity 0.3s;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 1rem;
`;

