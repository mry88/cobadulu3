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
        <div>
            <StyledEditUser>
                <StyledForm onSubmit={handleUpdateUser}>
                    <h3>Edit Role User</h3>
                    <h5>Role :</h5>
                    <select
                        onChange={(e) => setIsAdmin(e.target.value === "Admin")}
                        value={isAdmin ? "Admin" : "Customer"}
                        required
                    >
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                    </select>
                    <PrimaryButton type="submit">
                        {editStatus === "pending" ? "Submitting" : "Submit"}
                    </PrimaryButton>
                </StyledForm>
            </StyledEditUser>
        </div>
    );
}

const Edit = styled.button`
  border: none;
  outline: none;

  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledEditUser = styled.div`
  display: flex;
  justify-content: space-between;
`;
