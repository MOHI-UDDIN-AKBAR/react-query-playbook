import { postIds } from '../../constants';
import { useFetchSelectivePostFields } from '../../services/queries';
import { formatText } from '../../utils';

const PostsSelectiveFieldsViewer: React.FC = () => {
  const {
    isPending,
    isError,
    errors,
    data: posts,
  } = useFetchSelectivePostFields(postIds);

  const isLoading = isPending.some((pending) => pending);
  const hasError = isError.some((error) => error);

  if (isLoading) {
    return <h1 className="loader">Loading...</h1>;
  }

  if (hasError) {
    return (
      <h1 className="error-heading">
        Error Message :
        {errors.map((error) => (
          <>{error?.message}</>
        ))}
      </h1>
    );
  }

  return (
    <div className="posts-by-ids-viewer">
      <h1 className="viewer-title">Post By Id</h1>
      <section className="posts-section">
        {posts.map((post) =>
          post ? (
            <article key={post.id} className="post-article">
              <p>Title : {formatText(post.title, 20)} </p>
            </article>
          ) : null,
        )}
      </section>
    </div>
  );
};

export default PostsSelectiveFieldsViewer;
