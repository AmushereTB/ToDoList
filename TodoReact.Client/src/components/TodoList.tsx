import React from "react";
import TodoCard from "./TodoCard";
import ITodo from "./Interfaces";

interface Props {
    items: ITodo[];
    onClick(id: number): void;
}

const TodoList = ({items, onClick}: Props) => {
    return (
        <>
            {items.map(item => {
                const { id, doneState } = item;
                if (!doneState)
                return( 
                        <article className='todolist__container--pending todo__button--toggle-completed' onClick={() => onClick(id)} key={id}>
                             <TodoCard item={item}/>
                        </article>
                )}
            )}
        </>
        
    );
}

export default TodoList;