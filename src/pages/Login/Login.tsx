import React, {useEffect, useRef, useState} from 'react';
import "./login.scss"
import {Link} from "react-router-dom";
import MyBtn from "../../component/MyBtn/MyBtn";
import Google from "../../component/svg/Google";
import GitHub from "../../component/svg/GitHub";
import MyInput from "../../component/MyInput/MyInput";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import Header from "../../component/Header/Header";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../store/authSlice";


const Login = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const passwordInputRef = useRef(null);
    const dispatch = useDispatch();
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {register, handleSubmit, watch, formState: {errors}} = useForm<any>();
    const [isShowPass, setIsShowPass] = useState<boolean>(false);

    const email = watch("email");

    useEffect(() => {
        setIsShowPass(!!email);
    }, [email])

    useGSAP(() => {
        gsap.to(passwordInputRef.current, {
            duration: 0.5,
            height: isShowPass ? "auto" : "0px",
            opacity: isShowPass ? 1 : 0,
            display: isShowPass ? "block" : "none",
        });
    }, {dependencies: [isShowPass]});

    const onSubmit = (data: any) => {
        axios.post(`${API_URL}/v1/auth/login`, data)
            .then(response => {
                setData("you entered");
                dispatch(loginSuccess({
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token,
                    tokenExpire: response.data.token_expire,
                    refreshTokenExpire: response.data.refresh_token_expire,
                    timestamp: response.data.timestamp
                }));
            })
            .catch(error => {
                setError(error.response.data.detail);
            });
    };

    return (
        <div className="wrapper-submit container-login">
            <Header
                data={data}
                error={error}
                title={"Log in to your account"}
            />
            <div className="auth-buttons-wrapper">
                <MyBtn><Google/> Google</MyBtn>
                <MyBtn><GitHub/> GitHub</MyBtn>
            </div>
            <div className="container-or">or</div>
            <form onSubmit={handleSubmit(onSubmit)} className="input-field-wrapper">
                <MyInput
                    register={register('email', {
                        required: 'This field is required',
                        minLength: {
                            value: 6,
                            message: 'Name must be at least 6 characters',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Name cannot be more than 50 characters',
                        }
                    })}
                    error={errors.email?.message}
                    type="email"
                    placeholder="Work email"
                />
                <div ref={passwordInputRef} style={{display: "none"}}>
                    <MyInput
                        type="password"
                        placeholder="Password"
                        register={register('password', {
                            required: 'This field is required',
                            minLength: {
                                value: 8,
                                message: 'Name must be at least 8 characters',
                            },
                            maxLength: {
                                value: 50,
                                message: 'Name cannot be more than 50 characters',
                            }
                        })}
                        error={errors.password?.message}
                    />
                </div>
                <Link to={"/forget-pass"} className="forget-pass">Forgot your password?</Link>
                <MyBtn color={"primary"}>Login</MyBtn>
                <div className="sign-up">Is your company new to Qencode? <Link to={"/"}>Sign up</Link></div>
            </form>
        </div>
    );
};

export default Login;