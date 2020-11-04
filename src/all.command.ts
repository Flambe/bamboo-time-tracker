import {Command, Console,} from 'nestjs-console';
import {Duration,} from 'date-fns';
import {Store} from 'data-store';

@Console()
export class AllCommand {
	private readonly store = new Store('bamboo-time-tracker');

	@Command({
		command: 'all',
	})
	async today() {
		const existingDays: Duration[] = JSON.parse(this.store.get('days') || '[]');

		console.log(existingDays.length ? 'stored times:' : 'no stored times');

		existingDays.forEach((time, index) => {
			const paddedIndex = `  ${index + 1}`.slice(-2);

			console.log(`${paddedIndex}: ${time.hours}h ${time.minutes}m`)
		});
	}
}
