import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { featuresDelete, featuresFetch } from "../../slices/featuresSlice";
import { useEffect } from "react";
import { setHeaders, url } from "../../slices/api";

export default function DeleteFeatures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { featId } = useParams();
    const { deleteStatus } = useSelector((state) => state.features);

    const handleDelete = async () => {
        // try {
        //     // Send a DELETE request to delete the feature
        //     const response = await fetch(`${url}/features/${featId}`, {
        //         method: "DELETE",
        //         headers: {
        //             ...setHeaders(),
        //         },
        //     });

        //     if (response.ok) {
        //         console.log("Feature deleted successfully");

        //         // Optionally, you can dispatch an action to update the Redux store
        //         dispatch(featuresDelete(featId)); // Assuming you have an action creator for deleting a feature

        //         // Close the edit form or handle it as per your UI flow
        //         navigate("/admin/features");
        //     } else {
        //         console.error("Error deleting feature:", response.statusText);
        //     }
        // } catch (error) {
        //     console.error("Error deleting feature:", error);
        // }
        dispatch(featuresDelete(featId));
        navigate("/admin/features");
    };

    return (
        <DeleteContainer>
            <DeleteForm>
                <h2>Hapus Data?</h2>
                <PrimaryButton onClick={handleDelete}>
                    {deleteStatus === "pending" ? "Submitting" : "Hapus"}
                </PrimaryButton>
                <PrimaryButton onClick={() => navigate("/admin/features")}>
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