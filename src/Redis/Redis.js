import chalk from "chalk";
import Redis from "redis";

export const redisClient = new Redis.createClient({
    host:'localhost',
    port:6380,
    db:0
})

// Test the connection
redisClient.on('connect', () => {
    console.log(chalk.bgYellowBright('Connected to Redis at 6379'));
});
  
  // Handling errors
  redisClient.on('error', (err) => {
    console.error('Redis connection error', err);
  });