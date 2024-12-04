import { useState } from 'react';
import { useAddTodo } from '../../services/mutations';

const TodoForm: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');

  const { mutate: addTodo } = useAddTodo();
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoTitle.trim()) {
      const newTodo = { title: todoTitle, completed: false };
      addTodo({ newTodo });
      setTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleForm} className="todo-form">
      <label htmlFor="title">Title : </label>
      <input
        type="text"
        id="title"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;
