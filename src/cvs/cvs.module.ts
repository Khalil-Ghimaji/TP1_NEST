import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { User } from '../users/entities/user.entity';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Cv,User])],
  controllers: [CvsController],
  providers: [CvsService],
})
export class CvsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'v2/cvs', method: RequestMethod.ALL });
  }
}
