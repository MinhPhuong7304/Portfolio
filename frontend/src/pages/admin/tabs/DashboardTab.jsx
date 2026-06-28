import React from 'react';
import { Folder, Award, MessageSquare, Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardTab({ stats }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex flex-col h-full max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-extrabold text-admin-text mb-3 tracking-tight">Tổng quan Hệ thống</h1>
        <p className="text-admin-muted text-sm flex items-center gap-2 font-medium">
          Chào mừng trở lại! Dưới đây là hoạt động danh mục của bạn.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard variants={item} title="Tổng số dự án" count={stats.projects} icon={<Folder size={24} />} color="from-rose-500 to-pink-600" shadow="shadow-rose-500/20" trend="+12%" />
        <StatCard variants={item} title="Chứng chỉ" count={stats.certificates} icon={<Award size={24} />} color="from-emerald-400 to-teal-600" shadow="shadow-emerald-500/20" trend="+8%" />
        <StatCard variants={item} title="Tổng bình luận" count={stats.messages} icon={<MessageSquare size={24} />} color="from-orange-400 to-amber-600" shadow="shadow-orange-500/20" trend="+23%" />
        <StatCard variants={item} title="Lượt xem hồ sơ" count={"1.2k"} icon={<Activity size={24} />} color="from-blue-500 to-indigo-600" shadow="shadow-blue-500/20" trend="+45%" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-admin-card rounded-2xl p-8 border border-admin-border mb-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-admin-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h3 className="text-xl font-bold text-admin-text mb-6 flex items-center gap-3 relative z-10">
          <Activity size={20} className="text-admin-accent" />
          Trạng thái Hệ thống
        </h3>
        <div className="flex items-center justify-between p-6 bg-admin-input-bg rounded-xl border border-admin-border backdrop-blur-md relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
            <div>
              <h4 className="text-admin-text font-bold text-lg">Tất cả hệ thống hoạt động ổn định</h4>
              <p className="text-admin-muted text-sm">Vừa cập nhật xong</p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-admin-input-bg hover:bg-admin-card-hover text-admin-text text-sm font-semibold transition-colors border border-admin-border cursor-pointer">
            Xem Nhật ký
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, count, icon, color, shadow, trend, variants }) {
  return (
    <motion.div variants={variants} whileHover={{ y: -5, scale: 1.02 }} className="bg-admin-card p-6 rounded-2xl border border-admin-border hover:border-admin-border-strong transition-all group relative overflow-hidden">
      <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <p className="text-admin-muted text-sm font-semibold mb-2 tracking-wide uppercase">{title}</p>
          <h2 className="text-4xl font-black text-admin-text tracking-tighter">{count}</h2>
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${color} ${shadow} shadow-lg`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 relative z-10">
          <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-md">
            <ArrowUpRight size={14} /> {trend}
          </span>
          <span className="text-admin-muted text-xs font-medium">so với tháng trước</span>
        </div>
      )}
    </motion.div>
  );
}
