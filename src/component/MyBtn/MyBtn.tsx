import React, {FC} from 'react';
import "./myBtn.scss"


interface myBtnProps {
    children: React.ReactNode
    color?: "transparent" | "primary"
}

const MyBtn: FC<myBtnProps> = ({children, color = "transparent"}) => {
    return (
        <button className={`container-my-btn ${color}-btn`}>
            {children}
        </button>
    );
};

export default MyBtn;