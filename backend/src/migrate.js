import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DATABASE_URL } = process.env;

const localSequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  dialect: 'postgres',
  logging: false
});

const remoteSequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

async function runMigration() {
  try {
    console.log('Đang kết nối cơ sở dữ liệu PostgreSQL cục bộ...');
    await localSequelize.authenticate();
    console.log('✓ Kết nối Database Local thành công.');

    console.log('Đang kết nối cơ sở dữ liệu Supabase đám mây...');
    await remoteSequelize.authenticate();
    console.log('✓ Kết nối Database Supabase thành công.');

    const tables = ['Profiles', 'Skills', 'Projects', 'Experiences', 'Certificates'];

    for (const table of tables) {
      console.log(`\n--- Bắt đầu di chuyển bảng: ${table} ---`);
      
      // Read from local
      const [rows] = await localSequelize.query(`SELECT * FROM "${table}"`);
      console.log(`> Tìm thấy ${rows.length} bản ghi tại Local.`);

      if (rows.length === 0) {
        console.log(`> Không có dữ liệu để di chuyển.`);
        continue;
      }

      // Clear remote table
      console.log(`> Đang làm sạch dữ liệu mẫu cũ trên Supabase...`);
      await remoteSequelize.query(`TRUNCATE TABLE "${table}" CASCADE`);

      // Write to remote
      console.log(`> Đang ghi ${rows.length} bản ghi mới lên Supabase...`);
      for (const row of rows) {
        const columns = Object.keys(row).map(col => `"${col}"`).join(', ');
        const placeholders = Object.keys(row).map((_, idx) => `$${idx + 1}`).join(', ');
        const values = Object.values(row);

        await remoteSequelize.query(
          `INSERT INTO "${table}" (${columns}) VALUES (${placeholders})`,
          { bind: values }
        );
      }
      console.log(`✓ Hoàn thành di chuyển bảng ${table}.`);
    }

    console.log('\n=========================================');
    console.log('✓ TẤT CẢ DỮ LIỆU ĐÃ ĐƯỢC DI CHUYỂN LÊN SUPABASE THÀNH CÔNG!');
    console.log('=========================================');

  } catch (error) {
    console.error('✗ Lỗi di chuyển dữ liệu:', error);
  } finally {
    await localSequelize.close();
    await remoteSequelize.close();
  }
}

runMigration();
