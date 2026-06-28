import { Sequelize } from 'sequelize';

async function testPooler(port) {
  const url = `postgresql://postgres.kznwokirlnezhlwlmkyc:Tranminhphuong%4004@aws-0-ap-southeast-1.pooler.supabase.com:${port}/postgres`;
  console.log(`Thử kết nối Pooler cổng ${port}...`);
  const seq = new Sequelize(url, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  try {
    await seq.authenticate();
    console.log(`✓ Kết nối thành công tới cổng ${port}!`);
    await seq.close();
    return true;
  } catch (err) {
    console.log(`✗ Thất bại ở cổng ${port}:`, err.message);
    return false;
  }
}

async function run() {
  await testPooler(6543);
  await testPooler(5432);
}

run();
