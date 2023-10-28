import styled from "styled-components";
import { useEffect, useState } from "react";
import { setHeaders, url } from "../../../slices/api";
import axios from "axios";
import moment from "moment";

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <StyledTransactions>
      {isLoading ? (
        <p>Transctions loading...</p>
      ) : (
        <>
          <h3>Latest Transactions</h3>
          {orders?.map((order, index) => (
            <Transaction key={index}>
              <p>{order.shipping?.name}</p>
              <p>Rp. {(order.total / 100).toLocaleString()}</p>
              <p>{moment(order.createdAt).fromNow()}</p>
            </Transaction>
          ))}
        </>
      )}
    </StyledTransactions>
  );
};

export default Transactions;

const StyledTransactions = styled.div`
background: rgb(44,185,120);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;

const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgba(9, 155, 43, 0.70);

  p {
    flex: 1;
  }

  &:nth-child(even) {
    background: rgba(9, 154, 151, 0.70);
  }
`;
