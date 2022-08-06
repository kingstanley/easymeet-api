import { AccountModule } from './account/account.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetGateway } from './meet.gateway';
import { MeetingModule } from './meeting/meeting.module';
import { PassportModule } from '@nestjs/passport';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { environment } from '../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.MONGO_URL),
    AccountModule,
    MeetingModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, MeetGateway],
})
export class AppModule {}
