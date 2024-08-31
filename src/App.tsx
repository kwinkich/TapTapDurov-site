import { Footer } from './components/Footer/Footer.component';
import { Header } from './components/Header/Header.component';
import { Main } from './components/Main/Main.component';

function App() {
	return (
		<>
			<div className='container'>
				<Header />
				<Main />
				<Footer />
			</div>
		</>
	);
}

export default App;
