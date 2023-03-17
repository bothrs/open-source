import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { StatusController } from './status.controller'

import type { StatusModuleOptions } from './dto/status-module-options.dto'
import type { DynamicModule } from '@nestjs/common'

@Module({
  imports: [ConfigModule],
  controllers: [StatusController],
})
export class StatusModule {
  static forRoot(options: StatusModuleOptions): DynamicModule {
    return {
      module: StatusModule,
      providers: [
        {
          provide: 'STATUS_MODULE_OPTIONS',
          useValue: options,
        },
      ],
      controllers: [StatusController],
    }
  }
}
