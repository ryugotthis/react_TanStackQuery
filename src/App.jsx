import './App.css';
import Posts from './Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  console.log('hello?');
  const queryClient = new QueryClient();
  return (
    // App에 리액트 쿼리 클라이언트 제공
    // 이 프로바이더의 자식들은 캐시를 포함한 쿼리 클라이언트에 접근 가능
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
      {/* devtools는 provider 안 어디든 위치하면 됨 */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
