import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UrlsModule } from './modules/urls/urls.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import configValidationSchema from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      load: [
        configuration,
        databaseConfig,
        jwtConfig,
      ],
    }),
    AuthModule,
    UsersModule,
    UrlsModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
