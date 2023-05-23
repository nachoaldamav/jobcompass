export function createConfig(config: any) {
  return {
    host: config.DATABASE_HOST,
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
  };
}
