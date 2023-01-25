interface EnvProvider {
  secretKey: string;
}

export default {
  secretKey: process.env.SECRET_KEY,
} as EnvProvider;
