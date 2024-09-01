import './Footer.styles.css';

export const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer__content'>
				<a
					className='footer_link'
					target='_blank'
					href='https://t.me/TapTapDurov'
				>
					<img src='./tg-logo.webp' alt='' />
				</a>
			</div>
		</footer>
	);
};
