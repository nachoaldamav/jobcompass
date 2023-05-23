import { connect } from '@planetscale/database';

export const database = connect({
  host: process.env.PLANETSCALE_HOST,
  username: process.env.PLANETSCALE_USERNAME,
  password: process.env.PLANETSCALE_PASSWORD,
});
