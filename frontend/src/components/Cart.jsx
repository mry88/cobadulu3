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
    <div className="cart-container mt-16">
      <h2>Shopping Cart</h2>
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
                      <p>{cartItem.desc.split(' ').length > 10
                        ? cartItem.desc.split(' ').slice(0, 10).join(' ') + ' ...'
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
                  <div className="cart-product-price">${cartItem.totalPrice}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.totalPrice * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Download PDF</p>
              {auth._id ? (
                <>
                  {showPDF ? (
                    <button onClick={closePDFModal}>Back to Cart</button>
                  ) : (
                    <button onClick={openPDFModal}>Download Order PDF</button>
                  )}
                  <p>Continue to Checkout</p>
                  <button onClick={() => handleCheckout(cart.cartItems)}>Proceed to Checkout</button>
                </>
                // <PayButton cartItems={cart.cartItems} />
                // <button onClick={() => handleCheckout(cart.cartItems)}>Check out</button>
              ) : (
                <button
                  className="cart-login"
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
  );
};

export default Cart;
