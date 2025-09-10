const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function seedDatabase() {
  const contentFile = path.join(__dirname, '..', 'content.tar.gz');
  
  // Check if content file exists
  if (!fs.existsSync(contentFile)) {
    console.error('❌ content.tar.gz not found. Please export content first:');
    console.error('   bunx strapi export --no-encrypt --file content.tar.gz');
    process.exit(1);
  }
  
  console.log('📦 Importing content from content.tar.gz...');
  
  return new Promise((resolve, reject) => {
    exec('bunx strapi import --file content.tar.gz --force', 
      { cwd: path.join(__dirname, '..') }, 
      (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Import failed:', error.message);
          if (stderr) console.error(stderr);
          reject(error);
          return;
        }
        
        console.log('✅ Database seeded successfully');
        if (stdout) console.log(stdout);
        resolve();
      }
    );
  });
}

seedDatabase()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });