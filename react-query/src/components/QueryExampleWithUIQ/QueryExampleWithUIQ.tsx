import { useFetchUsingUIQ } from '../../services/queries';
import { formatText } from '../../utils';

const QueryExampleWithUIQ: React.FC = () => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useFetchUsingUIQ();

  if (isPending) {
    return <h1 className="loader">Loading...</h1>;
  }

  if (isError) {
    return <h2>Error Message : {error.message}</h2>;
  }

  if (!data) {
    return null;
  }

  const todos = data.pages.map(({ infiniteTodos }) => infiniteTodos).flat(2);

  return (
    <div className="todo-pages">
      <button
        type="button"
        onClick={() => fetchPreviousPage()}
        disabled={isFetchingPreviousPage || !hasPreviousPage}
      >
        {isFetchingPreviousPage ? 'Loading...' : 'Previous Page'}
      </button>
      <div className="todo-page">
        {todos.map((todo) => (
          <article className="todo" key={Number(todo.id)}>
            <p> Title : {formatText(todo.title, 20)}</p>
          </article>
        ))}
      </div>
      <button
        type="button"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        {isFetchingNextPage ? 'Loading...' : 'Next page'}
      </button>
    </div>
  );
};

export default QueryExampleWithUIQ;
