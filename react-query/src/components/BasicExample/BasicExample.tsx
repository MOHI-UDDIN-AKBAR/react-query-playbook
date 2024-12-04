import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';

const BasicExample: React.FC = () => {
  return (
    <div className="todo-app">
      <section className="todo-form-section">
        <TodoForm />
      </section>
      <TodoList />
    </div>
  );
};

export default BasicExample;
