import { ConfigurableModuleBuilder } from '@nestjs/common'

import type { StatusModuleOptions } from './dto/status-module-options.dto'

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<StatusModuleOptions>()
    .setClassMethodName('forRoot')
    .build()
