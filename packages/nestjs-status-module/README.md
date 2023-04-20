# @bothrs/nestjs-status

Module for NestJS projects that provides a `/status` endpoint with standard project information.

## Getting started

```
# NPM
npm install @bothrs/nestjs-status

# Yarn
yarn add @bothrs/nestjs-status
```

## Usage

```
# main.module.ts
import { StatusModule } from '@bothrs/nestjs-status'

...
@Module({
  imports: [
    # forRoot
    StatusModule.forRoot({
        name: 'my-project-name',
        version: '1.3.0',
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
        timeZone: process.env.TZ,
    })


    # forRootAsync
    StatusModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'projectName',
          version: '1.0.0,
          port: Number(configService.get('PORT')),
          timeZone: configService.get('TZ'),
          environment: configService.get('NODE_ENV'),
        }
      },
    }),
  ]
})
```
