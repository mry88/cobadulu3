import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../slices/api";
import OrderPDF from "./OrderPDF";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState("");
  const [orderId, setOrderId] = useState("");
  const orderIdRef = useRef(orderId);
  const [showPDF, setShowPDF] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    orderIdRef.current = orderId;
  }, [orderId]);

  useEffect(() => {
    dispatch(getTotals());

  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const openPDFModal = () => {
    setShowPDF(true);
  };
  const closePDFModal = () => {
    setShowPDF(false);
  };

  const handleCheckout = async (items) => {
    //console.log(items);
    try {
      const pId = items.map((i) => (i._id));
      const pName = items.map((i) => (i.name));
      const pCategory = items.map((i) => (i.category.name));
      const pFeatures = items.map((i) => (i.features));
      const pQuantity = items.map((i) => (i.cartQuantity));
      const pTotal = items.map((i) => (i.totalPrice));

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const { data } = await axios.post(`${url}/orders`, {
        userId: auth._id,
        userName: auth.name,
        userEmail: auth.email,
        userPhone: auth.nohp,
        userAddress: auth.address,
        productsId: pId,
        products: pName,
        pCategory: pCategory,
        pQuantity: pQuantity,
        selectedFeatures: pFeatures,
        total: pTotal,
      }, config);

      setToken(data.token);
      setOrderId(data.oId);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSuccessfulPayment = async (id) => {
    try {
      const response = await axios.put(`${url}/orders/${id}`, {
        payment_status: "paid", // Set the desired payment status here
      });

      if (response.status === 200) {
        // Payment status updated successfully
        console.log('update success');
      } else {
        // Handle the case where the update failed
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          const id = orderIdRef.current;
          handleSuccessfulPayment(id);
          setToken("");
          dispatch(clearCart());
          console.log('Transaction was successful:', result);
        },
        onPending: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
          dispatch(clearCart());
          console.log('Transaction is pending:', result);
        },
        onError: (result) => {
          console.log('Transaction had an error:', result);
          setToken("");
        },
        onClose: () => {
          console.log('User closed the popup without finishing the payment');
          setToken("");
        }
      });
    }
  }, [token]);

  useEffect(() => {
    // url masih sandbox
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-YsLvrX16dputBRg8";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  return (
    <div className="flex cart-container pt-[80px] bg-gray-200 text-dark min-h-screen items-center justify-center">
      <div className="rounded-lg p-8 mt-[50px] flex flex-col bg-gray-100 w-[900px] h-[100%] shadow-xl">
        <h2 className="text-lg font-sans">Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div className="cart-item" key={cartItem._id}>
                    <div className="cart-product">
                      <Link to={"/product/" + cartItem._id}>
                        <img className="w-[100px] h-[100px] object-cover" src={cartItem.image?.url} alt={cartItem.name} />
                      </Link>
                      <div>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.desc.split(' ').length > 6
                          ? cartItem.desc.split(' ').slice(0, 6).join(' ') + ' ...'
                          : cartItem.desc}</p><br />
                        <h3>Additional Feature :</h3>
                        {cartItem.selectedFeatures && cartItem.selectedFeatures.map(fn => (
                          <p key={fn}>{fn}</p>
                        ))}
                        <button onClick={() => handleRemoveFromCart(cartItem)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">Rp.{cartItem.totalPrice}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecreaseCart(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={() => handleAddToCart(cartItem)}>+</button>
                    </div>
                    <div className="cart-product-total-price">
                      Rp.{cartItem.totalPrice * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-bold text-dark transition duration-200 hover:bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:text-gray-100 shadow-xl" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="w-[200px] h-[200px] flex-row items-center justify-center ml-[250px]">
                <div className="flex items-center justify-center">
                  <a href="https://api.whatsapp.com/send?phone=6289653737046" target="_blank">
                    <img src={require("../Assets/Images/qrWa.jpeg")} alt="whatsapp" className="flex w-[150px]" />
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <h3 className="flex text-lg">Scan here to chat</h3>
                </div>
              </div>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">Rp.{cart.cartTotalAmount}</span>
                </div>
                {auth._id ? (
                  <>
                    <p>Continue to Checkout</p>
                    {showPDF ? (
                      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-xl"
                        onClick={closePDFModal}>Back to Cart</button>
                    ) : (
                      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-xl"
                        onClick={openPDFModal}>Download Order PDF</button>
                    )}
                    <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-xl"
                      onClick={() => handleCheckout(cart.cartItems)}>Proceed to Checkout</button>
                  </>
                  // <PayButton cartItems={cart.cartItems} />
                  // <button onClick={() => handleCheckout(cart.cartItems)}>Check out</button>
                ) : (
                  <button
                    className="mt-2 text-dark bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-xl"
                    onClick={() => navigate("/login")}
                  >
                    Login to Check out
                  </button>
                )}

                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <Dialog
          open={showPDF}
          onClose={closePDFModal}
          aria-labelledby="order-pdf-dialog-title"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="order-pdf-dialog-title">Order PDF</DialogTitle>
          <DialogContent>
            {/* Render the PDF component here */}
            <OrderPDF orderData={cart.cartItems} />
          </DialogContent>
          <DialogActions>
            <Button onClick={closePDFModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Cart;
