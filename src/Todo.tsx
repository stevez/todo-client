import { useState } from 'react';

interface TodoItem {
   id: number;
   name: string;
   isCompleted: boolean;
}

function Todo() {
    const [input, setInput] = useState<string>('');
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const addTodo = (text: string) => {
        const newTodoItem: TodoItem = {
            id: Date.now(),
            name: text,
            isCompleted: false
        };
        setTodoList([...todoList, newTodoItem])
    }
    const toggleTodo = (item: TodoItem) => {
        setTodoList(todoList.map(elem => elem.id === item.id ? {...elem, isCompleted: !elem.isCompleted} : elem))
    }

    const deleteTodo = (item: TodoItem) => {
        setTodoList(todoList.filter(elem => elem.id !== item.id))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(input.trim()) {
           addTodo(input.trim());
           setInput('');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    required
                    placeholder='Enter New To do Item:'
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit'>Add</button>
            </form>
            {todoList.length > 0 && (
                <ul style={{listStyle: 'none', padding: 0}}>
                    {todoList.map(item => (
                        <li key={item.id}>
                            <label>
                               <input type='checkbox' checked={item.isCompleted} onChange={()=> toggleTodo(item)}/>
                                <span style={{textDecoration: item.isCompleted ? 'line-through': 'none'}}>
                                  {item.name}
                                </span>
                            </label>
                            <button onClick={() => deleteTodo(item)} style={{marginLeft: '8px' }}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {todoList.length === 0 && (
                <h4>Empty To do List</h4>
            )}
        </>
    )
}

export default Todo;
