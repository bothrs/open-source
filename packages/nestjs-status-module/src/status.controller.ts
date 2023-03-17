import { Controller, Get, HttpStatus, Inject } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import * as OS from 'node:os'
import { debugPort, versions } from 'node:process'

import { StatusModuleOptions } from './dto/status-module-options.dto'
import { StatusModuleResponse } from './dto/status-module-response.dto'

@ApiTags('Monitoring')
@Controller('status')
export class StatusController {
  private startup: Date

  constructor(
    @Inject('STATUS_MODULE_OPTIONS')
    private statusModuleOptions: StatusModuleOptions
  ) {
    this.startup = new Date()
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: StatusModuleResponse,
  })
  status() {
    return {
      status: 'OK',

      time: {
        startup: this.startup.toLocaleString(),
        timezone: this.statusModuleOptions.timeZone ?? process.env.TZ,
        now: new Date().toLocaleString(),
        UTC: new Date(),
      },

      project: {
        name: this.statusModuleOptions.name,
        version: this.statusModuleOptions.version,
        environment: this.statusModuleOptions.environment,
      },

      node: {
        versions: versions,
        port: Number(this.statusModuleOptions.port),
        debugPort: debugPort && Number(debugPort),
      },

      system: {
        arch: OS.arch(),
        platform: OS.platform(),
        release: OS.release(),
        freeMemory: `${Math.round(OS.freemem() / Math.pow(1024, 2))} MB`,
        totalMemory: `${Math.round(OS.totalmem() / Math.pow(1024, 2))} MB`,
        loadAverage: OS.loadavg(),
      },
    }
  }
}
