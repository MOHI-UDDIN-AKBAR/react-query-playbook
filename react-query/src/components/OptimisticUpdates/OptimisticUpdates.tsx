import PostForm from '../PostForm/PostForm';
import PostList from '../PostList/PostList';

const OptimisticUpdates: React.FC = () => {
  return (
    <div className="optimistic-updates">
      <h2>Create a new Post</h2>
      <PostForm />
      <h2>Post List</h2>
      <PostList />
    </div>
  );
};

export default OptimisticUpdates;
