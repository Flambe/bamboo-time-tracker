import {
    Command,
    Console,
} from 'nestjs-console';
import { Duration } from 'date-fns';
import { prompt } from 'inquirer';
import { Store } from 'data-store';

@Console()
export class AppendCommand
{
    private readonly store = new Store('bamboo-time-tracker');

    @Command({
        command: 'append',
    })
    async append() {
        const existingDays: Duration[] = JSON.parse(this.store.get('days') || '[]');

        existingDays.push(await this.getToday());

        this.store.set('days', JSON.stringify(existingDays));

        console.log('');
        console.log('saved');
    }

    private async getToday(): Promise<Duration> {
        const raw = await prompt({
            name   : 'question',
            message: `Copy the hours/minutes for today`,
        });

        const parsed = raw.question.match(/\s?(?<hours>\d+)h\s?(?<minutes>\d+)m\s?/i);

        if ( !parsed || !parsed.groups ) {
            console.error(`Couldn't figure out how to read '${ raw }' :(`);
        }

        return {
            hours  : +parsed.groups.hours,
            minutes: +parsed.groups.minutes,
        };
    }
}
