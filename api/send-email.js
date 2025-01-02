const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // 只有当请求方法是 POST 时才继续处理
    if (req.method === 'POST') {
        const { name, contact, message } = req.body;

        // 配置邮件服务
        const transporter = nodemailer.createTransport({
            service: 'qq',
            auth: {
                user: '2500474948@qq.com', // 你的QQ邮箱地址
                pass: 'vzdvbkmtojntdibf'  // 你的QQ邮箱授权码（注意：不是密码）
            }
        });

        // 配置邮件选项
        const mailOptions = {
            from: '2500474948@qq.com',
            to: '2500474948@qq.com',  // 目标邮箱地址
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
        // 如果不是 POST 请求，返回错误
        return res.status(405).json({ message: '只支持 POST 请求' });
    }
};
