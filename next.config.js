/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:"mongodb+srv://ssinghal3220:v8HlGVTxNHEy2dW2@grosecomm.pnsfn8a.mongodb.net/?retryWrites=true&w=majority",
    jwt_secret:"grosE-commerceStore#2716#1532signedShivamSinghal",
  }
}

module.exports = nextConfig
