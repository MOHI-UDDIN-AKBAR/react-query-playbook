import { FormEvent, useState } from 'react';
import { PostType } from '../../types';
import { useAddPost } from '../../services/mutations';

const PostForm: React.FC = () => {
  const { mutate, isPending } = useAddPost();

  const [postInput, setPostInput] = useState<Omit<PostType, 'id'>>({
    title: '',
    body: '',
  });

  const handlePostForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postInput.title.trim() && postInput.body.trim()) {
      mutate(
        { postInput },
        {
          onSuccess: () => {
            setPostInput({
              title: '',
              body: '',
            });
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handlePostForm}>
      <div className="form-group">
        <label htmlFor="post-title">Post Title </label>
        <input
          type="text"
          id="post-title"
          value={postInput.title}
          onChange={(e) =>
            setPostInput((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="post-body">Post body </label>
        <textarea
          name="post-body"
          id="post-body"
          value={postInput.body}
          onChange={(e) =>
            setPostInput((prev) => ({ ...prev, body: e.target.value }))
          }
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={
          isPending || !postInput.title.trim() || !postInput.body.trim()
        }
      >
        {isPending ? 'Submitting' : 'Submit'}
      </button>
    </form>
  );
};

export default PostForm;
