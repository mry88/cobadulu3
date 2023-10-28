import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../slices/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import ModalImage from "react-modal-image";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    desc: "",
    price: 0,
    image: null,
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

  return (
    <div className="bg-gray-200 py-8 min-h-screen pt-32">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="rounded-lg overflow-hidden">
              {galleryType === "image" ? (
                <ModalImage
                  small={product.image?.url}
                  large={product.image?.url}
                  alt="product"
                  hideDownload={true}
                />
              ) : (
                <iframe
                  src={product.video}
                  title="product-video"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => toggleGallery("image")}
                className={`${
                  galleryType === "image"
                    ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-gray-100"
                    : "bg-gray-100"
                } py-2 px-4 rounded-lg border-2 border-gray-900 text-dark font-bold transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:text-gray-100`}
              >
                Image
              </button>
              <button
                onClick={() => toggleGallery("video")}
                className={`${
                  galleryType === "video"
                    ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-gray-100"
                    : "bg-gray-100"
                } text-dark py-2 px-4 rounded-lg border-2 border-gray-900 font-bold transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:text-gray-100`}
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
                  className="bg-gray-900 mt-4 w-full text-gray-100 px-6 py-3 rounded-lg border-2 border-gray-900 text-base font-bold transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:text-gray-100"
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

