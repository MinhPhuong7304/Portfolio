import { Sequelize } from 'sequelize';

async function testPoolerWithOptions() {
  const url = `postgresql://postgres:Tranminhphuong%4004@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?options=project%3Dkznwokirlnezhlwlmkyc`;
  console.log('Thử kết nối Pooler với tham số options=project=kznwokirlnezhlwlmkyc...');
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
    console.log('✓ KẾT NỐI THÀNH CÔNG!');
    await seq.close();
  } catch (err) {
    console.log('✗ THẤT BẠI:', err.message);
  }
}

testPoolerWithOptions();
