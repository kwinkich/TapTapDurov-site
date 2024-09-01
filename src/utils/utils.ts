export const toCorrectTime = (freeDurov: number) => {
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
