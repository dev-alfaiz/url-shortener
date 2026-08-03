import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UrlsModule } from './modules/urls/urls.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import configValidationSchema from './config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isDevelopment = configService.get('app.nodeEnv') === 'development';

        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          autoLoadEntities: true,
          synchronize: isDevelopment,
          logging: isDevelopment,
        };
      },
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
