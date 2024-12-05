import { postIds } from '../../constants';
import { useFetchPostById } from '../../services/queries';
import { formatText } from '../../utils';

const PostsByIdsViewer: React.FC = () => {
  const postQueries = useFetchPostById(postIds);

  const isPending = postQueries.every((query) => query.isPending);
  const isError = postQueries.every((query) => query.isError);
  const errorMessage = postQueries
    .filter((query) => query.error)
    .map((query) => query.error?.message)
    .join(', ');

  const posts = postQueries.map((query) => query.data);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h2>Error Message : {errorMessage || 'Unable to fetch posts'}</h2>;
  }

  return (
    <div className="posts-by-ids-viewer">
      {
        <section className="posts-section">
          <h4>Posts by ID</h4>
          {posts?.map(
            (post) =>
              post && (
                <article key={post.id}>
                  <p>Post Title : {formatText(post.title, 25)}</p>
                </article>
              ),
          )}
        </section>
      }
    </div>
  );
};

export default PostsByIdsViewer;
