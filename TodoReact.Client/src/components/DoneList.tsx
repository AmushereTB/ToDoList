import React from "react";
import TodoCard from "./TodoCard";
import ITodo from "./Interfaces";
import { FaTrash } from 'react-icons/fa'

interface Props {
    items: ITodo[];
    onClick(id: number): void;
    onDelete(id: number): void;
}

const DoneList = ({items, onClick, onDelete}: Props) => {
    return (
        <>
            {items.map(item => {
                const { id, doneState } = item;
                if (doneState)
                    return(
                        <section className='section__holder' key={id}>
                            <article className='todo--completed todo__button--toggle-completed'
                                     onClick={() => onClick(id)}
                            >
                                <TodoCard item={item}/>
                            </article>
                            <button type='button' className='todo__button--remove' onClick={() => onDelete(id)} >
                                <FaTrash size={50} />
                            </button> 
                        </section>
                    )}
            )}
        </>

    );
}

export default DoneList;