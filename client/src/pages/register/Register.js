import { Facebook, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Button, Container, FormControl, Grid, IconButton, InputAdornment, Link, TextField } from "@mui/material";
import { useState } from "react";
import logo from '../../assets/logo.jpg';
import { register } from "../../services/UserService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const initForm = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        email: ""
    };
    const [form, setForm] = useState(initForm);

    //first name field
    const [fnError, setFnError] = useState(false);
    const [fnText, setFnText] = useState("");

    //last name field
    const [lnError, setLnError] = useState(false);
    const [lnText, setLnText] = useState("");

    //phone number field
    const [phoneError, setPhoneError] = useState(false);
    const [phoneText, setPhoneText] = useState("");

    //password field
    const [passwordError, setPasswordError] = useState(false);
    const [passwordText, setPasswordText] = useState("");

    //email field
    const [emailError, setEmailError] = useState(false);
    const [emailText, setEmailText] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = () => {

        if (!Object.values(form).every(v => v === "")) {
            register(form).then(res => {
                toast.success('Register successfully! Login now');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }).catch((err) => {
                const response = err?.response;
                if (response.status === 400) {
                    setPhoneError(true);
                    setPhoneText(response.data.message);
                } else {
                    toast.error(err?.response?.data?.message);
                }
            });
        } else {
            validateFirstName(form.firstName);
            validateLastName(form.lastName);
            validateEmail(form.email);
            validatePassword(form.password);
            validatePhoneNumber(form.phoneNumber);
        }
    }

    const handleChangeFirstName = (e) => {
        const fn = e.target.value;
        setForm({ ...form, firstName: fn });
        setFnError(false);
        setFnText("");
    }
    const handleChangeLastName = (e) => {
        const ln = e.target.value;
        setForm({ ...form, lastName: ln });
        setLnError(false);
        setLnText("");
    }
    const handleChangePhoneNumber = (e) => {
        const phone = e.target.value;
        setForm({ ...form, phoneNumber: phone });
        validatePhoneNumber(phone);
    }
    const handleChangeNewPassword = (e) => {
        const pass = e.target.value;
        setForm({ ...form, password: pass });
        validatePassword(pass);
    }
    const handleChangeEmail = (e) => {
        const email = e.target.value;
        setForm({ ...form, email: email });
        validateEmail(email);
    }

    //validate form 
    const validatePhoneNumber = (phone) => {
        const isValid = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
        if (!isValid && phone !== "") {
            setPhoneError(true);
            setPhoneText("Incorrect phone number format!");
        } else {
            setPhoneError(false);
            setPhoneText("")
        }
    }
    const validatePassword = (pass) => {
        if (pass.length < 6 && pass !== "") {
            setPasswordError(true);
            setPasswordText("Password length must be than 6 character!");
        } else {
            setPasswordError(false);
            setPasswordText("");
        }
    }
    const validateEmail = (email) => {
        // eslint-disable-next-line no-useless-escape
        const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (!isValid && email !== "") {
            setEmailError(true);
            setEmailText("Incorrect email format!");
        } else {
            setEmailError(false);
            setEmailText("")
        }

    }
    const validateFirstName = (fn) => {
        if (fn === "") {
            setFnError(true);
            setFnText("First Name is not be empty!")
        } else {
            setFnError(false);
            setFnText("");
        }
    }
    const validateLastName = (ln) => {
        if (ln === "") {
            setLnError(true);
            setLnText("Last Name is not be empty!")
        } else {
            setLnError(false);
            setLnText("");
        }
    }

    return (
        <Container maxWidth='xs'>
            <ToastContainer position="top-center" />
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "50px",
            }}>
                <Avatar src={logo} style={{ width: "100px", height: "100%" }} />
                <p style={{ lineHeight: "110%", fontSize: "2rem", fontWeight: 500, marginBottom: '60px' }}>
                    Sign up with Tobigram
                </p>
                <FormControl fullWidth>
                    <Grid container style={{ marginBottom: '20px' }}>
                        <Grid item xs={6} style={{ paddingRight: '5px' }}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                value={form.firstName}
                                required
                                onChange={handleChangeFirstName}
                                error={fnError}
                                helperText={fnText}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: '5px' }}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                value={form.lastName}
                                required
                                onChange={handleChangeLastName}
                                error={lnError}
                                helperText={lnText}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        style={{ marginBottom: "20px", borderRadius: "10rem" }}
                        required
                        value={form.phoneNumber}
                        onChange={handleChangePhoneNumber}
                        error={phoneError}
                        helperText={phoneText}
                    />
                    <TextField
                        label="New Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        value={form.password}
                        onChange={handleChangeNewPassword}
                        style={{ marginBottom: "20px", borderRadius: "50px" }}
                        required
                        error={passwordError}
                        helperText={passwordText}

                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type='text'
                        value={form.email}
                        onChange={handleChangeEmail}
                        style={{ marginBottom: "20px", borderRadius: "50px" }}
                        required
                        error={emailError}
                        helperText={emailText}

                    />

                    <Button
                        variant="contained"
                        style={{
                            marginBottom: "10px",
                            height: "54px",
                            borderRadius: "10px",
                        }}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs={6} style={{ paddingRight: '5px' }}>
                            <Button
                                startIcon={<Google style={{ color: 'orangered' }} />}
                                variant="outlined"
                                style={{
                                    marginBottom: "20px",
                                    height: "54px",
                                    borderRadius: "10px",
                                }}
                                onClick={null}
                                fullWidth
                            >
                                Google
                            </Button>
                        </Grid>
                        <Grid item xs={6} style={{ paddingLeft: '5px' }}>
                            <Button
                                startIcon={<Facebook />}
                                variant="outlined"
                                style={{
                                    marginBottom: "20px",
                                    height: "54px",
                                    borderRadius: "10px",
                                }}
                                onClick={null}
                                fullWidth
                            >
                                Facebook
                            </Button>
                        </Grid>
                    </Grid>
                    <Link
                        href="/login"
                        underline="none"
                        style={{ display: "flex", justifyContent: "end" }}
                    >
                        You already have account? Login now!
                    </Link>
                </FormControl>
            </div>
        </Container>
    );
}

export default Register;