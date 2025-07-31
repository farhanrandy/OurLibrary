const { where } = require('sequelize');
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
      console.log(error);
      res.send(error)
      
    }
  }
  static async loginHandle(req, res){
    try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user || user.password !== password) {
      res.render('login', { error: 'Invalid email or password' });
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
    const { name, email, password, address, phone } = req.body;

    // Buat user baru
    const newUser = await User.create({ name, email, password, role: "user" });

    // Buat profile berdasarkan userId
    await Profile.create({
      address: address,
      phone: phone,
      UserId: newUser.id
    });

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
      const userId = req.query.userId;
      let userData = await User.findByPk(userId, {include: Profile})
      // console.log(userData);
      
      res.render('profile', {userData, userId})
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
      include: Profile
    });

    res.render('editProfile', {
      User: userData,
      Profile: userData.Profile
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
      include: Profile
    });

    // Update data User
    userData.name = req.body.name;
    userData.email = req.body.email;
    await userData.save();

    // Update data Profile
    userData.Profile.address = req.body.address;
    userData.Profile.phone = req.body.phone;
    await userData.Profile.save();

    res.redirect(`/profiles/${userData.id}?userId=${userData.id}`) // Balik ke halaman profil setelah update

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
    const { userId } = req.query;

    const books = await Book.findAll({
      include: Category
    });

    let profile = null;
    if (userId) {
      profile = await Profile.findOne({
        where: { UserId: userId }
      });
    }
    // console.log('<<<<<<<<<<<<<<<<,',profile,'>>>>>>>>>>>>>>>>>>>>>');
    
    res.render('books', { data: books, profile });
  } catch (err) {
    console.log(err);
    res.send(err);
  }

  }

  static async bookGetAdd(req, res) {
    try {
      let categoryData = await Category.findAll()
      res.render('addBook', {categoryData})
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }

  static async bookHandleAdd(req, res) {
    try {
      const userId = req.query.userId
      const { title, authorName, imageURL, description, CategoryId } = req.body;
    await Book.create({
      title,
      authorName,
      imageURL,
      description,
      CategoryId: Number(CategoryId)
    });
    res.redirect(`/books?userId=${userId}`);
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
