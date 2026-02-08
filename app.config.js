import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    API_URL: process.env.NODE_ENV === 'production'
      ? process.env.PROD_API_URL
      : process.env.LOCAL_API_URL,
  },
});
