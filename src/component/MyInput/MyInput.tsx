import React, {FC, useState} from 'react';
import "./myInput.scss"
import HidePass from "../svg/HidePass";
import {useForm} from "react-hook-form";

interface myInputProps {
    label?: string
    type: string
    placeholder: string
    register?: ReturnType<typeof useForm>['register'] | any;
    error?: string | any;
}

const MyInput: FC<myInputProps> = ({type, placeholder, register, error, label}) => {
    const [inputType, setInputType] = useState<string>(type);

    const toggleShowPassword = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    return (
        <div className="container-my-input">
            {label && <label>{label}</label>}
            <div className="wrapper-my-input">
                <input
                    type={inputType}
                    placeholder={placeholder}
                    {...register}
                />
                {type === "password" && <HidePass click={toggleShowPassword}/>}
                {error ? (
                    <div className="error-my-input">
                        {error}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MyInput;