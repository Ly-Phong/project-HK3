const jwt = require('jsonwebtoken');

exports.jwtCheckMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.ACCESSS_TOKEN_SECERT_KEY;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err || req.session.isLogin !== true) {
                if (req.session.isLogin !== true) 
                    return res.status(401).json({ message: 'Hết hạn phiên bản. Vui lòng đăng nhập lại' });
                return res.status(401).json({ success: false, message: err.message });
            } else {
                req.user = decoded; 
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Thiếu access_token. Vui lòng đăng nhập lại để lấy API sau đó dán access token mà bạn nhận được vào tệp /api/axiosIntance.js.' });
    }
}
