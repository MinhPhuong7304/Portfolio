import { Sequelize } from 'sequelize';

async function testPoolerAws1() {
  const url = 'postgresql://postgres.kznwokirlnezhlwlmkyc:Tranminhphuong%4004@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres';
  console.log('Thử kết nối Pooler aws-1...');
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
    console.log('✓ KẾT NỐI ĐẾN AWS-1 THÀNH CÔNG!');
    await seq.close();
  } catch (err) {
    console.log('✗ THẤT BẠI:', err.message);
  }
}

testPoolerAws1();
