import TodosAndPostsViewer from './TodosAndPostsViewer';
import PostsByIdsViewer from './PostsByIdsViewer';
import PostsSelectiveFieldsViewer from './PostsSelectiveFieldsViewer';

const QueriesViewer: React.FC = () => {
  return (
    <>
      <div className="queries-demo demo-one">
        <h1 className="demo-heading">Demo 1: Fetch Users and Posts </h1>
        <TodosAndPostsViewer />
      </div>
      <div className="queries-demo demo-two">
        <h1 className="demo-heading">Demo 2: Fetch Posts by IDs </h1>
        <PostsByIdsViewer />
      </div>
      <div className="queries-demo demo-three">
        <h1 className="demo-heading">
          Demo 3: Fetch Posts with Selective Fields
        </h1>
        <PostsSelectiveFieldsViewer />
      </div>
    </>
  );
};

export default QueriesViewer;
