import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toCorrectTime } from '../../utils/utils';
import './Main.styles.css';

export const Main = () => {
	const [freeDurov, setFreeDurov] = useState<number>(0);
	const [tap, setTap] = useState<number>(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const coinRef = useRef<HTMLDivElement | null>(null);

	const fetchData = async () => {
		try {
			const response = await axios.get('http://localhost:5050/api/get_time');
			setFreeDurov(response.data.time);
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error);
		}
	};

	const updateTimeOnServer = async (increment: number) => {
		try {
			const response = await axios.post(
				'http://localhost:5050/api/update_time',
				{
					time: increment,
				}
			);

			if (response.status === 200) {
				setTap(0);
				setFreeDurov(response.data.time);
			}
		} catch (error) {
			console.error('Ошибка при обновлении времени на сервере:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleClick = (event: React.MouseEvent) => {
		setTap((prev) => prev + 10);
		setFreeDurov((prev) => prev + 10);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			updateTimeOnServer(tap + 10);
		}, 2000);

		const coin = document.createElement('div');
		coin.style.color = '#229ED9';
		coin.className = 'coin';
		coin.innerHTML = `+10ms`;
		coin.style.top = event.clientY - 30 + 'px';
		coin.style.left = event.clientX - 15 + 'px';
		document.body.appendChild(coin);

		setTimeout(() => {
			coin.style.fontSize = '24px';
			coin.style.top = '20%';
			coin.style.opacity = '0';
		}, 10);

		setTimeout(() => {
			coin.remove();
		}, 1000);

		if (coinRef.current) {
			coinRef.current.classList.remove('animate');
			void coinRef.current.offsetWidth;
			coinRef.current.classList.add('animate');
		}
	};

	return (
		<main className='main'>
			<div className='main__info'>
				<p>
					Дуров выйдет на: <br /> <span>{toCorrectTime(freeDurov)}</span> <br />{' '}
					раньше
				</p>
			</div>
			<div ref={coinRef} className='main__coin' onClick={handleClick}></div>
		</main>
	);
};
