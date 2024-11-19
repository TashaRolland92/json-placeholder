import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { PostsDetailPage } from './pages/PostsDetailPage';
import { Todos } from './pages/Todos';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/posts/:id" element={<PostsDetailPage />} />
				<Route path="/todos" element={<Todos />} />
			</Routes>
		</>
	)
}

export default App