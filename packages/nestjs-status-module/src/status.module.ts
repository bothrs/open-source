import { Module } from '@nestjs/common'

import { StatusController } from './status.controller'
import { ConfigurableModuleClass } from './status.module-definition'

@Module({
  controllers: [StatusController],
})
export class StatusModule extends ConfigurableModuleClass {}
