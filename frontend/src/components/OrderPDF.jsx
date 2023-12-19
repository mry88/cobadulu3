import React, { useEffect } from "react";
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
              <Text style={styles.companyName}>YOUR COMPANY</Text>
              <Text style={styles.companyAddress}>1234 Your Street
                {'\n'}City, California
                {'\n'}90210
                {'\n'}United States
                {'\n'}1-888-123-4567</Text>
            </View>

            <View style={styles.containerBilledTo}>
              <View style={[styles.invoiceInfo, { marginLeft: 0 }]}>
                <Text style={styles.titleInfo}>Billed To</Text>
                <Text style={styles.descInfo}>lorem ipsum
                  {'\n'}1234 Your Street
                  {'\n'}City, California
                  {'\n'}90210
                  {'\n'}United States
                  {'\n'}1-888-123-4567
                </Text>
              </View>
              <View>
                <View style={styles.containerInvoiceInfo}>
                  <View style={styles.invoiceInfo}>
                    <Text style={styles.titleInfo}>Date Issued</Text>
                    <Text style={styles.descInfo}>lorem ipsum</Text>
                  </View>
                  <View style={styles.invoiceInfo}>
                    <Text style={styles.titleInfo}>Invoice Number</Text>
                    <Text style={styles.descInfo}>lorem ipsum</Text>
                  </View>
                  <View style={styles.invoiceInfo}>
                    <Text style={styles.titleInfo}>Amount Due</Text>
                    <Text style={styles.descInfo}>lorem ipsum</Text>
                  </View>
                </View>
                <View style={styles.containerInvoiceInfo}>
                  <View style={styles.invoiceInfo}>
                    <Text style={styles.titleInfo}>Due Date</Text>
                    <Text style={styles.descInfo}>lorem ipsum</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.purpleSeparator} />

            <View style={styles.containerCart}>
              <Text style={[styles.titleInfo, { flex: 3, textAlign: 'left' }]}>DESCRIPTION</Text>
              <Text style={[styles.titleInfo, { flex: 1 }]}>RATE</Text>
              <Text style={[styles.titleInfo, { flex: 1 }]}>QTY</Text>
              <Text style={[styles.titleInfo, { flex: 2 }]}>AMOUNT</Text>
            </View>

            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <View style={styles.containerCart}>
                  <View style={{ flexDirection: 'column', flex: 3, textAlign: 'left' }}>
                    <Text style={[styles.titleInfo, { color: '#5a5459' }]}>{cartItem.name}</Text>
                    <Text style={styles.descInfo}>{cartItem.selectedFeatures.join(', ')}</Text>
                  </View>
                  <Text style={[styles.descInfo, { flex: 1 }]}>Rp.{cartItem.totalPrice}</Text>
                  <Text style={[styles.descInfo, { flex: 1 }]}>{cartItem.cartQuantity}</Text>
                  <Text style={[styles.descInfo, { flex: 2 }]}>Rp.{cartItem.totalPrice * cartItem.cartQuantity}</Text>
                </View>
              ))
            }


            <View style={styles.containerSummary}>
              <View style={styles.itemSummary}>
                <Text style={styles.descInfo}>Quantity</Text>
                <Text style={styles.descInfo}>{cart.cartTotalQuantity}</Text>
              </View>
              <View style={styles.itemSummary}>
                <Text style={styles.descInfo}>Total</Text>
                <Text style={styles.descInfo}>Rp.{cart.cartTotalAmount}</Text>
              </View>
            </View>

          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.titleInfo}>Notes</Text>
            <Text style={styles.descInfo}>Thank you for your bussines!</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.titleInfo}>Terms</Text>
            <Text style={styles.descInfo}>Please pay within 30 days using the link in your invoice email</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};


const styles = StyleSheet.create({
  itemSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150
  },
  containerSummary: {
    alignItems: 'flex-end',
  },
  containerCart: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 12,
    textAlign: 'right'
  },
  purpleSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: '#4556d3',
  },
  grayeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  pdfViewer: {
    height: 800,
    width: 800,
    margin: "auto",
  },
  container: {
    padding: 20,
  },
  containerBilledTo: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },
  containerInvoiceInfo: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  invoiceInfo: {
    marginLeft: 16
  },
  titleInfo: {
    fontSize: 10,
    color: '#4556d3',
    marginBottom: 4
  },
  descInfo: {
    fontSize: 10,
    color: '#5a5459',
    lineHeight: 1.5
  },
  header: {
    marginBottom: 20,
    alignItems: 'flex-end'
  },
  companyName: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: 'right'
  },
  companyAddress: {
    fontSize: 10,
    textAlign: 'right',
    color: '#5a5459',
    lineHeight: 1.5
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    borderBottom: 2,
    paddingBottom: 10,
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
    marginTop: 32,
  },
  gratitude: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default OrderPDF;