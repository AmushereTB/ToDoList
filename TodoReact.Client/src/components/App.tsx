import React, {useEffect, useState} from 'react';
import TodoList from "./TodoList";
import DoneList from "./DoneList";
import ITodo from './Interfaces'
import styles from './App.module.css'

// const getLocalStorage = () => {
//     let list = localStorage.getItem('list');
//     if(list) 
//     {
//         return JSON.parse(localStorage.getItem('list') || '{}')
//     }
//     else
//     {
//         return [];    
//     }
// }

const App = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState<boolean>(true);
    const [todoList, setToDoList] = useState<ITodo[]>([]);
    
    const fetchToDo = async () => {
        return await fetch("https://localhost:7051/api/TodoItems")
                    .then( res => res.json())
                    .then( data => setToDoList(data))
                    .then(() => setTimeout( () => setLoading(false), 300))
    }
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(!title)
        {
            alert('At least enter a TITLE!')
        }
        else 
        {
            // const newItem = {id: Math.random(), title: title, description: description, doneState: false};
            // setToDoList([...todoList, newItem]);
            const request = {
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, description })
            };
            await fetch('https://localhost:7051/api/TodoItems', request);
            setLoading(true)
            await fetchToDo();
            setTitle('');
            setDescription('')
        }
    }
    
    const reminder = async (id : number) : Promise<void> => {
        // setToDoList(todoList.map( todo => todo.id === id ? {...todo, doneState: !todo.doneState} : todo))
        
        const { doneState ,...value } = todoList.filter( todo => todo.id === id )[0];
        const request = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...value, doneState: !doneState})  
        };
        await fetch(`https://localhost:7051/api/TodoItems/${id}`, request);
        // setLoading(true);
        await fetchToDo();
    }
    
    const deleteToDo = async (id: number) : Promise<void> => {
        // setToDoList(todoList.filter( todo => todo.id !== id));
        
        await fetch(`https://localhost:7051/api/TodoItems/${id}`, { 
            method: 'DELETE' 
        });
        setLoading(true);
        await fetchToDo();
    }

    // useEffect(() => {
    //     // DELETE request using fetch with async/await
    //     async function deletePost() {
    //         await fetch('https://localhost:7051/api/TodoItems/1', { method: 'DELETE' });
    //     }
    //     deletePost();
    // }, [todoList]);

    useEffect(() => {
        setLoading(true);
        fetchToDo();
    }, []);
    
    
    // useEffect(() => {
    //     localStorage.setItem('list', JSON.stringify(todoList));
    // }, [todoList])
    
    return (
    <>
        <header className={styles.header}>
            <h2 className={styles.h2}>Register New TODO</h2>
            
            <form onSubmit={handleSubmit} className={styles.form_holder}>
                <div className={styles.form_control}>
                    <label>Title</label>
                    <input
                        type='text'
                        id='txtTodoItemToAdd'
                        placeholder='Things in your mind'
                        value={title}
                        onChange={ e => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.form_control}>
                    <label>Description</label>
                    <input
                        type='text'
                        placeholder='How ?'
                        value={description}
                        onChange={ e => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.button_bottom_right}>
                    <input type='submit' value=' Add ' id='btnAddTodo' className={styles.button}/>
                </div>
            </form>
        </header>

        {loading ? <p> Loading...</p> : todoList.length > 0 && (
            <section id='todoList' >
                <TodoList items={todoList} onClick={reminder} />
                <DoneList items={todoList} onClick={reminder} onDelete={deleteToDo} />
            </section>
        )}
        
    </>
  );
}

export default App;
