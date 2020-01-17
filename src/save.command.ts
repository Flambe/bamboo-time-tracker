import {
    Command,
    Console,
} from 'nestjs-console';
import { prompt } from 'inquirer';
import { Store } from 'data-store';

@Console()
export class SaveCommand
{
    private readonly store = new Store('bamboo-time-tracker');

    @Command({
        command: 'save',
    })
    async save() {
        const times = await this.getTimes();

        this.store.set('days', JSON.stringify(times));

        console.log('');
        console.log('saved');
    }

    private async getNextTime(): Promise<Duration | void> {
        const raw = await prompt({
            name   : 'question',
            message: `Copy the hours/minutes for a day (or nothing to finish)`,
        });

        const parsed = raw.question.match(/\s?(?<hours>\d+)h\s?(?<minutes>\d+)m\s?/i);

        if ( !parsed || !parsed.groups ) {
            return;
        }

        return {
            hours  : +parsed.groups.hours,
            minutes: +parsed.groups.minutes,
        };
    }

    private async getTimes(times: Duration[] = []): Promise<Duration[]> {
        const next: Duration | void = await this.getNextTime();

        if ( next ) {
            times.push(next);

            return this.getTimes(times);
        }

        return times;
    }
}
