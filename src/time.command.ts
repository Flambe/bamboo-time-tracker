import {
    Command,
    Console,
} from 'nestjs-console';
import {
    addMinutes,
    Duration,
    eachDayOfInterval,
    format,
    formatDistanceToNow,
    isToday,
    startOfWeek,
} from 'date-fns';
import { prompt } from 'inquirer';

@Console()
export class TimeCommand
{
    @Command({
        command: 'time',
    })
    async time() {
        const today = new Date();
        const days = eachDayOfInterval({
            start: startOfWeek(today, { weekStartsOn: 1 }),
            end  : today,
        });

        const rawTimes = await prompt(days.map(d => {
            const dayOfWeek = isToday(d) ? 'Today' : new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(d);

            return {
                name   : d.getDay(),
                message: `Copy total hours/minutes from ${ dayOfWeek }`,
            };
        }));

        const calculated: Duration = {
            hours  : 0,
            minutes: 0,
        };

        Object.values(rawTimes)
            .forEach((rawTime: string) => {
                const parsed = rawTime.match(/\s?(?<hours>\d+)h\s?(?<minutes>\d+)m\s?/i);

                if ( !parsed || !parsed.groups ) {
                    console.error(`Couldn't figure out how to read '${ rawTime }' :(`);
                    process.exit();
                }

                calculated.hours += +parsed.groups.hours;
                calculated.minutes += +parsed.groups.minutes;
            });

        const remaining: Duration = {
            hours  : (days.length * 8) - calculated.hours,
            minutes: (days.length * 45) - calculated.minutes,
        };
        const remainingDate = addMinutes(today, (remaining.hours * 60) + remaining.minutes);
        const relativeRemaining = formatDistanceToNow(remainingDate, { addSuffix: true });
        const preciseRemaining = format(remainingDate, 'HH:mm');

        console.log('');
        console.log(`you can leave ${ relativeRemaining } (${ preciseRemaining })`);
    }
}
