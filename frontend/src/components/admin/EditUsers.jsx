import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useEffect } from "react";
import { setHeaders, url } from "../../slices/api";
import { userEdit } from "../../slices/UsersSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUsers() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.users);
    const { editStatus } = useSelector((state) => state.users);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUsr, setCurrentUsr] = useState({});
    const { usrId } = useParams();

    useEffect(() => {
        // Fetch the selected feature item by ID
        const selectedUser = list.find((item) => item._id === usrId);
        if (selectedUser) {
            setCurrentUsr(selectedUser);
            setIsAdmin(selectedUser.isAdmin);
        }
    }, []);

    console.log(isAdmin);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        dispatch(userEdit({
            user: {
                ...currentUsr,
                isAdmin: isAdmin,
            }
        }));
    };

    return (
        <div className="flex justify-center items-center bg-gray-900 mt-32">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
                <StyledEditUser className="flex w-[100%] h-[100%] items-center justify-center">
                    <StyledForm onSubmit={handleUpdateUser} className="w-[100%] h-[100%]">
                        <h3 className="text-2xl font-bold mb-4 text-center text-white">Edit Role User</h3>
                        <h5 className="block text-gray-300 text-sm font-bold mb-2">Role :</h5>
                        <select
                            className="mt-1 py-2.5 px-4 w-full border-2 rounded-lg border-gray-800 bg-gray-700 text-white"
                            onChange={(e) => setIsAdmin(e.target.value === "Admin")}
                            value={isAdmin ? "Admin" : "Customer"}
                            required
                        >
                            <option value="Admin">Admin</option>
                            <option value="Customer">Customer</option>
                        </select>
                        <PrimaryButton type="submit" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center">
                            {editStatus === "pending" ? "Submitting" : "Submit"}
                        </PrimaryButton>
                    </StyledForm>
                </StyledEditUser>
            </div>
        </div>
    );
}

const Edit = styled.button`

`;

const StyledForm = styled.form`

`;

const StyledEditUser = styled.div`

`;
