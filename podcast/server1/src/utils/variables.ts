const { env } = process as { env: { [key: string]: string } };

export const MONGO_URI = env.MONGO_URI
export const MAILTRAP_USER = env.MAILTRAP_USER
export const MAILTRAP_PASS = env.MAILTRAP_PASS