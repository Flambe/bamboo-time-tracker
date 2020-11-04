import {Command, Console,} from 'nestjs-console';
import {addMinutes, Duration, format, formatDistanceToNow,} from 'date-fns';
import {prompt} from 'inquirer';
import {Store} from 'data-store';
import * as chalk from 'chalk';

@Console()
export class TodayCommand
{
    private readonly store = new Store('bamboo-time-tracker');

    @Command({
        command: 'today',
    })
    async today() {
        const aim: Duration = {
            hours  : 0,
            minutes: 0,
        };
        const calculated: Duration = {
            hours  : 0,
            minutes: 0,
        };

        const existingDays: Duration[] = JSON.parse(this.store.get('days') || '[]');
        const today = await this.getToday();

        existingDays.push(today);

        existingDays.forEach(time => {
            aim.hours += 8;
            aim.minutes += 45;

            calculated.hours += time.hours;
            calculated.minutes += time.minutes;
        });

        const remaining: Duration = {
            hours  : aim.hours - calculated.hours,
            minutes: aim.minutes - calculated.minutes,
        };
        const remainingToday: Duration = {
            hours  : 8 - today.hours,
            minutes: 45 - today.minutes,
        };

        const {
            relative: relativeRemaining,
            precise: preciseRemaining,
        } = TodayCommand.getRemaining(remaining);
        const {
            relative: relativeRemainingToday,
            precise: preciseRemainingToday,
        } = TodayCommand.getRemaining(remainingToday);

        console.log('');
        console.log(chalk`{bold you can leave {magenta ${ relativeRemaining }} ({magenta ${ preciseRemaining }})}`);
        console.log(chalk`{dim today only: {cyan ${ relativeRemainingToday }} ({cyan ${ preciseRemainingToday }})}`);
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

    private static getRemaining(remaining: Duration) {
        const remainingDate = addMinutes(new Date(), (remaining.hours * 60) + remaining.minutes);

        return {
            relative: formatDistanceToNow(remainingDate, { addSuffix: true }),
            precise: format(remainingDate, 'HH:mm'),
        }
    }
}
