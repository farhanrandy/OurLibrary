const { where } = require("sequelize");
const { User, Profile, Loan, Book, Category } = require("../models/index");
const bcrypt = require("bcryptjs");
class Controller {
  // Home route
  static async home(req, res) {
    try {
      res.render("home");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async login(req, res) {
    try {
      res.render("login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async loginHandle(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.render("login", { error: "Invalid email or password" });
      } else {
        // Login sukses
        const userId = user.id;
        res.redirect(`/books?userId=${userId}`);
      }
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async logoutHandle(req, res) {
    try {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      res.redirect("/login");
    } catch (err) {
      console.log("Logout error:", err);
      res.redirect("/");
    }
  }

  // ==== USERS ====
  static async userGetAdd(req, res) {
    try {
      res.render("addUser");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userHandleAdd(req, res) {
    try {
      const { name, email, password, address, phone } = req.body;

      // Buat user baru
      const newUser = await User.create({
        name,
        email,
        password,
        role: "user",
      });

      // Buat profile berdasarkan userId
      await Profile.create({
        address: address,
        phone: phone,
        UserId: newUser.id,
      });

      res.redirect("/login");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userDetail(req, res) {
    try {
      // TODO: Fetch and render detail of a user
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  // ==== PROFILES ====
 static async profileHome(req, res) {
  try {
    const userId = req.query.userId;

    const userData = await User.findByPk(userId, {
      include: [
        Profile,
        {
          model: Loan,
          include: [Book],
          required: false
        }
      ]
    });
    

    res.render("profile", { userData, userId });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

  static async profileGetEdit(req, res) {
    try {
      const userId = req.params.id;

      const userData = await User.findOne({
        where: { id: userId },
        include: Profile,
      });

      res.render("editProfile", {
        User: userData,
        Profile: userData.Profile,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async profileHandleEdit(req, res) {
    try {
      const userId = req.params.id;

      // Ambil data user beserta profil-nya
      const userData = await User.findOne({
        where: { id: userId },
        include: Profile,
      });

      // Update data User
      userData.name = req.body.name;
      userData.email = req.body.email;
      await userData.save();

      // Update data Profile
      userData.Profile.address = req.body.address;
      userData.Profile.phone = req.body.phone;
      await userData.Profile.save();

      res.redirect(`/profiles/${userData.id}?userId=${userData.id}`); // Balik ke halaman profil setelah update
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }

  // ==== LOANS ====
  static async loanHome(req, res) {
    try {
      // TODO: List loans
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async loanGetAdd(req, res) {
    try {
      // TODO: Render form add loan
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async loanHandleAdd(req, res) {
    try {
      // TODO: Handle add loan logic
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async loanDetail(req, res) {
    try {
      // TODO: Detail pinjaman
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  // ==== BOOKS ====
  static async bookHome(req, res) {
    try {
      const { userId, search } = req.query; // ⬅️ ambil parameter search juga

      let books;
      if (search) {
        // ⬅️ kalau ada keyword pencarian, pakai static method
        books = await Book.searchByTitle(search);
      } else {
        // ⬅️ default ambil semua buku
        books = await Book.findAll({
          include: [
            Category,
          {
            model: Loan,
            include: User,
            required: false,
            attributes: ['id', 'UserId', 'BookId', 'returnDate', 'borrowDate']
          }],
        });
      }

      let profile = null;
      if (userId) {
        profile = await Profile.findOne({
          where: { UserId: userId },
          include: User,
        });
      }

      const role = profile.User.role // ⬅️ optional, buat role di view
      res.render("books", { data: books, profile, userId, role, search }); // ⬅️ kirim search ke EJS biar bisa diisi ulang
    } catch (err) {
      console.log("Controller error:", err);
      res.send(err);
    }
  }

  static async bookGetAdd(req, res) {
    try {
      let categoryData = await Category.findAll();
      res.render("addBook", { categoryData });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookHandleAdd(req, res) {
    try {
      const userId = req.query.userId;
      const { title, authorName, imageURL, description, CategoryId } = req.body;
      await Book.create({
        title,
        authorName,
        imageURL,
        description,
        CategoryId: Number(CategoryId),
      });
      res.redirect(`/books?userId=${userId}`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async bookBorrowHandle(req, res) {
    try {
      const { userId } = req.query;
      const bookId = req.params.bookId;

      // 1️⃣ Cek apakah buku sedang dipinjam
      const existingLoan = await Loan.findOne({
        where: {
          BookId: bookId,
          returnDate: null, // berarti belum dikembalikan
        },
      });

      if (existingLoan) {
        // 2️⃣ Kalau udah dipinjam, jangan bisa dipinjam lagi
        return res.send("This book is currently borrowed.");
      }

      // 3️⃣ Kalau belum dipinjam, create data peminjaman
      await Loan.create({
        UserId: userId,
        BookId: bookId,
        borrowDate: new Date(),
        returnDate: null,
      });

      // 4️⃣ Redirect balik ke list buku
      res.redirect(`/books?userId=${userId}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async loanHandleReturn(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const loan = await Loan.findOne({
      where: {
        id,
        returnDate: null
      }
    });

    if (!loan) {
      return res.send("Loan not found or already returned.");
    }

    loan.returnDate = new Date();
    await loan.save();

    res.redirect(`/books/?userId=${userId}`);
  } catch (err) {
    console.log("Return Error:", err);
    res.send(err);
  }
}
  static async bookGetEdit(req, res) {
    try {
      const bookId = req.params.bookId;
      const userId = req.query.userId;

      // Ambil data buku berdasarkan ID
      const book = await Book.findByPk(bookId);
      if (!book) return res.status(404).send("Book not found");

      // Ambil semua kategori buat dropdown
      const categoryData = await Category.findAll();

      res.render("editBook", {
        book,
        categoryData,
        userId,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookHandleEdit(req, res) {
    try {
      const { userId } = req.query;
      const bookId = req.params.bookId;
      const { title, authorName, imageURL, description, CategoryId } = req.body;

      // Cari data buku dulu
      const book = await Book.findByPk(bookId);
      if (!book) return res.status(404).send("Book not found");

      // Update nilai-nya
      book.title = title;
      book.authorName = authorName;
      book.imageURL = imageURL;
      book.description = description;
      book.CategoryId = Number(CategoryId);

      await book.save(); // Simpan ke DB

      res.redirect(`/books?userId=${userId}`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookDelete(req, res) {
    try {
      const { userId } = req.query; // biar bisa redirect balik pakai userId
      const bookId = req.params.bookId;

      // Cari dulu bukunya buat validasi (optional)
      const book = await Book.findByPk(bookId);
      await book.destroy(); // Hapus dari database

      res.redirect(`/books?userId=${userId}`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
