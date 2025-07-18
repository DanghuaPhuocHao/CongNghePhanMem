const mongoose = require('mongoose');
const { User } = require('./models/models');

mongoose.connect('mongodb://localhost:27017/ada_fastfood', {
/*mongoose.connect('mongodb://mongo:27017/ada_fastfood', { */
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const bcrypt = require('bcrypt');
  const hashedPassword = await bcrypt.hash('123', 10);
  await User.create({
    username: 'admin',
    password: hashedPassword,
    email: 'anphuc1203@gmail.com',
    role: 'admin'
  });
  console.log('Tạo admin thành công!');
  process.exit();
});