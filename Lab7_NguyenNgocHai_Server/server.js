// Import các thư viện và modules cần thiết
const exp = require("express"); // Express.js
const fs = require('fs'); // FileSystem để đọc private key
const bodyParser = require("body-parser"); // Middleware để phân tích nội dung yêu cầu
const jwt = require('jsonwebtoken'); // JSON Web Token
var cors = require('cors'); // Middleware CORS (Cross-Origin Resource Sharing) cho quyền truy cập từ các nguồn khác nhau

// Tạo ứng dụng Express
const app = exp();
const port = 3001;
const PRIVATE_KEY = fs.readFileSync('private-key.txt'); // Đọc private key từ file

// Sử dụng bodyParser để phân tích nội dung JSON và CORS middleware cho quyền truy cập từ các nguồn khác nhau
app.use(bodyParser.json());
app.use(cors());

// Xử lý yêu cầu GET đến trang chính
app.get("/", (req, res) => {
    res.send("<h1>Đây là trang home</h1>");
});

// Xử lý yêu cầu POST khi người dùng đăng nhập
app.post('/login', (req, res) => {
     const un = req.body.un; // Lấy tên người dùng từ yêu cầu
     const pw = req.body.pw; // Lấy mật khẩu từ yêu cầu

     // Kiểm tra tên người dùng và mật khẩu
     if (checkUserPass(un, pw)) {
          const userInfo = getUserInfo(un); // Lấy thông tin người dùng

          // Tạo JWT token và trả về cho người dùng
          const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
             algorithm: 'RS256', // Thuật toán mã hóa
             expiresIn: 120, // Thời gian hiệu lực của token (120 giây)
             subject: userInfo.id, // ID của người dùng
          });

          // Trả về token cho người dùng
          res.status(200).json({ idToken: jwtBearerToken, expiresIn: 120, userInfo });
     } else {
          res.sendStatus(401); // Trả về lỗi 401 Unauthorized nếu thông tin đăng nhập không hợp lệ
     }
});

// Hàm kiểm tra tên người dùng và mật khẩu
checkUserPass = (un, pw) => {  
     if (un == 'quanly' && pw == '123') { return true; }
     if (un == 'nhanvien' && pw == '321') { return true; }
     return false; 
}

// Hàm lấy thông tin người dùng dựa trên tên người dùng
getUserInfo = (username) => {  
     if (username == 'quanly') return { "id": "1", hoten: "Nguyễn Ngọc Bích", role: 0 };  
     if (username == 'nhanvien')  return { "id": "2", hoten: "Nguyễn Ngọc Hải", role: 1 };  
     return { "id": "-1", "hoten": "", "role": "-1" };
}

// Lắng nghe cổng và in ra console khi ứng dụng khởi chạy
app.listen(port, () => {   
   console.log(`Ứng dụng đang chạy với cổng ${port}`); 
});
