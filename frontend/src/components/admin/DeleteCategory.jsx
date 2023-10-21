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
        <div className="flex justify-center mt-32 text-white">
            <DeleteForm>
                <h2 className="flex self-center mb-4">Hapus Data?</h2>
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={handleDelete}>
                    {deleteStatus === "pending" ? "Submitting" : "Hapus"}
                </button>
                <button className="mt-2 rounded-lg border-2 px-4 py-1.5 mr-2 text-sm font-medium text-navy-700 transition duration-200 hover:text-black active:bg-navy-900/5 border-white/20 bg-white/5 text-white hover:bg-white active:bg-white/20"
                    onClick={() => navigate("/admin/category")}>
                    Batal
                </button>
            </DeleteForm>
        </div>
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