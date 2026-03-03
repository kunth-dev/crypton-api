import "./config/env.js"; // Load environment variables first
import { env } from "./config/env.js";

// Graceful shutdown handler
const shutdown = async (signal: string): Promise<void> => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  try {
    console.log("🎯 Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the application
const startApp = async (): Promise<void> => {
  try {
    console.log("🚀 Starting Crypton API...");
    console.log(`📊 Environment: ${env.NODE_ENV}`);
    console.log(`🌐 Port: ${env.PORT}`);

    console.log("✅ All services started successfully!");
  } catch (error) {
    console.error("💥 Failed to start application:", error);
    process.exit(1);
  }
};

startApp();
