import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StatusController } from './status.controller';
import { StatusModuleOptions } from './dto/status-module-options.dto';

@Module({
  imports: [ConfigModule],
  controllers: [StatusController],
})
export class StatusModule {
  static forRoot(options: StatusModuleOptions) : DynamicModule {
    return {
      module: StatusModule,
      providers: [
        {
          provide: 'STATUS_MODULE_OPTIONS',
          useValue: options,
        },
      ],
      controllers: [StatusController]
    }
  }
}
