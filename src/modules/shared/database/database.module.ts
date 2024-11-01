import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserRole } from '../../role/role.entity';
import { Driver } from '../../driver/driver.entity';
import { Seller } from '../../user/seller/seller.entity';
import { Rider } from 'src/modules/rider/rider.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: 'grab_like',
      entities: [User, UserRole, Rider, Driver, Seller],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
