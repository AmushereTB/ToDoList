import React from "react";
import ITodo from "./Interfaces";

interface Props {
    item: ITodo;
}
const TodoCard = ( {item} : Props) => {
    const {title, description, doneState} = item
    return (
        <section className={`${doneState ? 'done_decorate' : ''}`}>
            <h2 className='h2_decorate'>{title}</h2>
            <p>{description}</p>
        </section>
    )
}

export default TodoCard;