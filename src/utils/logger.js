import chalk from 'chalk';
import clui from 'clui';

export const warning = chalk.orange;
export const error = chalk.red;
export const log = chalk.green;
export const debug = chalk.blue;
export const title = chalk.white.bgRed.bold;

export function logToUser(text) {
	console.log(log(text.toString().trim().split('\n').join('\n')));
}

export function titleText(text) {
	console.log(title(text.toString().trim().split('\n').join('\n')));
}

export function warningToUser(text) {
	console.log(warning(text.toString().trim().split('\n').join('\n')));
}

export function stopWithError(text) {
	console.log(error(text.toString().trim().split('\n').join('\n')));
	process.exit(1);
}

// Usage:
// start() - Show the spinner on the screen.
// message(statusMessage) - Update the status message that follows the spinner.
// stop() - Erase the spinner from the screen.
const Spinner = clui.Spinner;
export const countDown = new Spinner('Komut calistiriliyor...  ', [ '⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷' ]);
