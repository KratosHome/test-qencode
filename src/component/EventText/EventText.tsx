import React, {FC} from 'react';
import "./eventText.scss"

interface EventTextProps {
    text: string
    color?: "ok" | "error"
}

const EventText: FC<EventTextProps> = ({text, color = "ok"}) => {
    return (
        <span className={`container-event-text ${color}-event-text`}>
            {text}
        </span>
    );
};

export default EventText;