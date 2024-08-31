import './Header.styles.css';

export const Header = () => {
	return (
		<header className='header'>
			<p className='header__logo'>TapTapDurov</p>
			<a
				className='header_link'
				target='_blank'
				href='https://t.me/taptapDurov'
			>
				<img src='./tg-logo.webp' alt='' />
			</a>
		</header>
	);
};
