import { useFetchPosts } from '../../services/queries';
import { formatText } from '../../utils';

const PostList: React.FC = () => {
  const { data: posts, isError, isPending, error } = useFetchPosts();

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error Message : {error.message}</h1>;
  }

  return (
    <div className="post-list">
      {posts
        ? posts.map((post) => (
            <div className="post-item" key={post.id}>
              <h3> {formatText(post.title, 20)}</h3>
              <p>{post.body}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default PostList;
