import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { TimeCommand } from './time.command';
import { TotalCommand } from './total.command';

@Module({
  imports  : [
    ConsoleModule,
  ],
  providers: [
    TimeCommand,
    TotalCommand,
  ],
})
export class AppModule
{
}
