import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
console.log('MYSQL_ROOT_PASSWORD:', process.env.MYSQL_ROOT_PASSWORD);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'grab_like',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
