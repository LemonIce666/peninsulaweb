const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, contact, message } = req.body;

        // 配置邮件服务
        const transporter = nodemailer.createTransport({
            service: 'qq',
            auth: {
                user: process.env.MAIL_USER, // 从环境变量中读取
                pass: process.env.MAIL_PASS  // 从环境变量中读取
            }
        });

        // 配置邮件选项
        const mailOptions = {
            from: process.env.MAIL_USER, // 使用环境变量
            to: '2500474948@qq.com',     // 目标邮箱地址
            subject: '来自网页的留言信息',
            text: `姓名: ${name}\n联系方式: ${contact}\n留言: ${message}`
        };

        try {
            // 发送邮件
            const info = await transporter.sendMail(mailOptions);
            console.log('邮件发送成功: ' + info.response);
            return res.status(200).json({ message: '邮件发送成功' });
        } catch (error) {
            console.error('邮件发送失败:', error);
            return res.status(500).json({ message: '邮件发送失败' });
        }
    } else {
        return res.status(405).json({ message: '只支持 POST 请求' });
    }
};
