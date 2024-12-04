import { useFetchTodos } from '../../services/queries';
import TodoItem from '../Todo/TodoItem';

const TodoList: React.FC = () => {
  const { data: todos, isError, isPending, error } = useFetchTodos();

  if (isPending) {
    return <h2 className="loader">Loading...</h2>;
  }

  if (isError) {
    return <h2 className="error-message">Error: {error.message}</h2>;
  }

  return todos ? (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  ) : null;
};

export default TodoList;
