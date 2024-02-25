import { useState, useCallback} from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { RenderCounter } from '@/shared/ui/RenderCounter/RenderCounter';



export interface ITodoItem {
  id: number
  name: string
  checked: boolean
}

const TodoList = () => {
  const [disabled, setDisabled] = useState(false);
  const [todos, setTodos] = useState<ITodoItem[]>([
    { id: Date.now(), name: 'first element', checked: false },
  ]);
 
  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map((item)=> item.id === id ? { ...item, checked: !item.checked}: item))
  },[])

  const deleteTodo = useCallback((id: any ) => {
    console.log('delete');
    
    setTodos((prevTodos) => prevTodos.filter((el) => el.id !== id));
  },[]);

  const addTodo = useCallback((text: string) => {
    setDisabled(true);
    setTimeout(()=>{
      setTodos((prev) => [...prev, { id: Date.now(), name: text, checked: false }]);
      setDisabled(false)
    },1000);
  },[]);
  return (
    <div>
          <TodoForm addTodo={addTodo} disabled={disabled} />
          {todos.map((el, index) => (
          <TodoItem 
          key={index}
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
            index={index} 
            item={el}
          />
      ))}
      <RenderCounter title='Render counter for Todolist' fixed={false} />
    </div>
  );
};

export default TodoList;
