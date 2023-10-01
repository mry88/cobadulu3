import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryDelete, categoryFetch } from "../../slices/categorySlice";
import { useEffect } from "react";
import { setHeaders, url } from "../../slices/api";

export default function DeleteCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { catId } = useParams();
    const { deleteStatus } = useSelector((state) => state.category);

    const handleDelete = async () => {
        dispatch(categoryDelete(catId));
        navigate("/admin/category");
    };

    return (
        <DeleteContainer>
            <DeleteForm>
                <h2>Hapus Data?</h2>
                <PrimaryButton onClick={handleDelete}>
                    {deleteStatus === "pending" ? "Submitting" : "Hapus"}
                </PrimaryButton>
                <PrimaryButton onClick={() => navigate("/admin/category")}>
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

const DeleteOk = styled.button`
    
`;

const DeleteNo = styled.button`
    
`;