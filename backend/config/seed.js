const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@BackerSphere2024', 12);
      await User.create({
        name: 'BackerSphere Admin',
        email: process.env.ADMIN_EMAIL || 'admin@backersphere.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user seeded');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
  }
};

module.exports = { seedAdmin };
