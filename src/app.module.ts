import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { TimeCommand } from './time.command';
import { TotalCommand } from './total.command';
import { SaveCommand } from './save.command';
import { AppendCommand } from './append.command';
import { TodayCommand } from './today.command';
import { ClearCommand } from './clear.command';
import { AllCommand } from './all.command';

@Module({
  imports  : [
    ConsoleModule,
  ],
  providers: [
    TimeCommand,
    TotalCommand,
    SaveCommand,
    AppendCommand,
    TodayCommand,
    ClearCommand,
    AllCommand,
  ],
})
export class AppModule
{
}
