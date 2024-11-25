import Form from '../Form/Form';
import TodoList from '../TodoList/TodoList';
import './BasicExample.css';

const BasicExample: React.FC = () => {
  return (
    <div className="basic-example">
      <article className="todo-form">
        <Form />
      </article>
      <TodoList />
    </div>
  );
};

export default BasicExample;
