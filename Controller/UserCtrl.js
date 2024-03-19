const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
const UserSchema = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");
const mailService = require('../Middalwares/Mail');
const JobPostSchema = require('../Model/JobPostSchema');

const UserRegister = async (req, res) => {
  try {
    const newUserloyer = await new UserSchema(req.body);
    const { Name, PhoneNO, Password, confirmPassword, Email} = req.body;
    const NameExist = await UserSchema.findOne({ Name: Name });
    const EmailExist = await UserSchema.findOne({ Email: Email });
    const PhoneNOExist = await UserSchema.findOne({ PhoneNO: PhoneNO });
    if (NameExist) {
      res.status(401).json({
        message: "Name Alredy Exist",
      });
    } else {
      if (PhoneNOExist) {
        res.status(401).json({
          message: "number Alredy Exist",
        });
      } 
        if(Password === confirmPassword){
          if(!EmailExist){
        const Salt = await bcrypt.genSalt(10);
        newUserloyer.Password = await bcrypt.hash(Password, Salt);
        let Userloyer = await newUserloyer.save();
        Userloyer = newUserloyer.toObject();
        delete Userloyer.Password;
        res.status(200).json({
          message: "Success",
          Userloyer: Userloyer,
        });
      }else{
        res.status(401).json({
          message: "Email Alredy Exist",
        });
      }
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

const UserLogin = async (req, res) => {
  try {
    const { PhoneNO, Password } = req.body;
    const UserData = await UserSchema.findOne({PhoneNO: PhoneNO});
    if (UserData) {
      const IsMatch = await bcrypt.compare(Password, UserData.Password);
      if (IsMatch) {
        const Paylaod = {
          user: {
            ID: UserData.id,
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
              message: "Login Successful",
              success: "Success",
              token: token,
              data: UserData,
            });
          }
        );
      } else {
        return res.status(401).json({
          message: "Password Not Match",
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid number ..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
};

const UserDetails = async (req, res) => {
  try {
    const UserID = req.params.UserID
    const Detail = await UserSchema.findById(UserID).select('-Password')
    res.status(200).json({
      message : 'Success',
      detail : Detail
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const AllUserList = async (req, res) => {
  try {
    const UserList = await UserSchema.find().select("-Password");
    res.status(500).json({
      message: "Success",
      Count : UserList.length,
      list: UserList,
    });
    // console.log(UserList);
    // const all = UserList.sort((a,b)=>a.Address - b.Address)
    // console.log(all);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const UserProfileUpdate =  async (req, res) => {
  const userId = req.params.id;
  const { City, Address, Pincode,Name,Email } = req.body;
  try {
    let user = await UserSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.City = City || user.City;
    user.Email = Email || user.Email;
    user.Name = Name || user.Name;
    user.Address = Address || user.Address;
    user.Pincode = Pincode || user.Pincode;
    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const sendmail = async (req, res) => {
  try {
    const ID = req.params.id;
    const Email = req.body.Email;
    const findUser = await UserSchema.findById(ID); // Make sure to use await here
    let info = await mailService.sendMail(Email, 'Service Book Confirmation', `User Wait For User Responce,
      If You Have Are AvailableFor Service Then Confirm`,);

    // console.log("Message sent: %s", info.messageId);
    // console.log("Message sent: %s", info);
    
    res.status(200).json({
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: 'Sending email failed',
      error: error.message
    });
  }
}


const JobPost = async(req, res) => {
  try {
    const PostJob = await new JobPostSchema(req.body)
    const Post = await PostJob.save()
    res.status(200).json({
      message : 'Success',
      post : Post
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}
const AllJobPostList = async(req, res) => {
  try {
    const PostJoblist = await  JobPostSchema.find()
    res.status(200).json({
      message : 'Success',
      list : PostJoblist
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}


module.exports = { UserRegister, UserLogin, UserDetails, AllUserList, UserProfileUpdate, sendmail, JobPost, AllJobPostList};
