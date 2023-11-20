import { Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { UserObjectDto } from './mongodb-user.dto';

@Controller('mongodb')
export class MongodbController {
  constructor(private readonly dbService: MongodbService) {}
  
  // GET route for /mongodb/allUsers
  @Get('allUsers')
  async getAllUsers() {

    // Fetch all users who interacted with the bot
    return this.dbService.findUsers();
  }

  // PATCH route for /mongodb/updateUser/:id
  @Patch('updateUser/:id')
  async updateUser(@Param('id') uid: string, @Body() user: UserObjectDto) {
    
    // Update user's data as per payload
    await this.dbService.addOrUpdateUser(uid, user.name, user.subscribed, user.blocked, user.city);
    
    return { message: `Successfully updated user UID: ${uid} to database!` };
  }

  // DELETE route for /mongodb/deleteUser/:id
  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') uid: string, @Body() user: UserObjectDto) {
    
    // Delete user's data as per UID
    await this.dbService.deleteUser(uid);
    
    return { message: `Successfully deleted user UID: ${uid} from database!` };
  }
}
