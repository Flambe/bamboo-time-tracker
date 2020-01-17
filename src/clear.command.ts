import {
    Command,
    Console,
} from 'nestjs-console';
import { Store } from 'data-store';

@Console()
export class ClearCommand
{
    private readonly store = new Store('bamboo-time-tracker');

    @Command({
        command: 'clear',
    })
    async clear() {
        this.store.del('days');

        console.log('');
        console.log('cleared');
    }
}
