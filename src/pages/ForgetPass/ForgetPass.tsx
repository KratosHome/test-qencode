import React from 'react';
import "./forgetPass.scss";
import {Link} from "react-router-dom";
import MyInput from "../../component/MyInput/MyInput";
import MyBtn from "../../component/MyBtn/MyBtn";
import {useForm} from "react-hook-form";
import axios from "axios";
import Header from "../../component/Header/Header";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../store/authSlice";

const ForgetPass = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const [error, setError] = React.useState<string | null>(null);
    const {register, handleSubmit, formState: {errors}} = useForm<any>();

    const onSubmit = (data: IFormInput) => {
        const dataTransform = {
            "email": data.email,
            "redirect_url": `${window.location.origin}/create-password`
        }

        axios.post(`${API_URL}/v1/auth/password-reset`, dataTransform)
            .then(response => {
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
        <div className="wrapper-submit container-forget-password">
            <Header
                data={"Check your email"}
                error={error}
                title={"Forgot Password?"}
            />
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
                <MyBtn color={"primary"}>Send</MyBtn>
            </form>
            <Link to={"/"}>
                <MyBtn color={"transparent"}>Cansel</MyBtn>
            </Link>
        </div>
    );
};

export default ForgetPass;