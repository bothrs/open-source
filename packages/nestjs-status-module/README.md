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
    StatusModule.forRoot({
        name: 'my-project-name',
        version: '1.3.0',
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
        timeZone: process.env.TZ,
    })
  ]
})
```
