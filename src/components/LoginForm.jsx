import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../features/userSlice";
import {Button, TextField, Alert, Paper, Typography, CircularProgress} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {status, error} = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() && password.trim()) {
            dispatch(loginUser({email, password}));
        }
    };

    return (
        <Paper elevation={3} className="login-form">
            <LockOutlinedIcon className="login-icon" sx={{fontSize: 40}}/>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={status === "loading"}
                    className="login-button"
                >
                    {status === "loading" ? <CircularProgress size={24}/> : "Login"}
                </Button>
            </form>
            {error && (
                <Alert severity="error" className="login-error">
                    {error}
                </Alert>
            )}
        </Paper>
    );
};

export default LoginForm;