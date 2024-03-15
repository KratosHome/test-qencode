import React, {FC} from 'react';
import EventText from "../EventText/EventText";
import {Link} from "react-router-dom";
import Logo from "../svg/Logo";
import "./header.scss";

interface HeaderProps {
    data: string | null;
    error: string | null;
    title: string
}

const Header: FC<HeaderProps> = ({title, error, data}) => {
    return (
        <div className="container-header">
            {data && <EventText text={data} color={"ok"}/>}
            {error && <EventText text={error} color={"error"}/>}
            <Link to="/" className="logo"><Logo/></Link>
            <h2>{title}</h2>
        </div>
    );
};

export default Header;