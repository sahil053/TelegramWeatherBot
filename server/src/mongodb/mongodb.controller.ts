import { Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { UserObjectDto } from './mongodb-user.dto';

@Controller('mongodb')
export class MongodbController {
  constructor(private readonly dbService: MongodbService) {}
  
  @Get('allUsers')
  async getAllUsers() {
    return this.dbService.findUsers();
  }

  @Patch('updateUser/:id')
  async updateUser(@Param('id') uid: string, @Body() user: UserObjectDto) {
    await this.dbService.addOrUpdateUser(uid, user.name, user.subscribed, user.blocked, user.city);
    return { message: `Successfully updated user UID: ${uid} to database!` }
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') uid: string, @Body() user: UserObjectDto) {
    await this.dbService.deleteUser(uid);
    return { message: `Successfully deleted user UID: ${uid} from database!` }
  }
}
