import { useState } from 'react';
import { useFetchPaginatedTodos } from '../../services/queries';
import { formatText } from '../../utils';

const PaginatedTodos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: paginatedData,
    isPending,
    isError,
    error,
    isPlaceholderData,
  } = useFetchPaginatedTodos(currentPage);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>Error Message: {error.message}</h2>;
  }

  if (!paginatedData) {
    return null;
  }

  const { paginatedTodos: todos, hasNextPage, hasPreviousPage } = paginatedData;

  return (
    <div className="paginated-todos">
      <div className="todos-list">
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>Title : {formatText(todo.title, 25)}</p>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={!hasPreviousPage}
        >
          Previous Page
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={!hasNextPage || isPlaceholderData}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PaginatedTodos;
