import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { TimeCommand } from './time.command';

@Module({
  imports    : [ ConsoleModule ],
  controllers: [],
  providers  : [ TimeCommand ],
})
export class AppModule
{
}
