import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toCorrectTime } from '../../utils/utils';
import './Main.styles.css';

export const Main = () => {
	const [freeDurov, setFreeDurov] = useState<number>(0);
	const [tap, setTap] = useState<number>(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const btnRef = useRef<HTMLDivElement | null>(null);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				'https://ss.taptapdurov.fun/api/get_time'
			);
			setFreeDurov(response.data.time);
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error);
		}
	};

	const updateTimeOnServer = async (increment: number) => {
		try {
			const response = await axios.post(
				'https://ss.taptapdurov.fun/api/update_time',
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

		const value = document.createElement('div');
		value.style.color = '#229ED9';
		value.className = 'value';
		value.innerHTML = `+10ms`;
		value.style.top = event.clientY - 30 + 'px';
		value.style.left = event.clientX - 15 + 'px';
		document.body.appendChild(value);

		setTimeout(() => {
			value.style.fontSize = '24px';
			value.style.top = '20%';
			value.style.opacity = '0';
		}, 10);

		setTimeout(() => {
			value.remove();
		}, 1000);

		if (btnRef.current) {
			btnRef.current.classList.remove('animate');
			void btnRef.current.offsetWidth;
			btnRef.current.classList.add('animate');
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
			<div ref={btnRef} className='main__btn' onClick={handleClick}></div>
		</main>
	);
};
