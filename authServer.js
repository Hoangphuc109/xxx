const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const connectdatabase = require("./src/config/database"); // Import database connection
const verifyToken = require("./src/middleware/auth");
const cors = require("cors");

app.use(cors());

const generateTokens = (payload) => {
  const { id, name } = payload;
  const accessToken = jwt.sign({ id, name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  const refreshToken = jwt.sign(
    { id, name },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "48h",
    }
  );

  return { accessToken, refreshToken };
};

async function updateRefreshToken(name, refreshToken) {
  try {
    await connectdatabase.query(
      `
      UPDATE rice_4_man.users SET refreshToken = ? WHERE name = ?;
    `,
      [refreshToken, name]
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật refreshToken:", error);
    throw error;
  }
}

app.get("/me", verifyToken, async (req, res) => {
  // console.log("hihi", req);
  try {
    const [user] = await connectdatabase.query(
      `
      SELECT * FROM rice_4_man.users WHERE id = ?;
    `,
      [req.userId]
    );

    // console.log("huhu", user);

    if (!user) return res.sendStatus(401);
    res.json(user[0]);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi lấy thông tin người dùng" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await connectdatabase.query(
    `
      SELECT * FROM rice_4_man.users;
    `,
    [email]
  );
  const user = users[0].find((user) => {
    return user.email === email;
  });

  // console.log("user login", user);
  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      error: {
        message: "Email không hợp lệ",
      },
    });
  }
  const dbPassword = user.password;
  // console.log(user[0][0]);

  bcrypt.compare(password, dbPassword, async (err, hash) => {
    if (err || !hash) {
      return res.status(403).json({
        statusCode: 403,
        error: {
          message: "Mật khẩu không hợp lệ",
        },
      });
    }
    const tokens = generateTokens(user);
    await updateRefreshToken(user.name, tokens.refreshToken);
    res.json(tokens);
  });
});

app.post("/token", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const user = await connectdatabase.query(
      `
      SELECT * FROM rice_4_man.users WHERE refreshToken = ?;
    `,
      [refreshToken]
    );
    if (!user || !user.length) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        const tokens = generateTokens(decoded);
        await updateRefreshToken(decoded.name, tokens.refreshToken);
        res.json(tokens);
      }
    );
  } catch (error) {
    console.error("Lỗi khi tạo token mới:", error);
    res.sendStatus(500);
  }
});

app.post("/auth/register", async (req, res) => {
  const { name, password, email } = req.body;
  const currentDate = new Date();
  try {
    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
    const [existingUser] = await connectdatabase.query(
      `
      SELECT count(*) as count FROM rice_4_man.users WHERE email = ?;
    `,
      [email]
    );
    console.log("check exits email", existingUser[0]);
    if (existingUser[0].count > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.error("Lỗi khi mã hóa mật khẩu:", err);
        return res.status(500).json({
          error: "Đã xảy ra lỗi khi đăng ký người dùng" + err.message,
        });
      }

      // Thêm người dùng mới vào cơ sở dữ liệu
      try {
        await connectdatabase.query(
          `
          INSERT INTO rice_4_man.users ( name, password, email, created_at) VALUES (?, ?, ?, ?);
        `,
          [name, hash, email, currentDate]
        );
        res.sendStatus(201);
      } catch (error) {
        console.error("Lỗi khi thêm người dùng mới:", error);
        res.status(500).json({
          error: "Đã xảy ra lỗi khi đăng ký người dùng" + error.message,
        });
      }
    });
  } catch (error) {
    console.error("Lỗi khi kiểm tra người dùng đã tồn tại:", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi đăng ký người dùng" + error.message });
  }
});

app.delete("/logout", verifyToken, async (req, res) => {
  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await connectdatabase.query(
      `
      SELECT * FROM rice_4_man.users WHERE id = ?;
    `,
      [req.userId]
    );

    if (!user || !user.length) {
      return res.sendStatus(401);
    }

    // Cập nhật refresh token của người dùng thành giá trị rỗng
    await updateRefreshToken(user[0].name, "");

    res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi đăng xuất người dùng:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi đăng xuất người dùng" });
  }
});

// Các route khác

app.listen(5001, () => console.log("Server auth started on port 5001"));
