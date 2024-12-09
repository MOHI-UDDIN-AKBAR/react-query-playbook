import { useDeleteTodo, useUpdateTodo } from '../../services/mutations';
import { TodoType } from '../../types';
import { formatText } from '../../utils';

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  return (
    <div className="todo-item">
      <p className={completed ? 'completed-title' : ''}>
        Title: {formatText(title, 20)}
      </p>
      <button
        type="button"
        onClick={() =>
          updateTodo({
            todoId: id,
            modifiedTodo: { ...todo, completed: !completed },
          })
        }
      >
        {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
      <button type="button" onClick={() => deleteTodo({ todoId: id })}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
