import logo from "../../assets/logo.jpg";
import {
    Avatar,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    TextField,
} from "@mui/material";
import { Facebook, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { login } from "../../services/UserService";
import TokenService from "../../services/TokenService";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [keepSigiIn, setKeepSignIn] = useState(true);

    //phone field
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [phoneText, setPhoneText] = useState("");

    //password field
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordText, setPasswordText] = useState("");

    useEffect(() => {
        if (TokenService.getLocalAccessToken()) {
            navigate('/home', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleSignIn = () => {
        if (password !== "" && phoneNumber !== "") {
            login(phoneNumber, password, keepSigiIn)
                .then(res => {
                    TokenService.setLocalAccessToken(res?.data?.data?.token);
                    TokenService.setLocalRefreshToken(res?.data?.data?.refreshToken);
                    setTimeout(() => {
                        navigate('/home', { replace: true });
                    })
                }).catch((err) => {
                    const response = err?.response;
                    if (response.status === 401) {
                        setPasswordError(true);
                        setPasswordText(response.data.message);
                    } else if (response.status === 404) {
                        setPhoneError(true);
                        setPhoneText(response.data.message);
                    }
                });
        } else {
            if (password === "") {
                setPasswordError(true);
                setPasswordText("Password length must be than 6 character!");
            }
            if (phoneNumber === "") {
                setPhoneError(true);
                setPhoneText("Incorrect phone number format!");
            }
        }

    };
    const validatePhoneNumber = (phone) => {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
    }
    const onChangePhoneField = (e) => {
        const value = e.target.value;
        handleValidatePhone(value);
    }
    const onchangePasswordField = (e) => {
        const value = e.target.value;
        handleValidatePassword(value);
    }

    const handleValidatePhone = (phone) => {
        setPhoneNumber(phone);
        const result = validatePhoneNumber(phone);
        if (!result && phone !== "") {
            setPhoneError(true);
            setPhoneText("Incorrect phone number format!");
        } else {
            setPhoneError(false);
            setPhoneText("")
        }
    }
    const handleValidatePassword = (password) => {
        setPassword(password);
        if (password.length < 6 && password !== "") {
            setPasswordError(true);
            setPasswordText("Password length must be than 6 character!");
        } else {
            setPasswordError(false);
            setPasswordText("");
        }
    }

    return (
        <Container maxWidth="xs">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "80px",
                }}
            >
                <Avatar src={logo} style={{ width: "100px", height: "100%" }} />
                <p style={{ lineHeight: "110%", fontSize: "2rem", fontWeight: 500, marginBottom: '60px' }}>
                    Sign in to Tobigram
                </p>
                <FormControl fullWidth>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        style={{ marginBottom: "20px", borderRadius: "10rem" }}
                        required
                        value={phoneNumber}
                        onChange={onChangePhoneField}
                        error={phoneError}
                        helperText={phoneText}
                        type='number'
                    />
                    <TextField
                        label="Password"
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
                        value={password}
                        onChange={onchangePasswordField}
                        style={{ marginBottom: "20px", borderRadius: "50px" }}
                        required
                        error={passwordError}
                        helperText={passwordText}

                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={keepSigiIn}
                                onChange={(e) => setKeepSignIn(e.target.checked)}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        }
                        label="Keep me signed in"
                        style={{ marginBottom: "35px" }}
                    ></FormControlLabel>
                    <Button
                        variant="contained"
                        style={{
                            marginBottom: "20px",
                            height: "54px",
                            borderRadius: "10px",
                        }}
                        onClick={handleSignIn}
                    >
                        Sign In
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
                        href="/register"
                        underline="none"
                        style={{ display: "flex", justifyContent: "end" }}
                    >
                        You don't have account? Register now!
                    </Link>
                </FormControl>
            </div>
        </Container>
    );
};

export default Login;
