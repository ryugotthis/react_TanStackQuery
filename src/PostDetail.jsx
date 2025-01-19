import { fetchComments } from './api';
import { useQuery } from '@tanstack/react-query';
import './PostDetail.css';

export function PostDetail({ post, deleteMutation, updateMutation }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery({
    //쿼리 키가 항상 같음 -> 이미 알려진 키를 가진 쿼리 데이터는 트리거에 따라 refetch됨
    // 트리거: 컴포넌트 리마운트, window refocus, useQuery에서 반환된 refetch 함수 수동 실행,
    //         자동설정된 refetch, 변이 후 쿼리 무효화(캐시에서 제거)
    // => 클라이언트 데이터가 서버의 데이터와 다르다고 알게 됨
    // 키가 같으면 어떤 트리거도 발생 안됨
    //queryKey: ['comments'],
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
    // fetchComments(post.id)
  });

  // if (!data) return <div />;

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h2>{error.message}</h2>;
  console.log('comment data', data);

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isPending && <p className="loading">Deleting the post</p>}
      {deleteMutation.isError && (
        <p className="error">
          Error deleting the post {deleteMutation.error.message}
        </p>
      )}
      {deleteMutation.isSuccess && (
        <p className="success">Post was (not) deleted</p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isPending && <p className="loading">updating the post</p>}
      {updateMutation.isError && (
        <p className="error">
          Error updating the post {updateMutation.error.message}
        </p>
      )}
      {updateMutation.isSuccess && (
        <p className="success">Post was (not) updated</p>
      )}
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
