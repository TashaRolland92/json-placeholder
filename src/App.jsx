import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { PostsDetailPage } from './pages/PostsDetailPage';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/posts/:id" element={<PostsDetailPage />} />
			</Routes>
		</>
	)
}

export default App