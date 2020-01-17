import {
    Command,
    Console,
} from 'nestjs-console';
import {
    addMinutes,
    Duration,
    format,
    formatDistanceToNow,
} from 'date-fns';
import { prompt } from 'inquirer';

@Console()
export class TotalCommand
{
    @Command({
        command: 'total',
    })
    async total() {
        const aim: Duration = {
            hours  : 0,
            minutes: 0,
        };
        const calculated: Duration = {
            hours  : 0,
            minutes: 0,
        };

        (await this.getTimes()).forEach(time => {
            aim.hours += 8;
            aim.minutes += 45;

            calculated.hours += time.hours;
            calculated.minutes += time.minutes;
        });

        const remaining: Duration = {
            hours  : aim.hours - calculated.hours,
            minutes: aim.minutes - calculated.minutes,
        };
        const remainingDate = addMinutes(new Date(), (remaining.hours * 60) + remaining.minutes);
        const relativeRemaining = formatDistanceToNow(remainingDate, { addSuffix: true });
        const preciseRemaining = format(remainingDate, 'HH:mm');

        console.log('');
        console.log(`you can leave ${ relativeRemaining } (${ preciseRemaining })`);
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
