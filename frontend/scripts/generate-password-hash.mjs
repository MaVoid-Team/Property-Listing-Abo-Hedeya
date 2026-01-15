import bcrypt from 'bcryptjs';

// Generate a bcrypt hash for a given password
async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(`Password: "${password}"`);
  console.log(`Hash: ${hash}`);
  console.log(`\nUse this hash in your SQL INSERT or UPDATE statement`);
}

// Get password from command line or use default
const password = process.argv[2] || 'TestAdmin123!';
generateHash(password).catch(console.error);
