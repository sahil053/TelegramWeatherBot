import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { ApiModule } from 'src/api/api.module';
import { ApiService } from 'src/api/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongodbModule, ApiModule, HttpModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
