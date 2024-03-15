import React from 'react';
import "./createPassword.scss";
import Header from "../../component/Header/Header";
import {useForm} from "react-hook-form";
import axios from "axios";
import MyInput from "../../component/MyInput/MyInput";
import MyBtn from "../../component/MyBtn/MyBtn";
import {loginSuccess} from "../../store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useParams} from "react-router-dom";

const CreatePassword = () => {
    const {accessToken} = useSelector((state: RootState) => state.auth);
    const API_URL = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const [data, setData] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const {register, watch, handleSubmit, formState: {errors}} = useForm<any>();
    const password = watch('password');
    const { secret } = useParams<{ secret: string }>();

    const onSubmit = (data: any) => {
        const dataTransform = {
            "token": accessToken,
            "secret": secret,
            "password": data.password,
            "password_confirm": data.confirmPassword
        }
        axios.post(`${API_URL}/v1/auth/password-set`, dataTransform)
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
                setError(error.response.data.detail[0].error);
            });
    };

    return (
        <div className="wrapper-submit container-crate-password">
            <Header
                data={data}
                error={error}
                title={"Create new Password?"}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="input-field-wrapper">
                <MyInput
                    label="Password"
                    type="password"
                    placeholder="Введіть пароль"
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
                    error={errors.password && errors.password.message}
                />
                <MyInput
                    label="Password Confirm"
                    type="password"
                    placeholder="Password"
                    register={register('confirmPassword', {
                        validate: value => value === password || "Passwords don't match"
                    })}
                    error={errors.confirmPassword && errors.confirmPassword.message}
                />
                <MyBtn color={"primary"}>Resset Pasword</MyBtn>
            </form>
        </div>
    );
};

export default CreatePassword;