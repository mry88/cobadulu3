import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDelete, productFetch } from "../../slices/productsSlice";
import { useEffect } from "react";
import { setHeaders, url } from "../../slices/api";

export default function DeleteProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { prodId } = useParams();
    const { deleteStatus } = useSelector((state) => state.products);

    const handleDelete = async () => {
        dispatch(productDelete(prodId));
        navigate("/admin/products");
    };

    return (
        <DeleteContainer>
            <DeleteForm>
                <h2>Hapus Data?</h2>
                <PrimaryButton onClick={handleDelete}>
                    {deleteStatus === "pending" ? "Submitting" : "Hapus"}
                </PrimaryButton>
                <PrimaryButton onClick={() => navigate("/admin/products")}>
                    Batal
                </PrimaryButton>
            </DeleteForm>
        </DeleteContainer>
    );
}

const DeleteContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DeleteForm = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
`;
