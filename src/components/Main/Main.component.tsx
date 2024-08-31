import { useState } from 'react';
import './Main.styles.css';

export const Main = () => {
	const [freeDurov, setFreeDurov] = useState<number>(0);

	const handleClick = (event: React.MouseEvent) => {
		setFreeDurov((prev) => prev + 10);
		const coin = document.createElement('div');
		coin.style.color = '#ffffff';
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
	};

	const toCorrectTime = () => {
		let milliseconds = freeDurov;

		const hours = Math.floor(milliseconds / 3_600_000);
		milliseconds %= 3_600_000;

		const minutes = Math.floor(milliseconds / 60_000);
		milliseconds %= 60_000;

		const seconds = Math.floor(milliseconds / 1000);
		milliseconds %= 1000;

		return `${hours > 0 ? `${hours} часов` : ''} ${
			minutes > 0 ? `${minutes} минут` : ''
		}  ${seconds > 0 ? `${seconds} секунд` : ''} ${milliseconds} миллисекунд`;
	};

	return (
		<main className='main'>
			<div className='main__info'>
				<p>
					Дуров выйдет на: <br /> <span>{toCorrectTime()}</span> <br /> раньше
				</p>
			</div>
			<div className='main__coin' onClick={handleClick}>
				{/* <img draggable='false' src='./durov1.png' alt='' /> */}
			</div>
		</main>
	);
};
