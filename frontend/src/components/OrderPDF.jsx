import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useSelector } from "react-redux";

const OrderPDF = ({ orderData, orderQuantity, orderTotal }) => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  return (
    <PDFViewer style={styles.pdfViewer}>
      <Document>
        <Page size="A4">
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.companyName}>Code Space Indoneisa</Text>
              <Text style={styles.companyAddress}>Kota Malang, Jawa Timur</Text>
            </View>

            <Text style={styles.title}>Order Details</Text>

            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div>
                  <View style={styles.section}>
                    <Text style={styles.subtitle}>Customer Information :</Text>
                    <Text>Name  : {auth.name}</Text>
                    <Text>Email : {auth.email}</Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.subtitle}>Order Items :</Text>
                    <View key={cartItem._id} style={styles.item}>
                      <Text>Product  : {cartItem.name}</Text>
                      <Text>Price    : Rp.{cartItem.totalPrice}</Text>
                      <Text>Quantity : {cartItem.cartQuantity}</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.subtitle}>Order Summary :</Text>
                    <Text>Quantity : {cart.cartTotalQuantity}</Text>
                    <Text>Total    : Rp.{cart.cartTotalAmount}</Text>
                  </View>

                  <View style={styles.footer}>
                    <Text style={styles.gratitude}>Thank you for your order!</Text>
                    <Text style={styles.gratitude}>Check your email for more information!</Text>
                  </View>
                </div>
              ))
            }
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  pdfViewer: {
    height: 500, 
    width: 500,  
    margin: "auto",
  },
  container: {
    padding: 20,
    fontFamily: "Courier",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  companyAddress: {
    fontSize: 12,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    borderBottom: 2,
    paddingBottom: 10,
    fontFamily: "Courier",
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 15,
    fontFamily: "Courier",
  },
  orderItem: {
    marginBottom: 30,
  },
  item: {
    marginBottom: 15,
    border: 1,
    padding: 10,
  },
  footer: {
    position: "center",
    marginTop: 30,
    textAlign: "center",
    fontFamily: "Courier",
  },
  gratitude: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default OrderPDF;