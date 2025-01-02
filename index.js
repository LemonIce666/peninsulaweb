// 引入依赖
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// 设置端口
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

// 解析 JSON 格式的请求体
app.use(bodyParser.json());

// 配置邮件服务
const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '2500474948@qq.com', // 你的QQ邮箱地址
        pass: 'vzdvbkmtojntdibf'  // 你的QQ邮箱授权码（注意：不是密码）
    }
});

// 处理表单提交请求
app.post('/sendEmail', (req, res) => {
    const { name, contact, message } = req.body;

    // 配置邮件选项
    const mailOptions = {
        from: '2500474948@qq.com',
        to: '2500474948@qq.com',  // 目标邮箱地址
        subject: '来自网页的留言信息',
        text: `姓名: ${name}\n联系方式: ${contact}\n留言: ${message}`
    };

    // 发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: '邮件发送失败' });
        }
        console.log('邮件发送成功: ' + info.response);
        res.status(200).json({ message: '邮件发送成功' });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



