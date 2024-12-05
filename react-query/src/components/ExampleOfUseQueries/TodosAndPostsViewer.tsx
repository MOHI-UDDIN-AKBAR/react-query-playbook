import { useFetchTodosAndPosts } from '../../services/queries';
import { formatText } from '../../utils';

const TodosAndPostsViewer: React.FC = () => {
  const [todosQuery, postsQuery] = useFetchTodosAndPosts();

  const isLoading = todosQuery.isLoading || postsQuery.isLoading;
  const isError = todosQuery.isError || postsQuery.isError;
  const errorMessage = todosQuery.error?.message || postsQuery.error?.message;
  const todos = todosQuery.data;
  const posts = postsQuery.data;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>Error Message : {errorMessage}</h2>;
  }

  return (
    <div className="data-viewer">
      {todos ? (
        <section className="todos-section">
          <h3 className="section-title">All Todos</h3>
          {todos.slice(0, 10).map((todo) => (
            <div key={todo.id} className="todo-item">
              <p className="todo-title">
                Todo Title : {formatText(todo.title, 25)}
              </p>
            </div>
          ))}
        </section>
      ) : null}

      {posts ? (
        <section className="posts-section">
          <h3 className="section-title">All Posts</h3>
          {posts.slice(0, 10).map((post) => (
            <div key={post.id} className="post-list">
              <p className="post-title">
                Post Title : {formatText(post.title, 25)}
              </p>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default TodosAndPostsViewer;
