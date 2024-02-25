import { useCallback, useState } from 'react';

const TodoForm = ({ addTodo,disabled, children }: any) => {
  const [text, setText] = useState('');

    const clickHandler = () => {
        addTodo(text)
        setText('')
  }

  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        disabled={disabled}
      />
      <button 
        disabled={disabled} 
        onClick={clickHandler}>Добавить</button>
    </>
  );
};

export default TodoForm;
