import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavouritesModule } from './favourites/favourites.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { CurrentUserMiddleware } from './auth/middlewares/current-user.middleware';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavouritesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: config.get<any>('TYPEORM_CONNECTION'),
          host: config.get<any>('TYPEORM_HOST'),
          username: config.get<string>('TYPEORM_USERNAME'),
          password: config.get<string>('TYPEORM_PASSWORD'),
          database: config.get<string>('TYPEORM_DATABASE'),
          port: config.get<number>('TYPEORM_PORT'),
          entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
