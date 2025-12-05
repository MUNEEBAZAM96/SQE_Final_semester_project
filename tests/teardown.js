// Global teardown to ensure all connections are closed
module.exports = async () => {
  const mongoose = require('mongoose');
  
  // Close all mongoose connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  
  // Force disconnect
  await mongoose.disconnect();
  
  // Give a moment for cleanup
  await new Promise(resolve => setTimeout(resolve, 100));
};

