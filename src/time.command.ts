import {
    Command,
    Console,
} from 'nestjs-console';

@Console()
export class DefaultCommand
{
    @Command({
        command: '',
    })
    async test() {
        console.log('test');
    }
}
