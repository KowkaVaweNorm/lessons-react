import { ITodoItem } from "./TodoList"

interface IProps{
  item: ITodoItem
  index: number
  onToggle: (id: number)=> void
  onDelete: (id: number)=> void
  children?: React.ReactNode
}

const TodoItem = ({ item, onToggle, onDelete, index, children }: IProps) => {

  return (
    <div>
      <span>{index}. {item.name}</span>
      <input type="checkbox" checked={item.checked} onChange={()=>{ onToggle(item.id)}}/>
      <button onClick={()=>{ onDelete(item.id)}}>Удалить</button>
    </div>
  );
};

export default TodoItem;