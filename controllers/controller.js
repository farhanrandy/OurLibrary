const { User, Profile, Loan, Book, Category } = require('../models/index');

class Controller {
  // Home route
  static async home(req, res) {
    try {
      res.render('home');
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
  static async login(req, res){
    try {
      res.render('login')
    } catch (error) {
      console.log(err);
      res.send(err)
    }
  }
  static async loginPost(req, res){
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user || user.password !== password) {
      // Email tidak ditemukan atau password salah
      res.render('login', { error: 'Invalid email or password' });
    } else {
      // Login sukses
      // TODO: Tambahkan session kalau perlu
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }

  // ==== USERS ====
  static async userHome(req, res) {
    try {
      // TODO: Fetch and render list of users
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userGetAdd(req, res) {
    try {
      res.render('addUser')
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async userHandleAdd(req, res) {
      try {
        const { name, email, password } = req.body;

        const newUser = await User.create({ name, email, password, role: "user" });

        res.redirect('/login');
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
      // TODO: List all profiles
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async profileGetAdd(req, res) {
    try {
      // TODO: Render add profile form
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async profileHandleAdd(req, res) {
    try {
      // TODO: Handle adding profile
    } catch (err) {
      console.log(err);
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
      let data = await Book.findAll()
      res.render('books',{data})
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookGetAdd(req, res) {
    try {
      // TODO: Render form add book
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookHandleAdd(req, res) {
    try {
      // TODO: Handle add book
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookDetail(req, res) {
    try {
      // TODO: Show detail book
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookGetEdit(req, res) {
    try {
      // TODO: Render edit form
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookHandleEdit(req, res) {
    try {
      // TODO: Handle edit book
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookDelete(req, res) {
    try {
      // TODO: Delete book
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  // ==== CATEGORIES ====
  static async categoryHome(req, res) {
    try {
      // TODO: List categories
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async categoryGetAdd(req, res) {
    try {
      // TODO: Render add category form
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async categoryHandleAdd(req, res) {
    try {
      // TODO: Handle add category
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async categoryDetail(req, res) {
    try {
      // TODO: Show detail category
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
}

module.exports = Controller;
