import { usePrefetch } from '../../services/queries';
import PostList from '../PostList/PostList';

const PrefetchingBeforeQuery: React.FC = () => {
  usePrefetch();

  return (
    <div className="example-of-prefetching">
      <h2>Posts</h2>
      <PostList />
    </div>
  );
};

export default PrefetchingBeforeQuery;
