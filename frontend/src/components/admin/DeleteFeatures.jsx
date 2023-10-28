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
        // <DeleteContainer>
        //     <DeleteForm className="bg-gray-800 w-[200px] h-[200px] flex items-center justify-center mt-[100px] p-8 rounded-lg">
        //         <h2 className="text-gray-100 font-blod text-lg">Hapus Data?</h2>
        //         <PrimaryButton onClick={handleDelete} className="w-[100%] hover:bg-blue-900">
        //             {deleteStatus === "pending" ? "Submitting" : "Hapus"}
        //         </PrimaryButton>
        //         <PrimaryButton onClick={() => navigate("/admin/features")} className="w-[100%] hover:bg-blue-900">
        //             Batal
        //         </PrimaryButton>
        //     </DeleteForm>
        // </DeleteContainer>
        <div className="flex justify-center mt-32 text-white p-4  m-auto max-w-lg w-96 h-60 bg-gray-800  rounded-lg pt-9">
            <DeleteForm>
                <h2 className="flex self-center mb-4">Hapus Data?</h2>
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={handleDelete}>
                    {deleteStatus === "pending" ? "Submitting" : "Hapus"}
                </button>
                <button className="mt-2 rounded-lg border-2 px-4 py-1.5 mr-2 text-sm font-medium text-navy-700 transition duration-200 hover:text-black active:bg-navy-900/5 border-white/20 bg-white/5 text-white hover:bg-white active:bg-white/20"
                    onClick={() => navigate("/admin/features")}>
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