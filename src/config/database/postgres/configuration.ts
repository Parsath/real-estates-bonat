export const postgresConfig: any = () => {
  return {
    database: process.env.DB_NAME,
    entities: [__dirname + './../../../common/models/*.entity{.ts,.js}'],
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
    type: 'postgres',
    username: process.env.DB_USERNAME,
    synchronize: true,
    ssl: process.env.APP_ENV === 'dev' ? false : { rejectUnauthorized: false },
    // logging: true,
  };
};
