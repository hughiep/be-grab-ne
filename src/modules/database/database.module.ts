import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserRole } from '../user/role.entity';
import { Customer } from '../user/customer/customer.entity';
import { Driver } from '../user/driver/driver.entity';
import { Seller } from '../user/seller/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: 'grab_like',
      entities: [User, UserRole, Customer, Driver, Seller],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
