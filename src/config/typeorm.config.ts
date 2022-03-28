import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TYPEORMCONFIG: TypeOrmModuleOptions = {
  database: 'test',
  password: 'tamim12369',
  host: 'localhost',
  username: 'root',
  port: 3306,
  type: 'mysql',
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  synchronize: true,
};
