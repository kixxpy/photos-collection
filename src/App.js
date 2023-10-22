import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
	{ name: 'Все' },
	{ name: 'Море' },
	{ name: 'Горы' },
	{ name: 'Архитектура' },
	{ name: 'Города' },
];

function App() {
	const [collectons, setCollections] = React.useState([]);
	const [categoryId, setCategoryId] = React.useState(0);
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		fetch('https://65353325c620ba9358ec41b6.mockapi.io/photos')
			.then((res) => res.json())
			.then((json) => {
				setCollections(json);
			})
			.catch((err) => {
				console.warn(err);
				alert('Произошла ошибка запроса');
			})
			.finally();
	}, []);
	return (
		<div className="App">
			<h1>Моя коллекция фотографий</h1>
			<div className="top">
				<ul className="tags">
					{cats.map((obj, i) => (
						<li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>
					))}
				</ul>
				<input
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					className="search-input"
					placeholder="Поиск по названию"
				/>
			</div>
			<div className="content">
				{collectons
					.filter((obj) => {
						return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
					})
					.map((obj, index) => (
						<Collection key={index} name={obj.name} images={obj.photos} />
					))}
			</div>
			<ul className="pagination">
				<li>1</li>
				<li className="active">2</li>
				<li>3</li>
			</ul>
		</div>
	);
}

export default App;
