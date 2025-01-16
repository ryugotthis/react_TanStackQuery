import { fetchComments } from './api';
import { useQuery } from '@tanstack/react-query';
import './PostDetail.css';

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['comments'],
    queryFn: () => fetchComments(post.id),
    // fetchComments(post.id)
  });

  // if (!data) return <div />;

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h2>{error.message}</h2>;
  console.log('comment data', post.id);

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
