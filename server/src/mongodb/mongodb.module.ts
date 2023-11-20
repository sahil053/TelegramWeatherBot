import { Module } from '@nestjs/common';
import { MongoClient, ServerApiVersion, Collection } from 'mongodb';
import { MongodbService } from './mongodb.service';
import { WeatherModule } from 'src/weather/weather.module';
import { MongodbController } from './mongodb.controller';

@Module({
  imports: [WeatherModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Collection> => {
        const URI = process.env.URI;

        // Connect to MongoDB database via the URI
        const client = await MongoClient.connect(URI, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
        
        // Return the specific collection
        return client.db(process.env.DB).collection("users");
      }
    },
    MongodbService,
  ],
  exports: [MongodbService, 'DATABASE_CONNECTION'],
  controllers: [MongodbController]
})

export class MongodbModule {}
