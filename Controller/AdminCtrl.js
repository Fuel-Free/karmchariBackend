const AdminSchema = require("../Model/AdminSchema");
const ProviderSchema = require("../Model/ProviderSchema");
// const UserProfileSchema = require("../Model/");
const ProviderProfileSchema = require("../Model/ProviderProfileSchema");
const UserSchema = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const AdminRegister = async (req, res) => {
  try {
    const newAdmin = await new AdminSchema(req.body);
    const { Name, Password, confirmPassword } = req.body;
    const NameExist = await AdminSchema.findOne({ Name: Name });
    if (NameExist) {
      res.status(401).json({
        success: "Success",
        message: "Name Alredy Exist",
      });
    } else {
      if(Password === confirmPassword){
        const Salt = await bcrypt.genSalt(10);
        newAdmin.Password = await bcrypt.hash(Password, Salt);
        let admin = await newAdmin.save();
        res.status(200).json({
          success: "Success",
          admin: admin,
        });
      }else{
        res.status(400).json({
          message: "Passwords do not match",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
};
const AdminLogin = async (req, res) => {
  try {
    const { Name, Password} = req.body;
    const adminData = await AdminSchema.findOne({ Name: Name });
    console.log(adminData);
    if (adminData) {
      const IsMatch = await bcrypt.compare(Password, adminData.Password);
      if (IsMatch) {
        const Paylaod = {
          user: {
            ID: adminData.id,
          },
        };

        jwt.sign(
          Paylaod,
          process.env.JWT_SECRET,
          { expiresIn: "12h" },
          (err, token) => {
            if (err) {
              res.status(500).json({
                err: err.message,
              });
            }
            res.status(200).json({
              message: "Login successful",
              token : token
            });
          }
        );
      } else {
        res.status(401).json({
          success: "Password Not Match",
        });
      }
    } else {
      return res.status(401).json({
        success: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
};

// Userloyer/ Provider delete by admin
const ProviderProfileDeleted = async (req, res) => {
  try {
    const adminData = await AdminSchema.findById(req.user.ID)
    if(adminData == null){
      res.status(500).json({
        success: "failed",
        message : 'Not Authenticated'
      });
    }else{
          const Provider = await ProviderProfileSchema.findByIdAndDelete(req.params.CandID) // params id 
          if(Provider == null){
            res.status(404).json({
              success : 'Failed',
              message : 'Not Found'
            })
          }else{
            res.status(200).json({
              success: "Success",
              message: 'Provider Delete',
            });
          }
    }
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
}

const UserProfileDeleted = async (req, res) => {
  try {
    const adminData = await AdminSchema.findById(req.user.ID)
    if(adminData == null){
      res.status(500).json({
        success: "failed",
        message : 'Not Authenticated'
      });
    }else{
      const Userloyer = await UserProfileSchema.findByIdAndDelete(req.params.UserID) //params id 
      if(Userloyer == null){
            res.status(404).json({
              success : 'Failed',
              message : 'Not Found'
            })
      }else{
        res.status(200).json({
          success: "Success",
          message: 'Userloyer Delete',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
};

const AllProviderList = async (req, res) => {
  try {
    const ProviderList = await ProviderSchema.find().select("-Password");
    res.status(500).json({
      success: "Success",
      message : 'All Provider List',
      list: ProviderList,
    });
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
};

const AllUserList = async (req, res) => {
  try {
    const UserList = await UserSchema.find().select("-Password");
    res.status(500).json({
      success: "Success",
      message : 'All Userloyer List',
      list: UserList,
    });
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
};


module.exports = { AdminRegister, AdminLogin, ProviderProfileDeleted, UserProfileDeleted, AllUserList, AllProviderList };
