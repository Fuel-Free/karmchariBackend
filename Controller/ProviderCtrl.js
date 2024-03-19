const ProviderSchema = require("../Model/ProviderSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const ProviderRegister = async (req, res) => {
  try {
    const newProvider = await new ProviderSchema(req.body);
    const { Name, PhoneNO, Password, confirmPassword, Email} = req.body;
    const NameExist = await ProviderSchema.findOne({ Name: Name });
    const EmailExist = await ProviderSchema.findOne({ Email: Email });
    const PhoneNOExist = await ProviderSchema.findOne({ PhoneNO: PhoneNO });
    if (NameExist) {
      res.status(401).json({
        message: "Name Alredy Exist",
      });
    } else {
      if (PhoneNOExist) {
        res.status(401).json({
          message: "Number Alredy Exist",
        });
      } else {
        if (PhoneNO.length < 10) {
          return res.status(400).json({
            message: "Enter 10 Digit Number ..!",
          });
        }
        if(Password === confirmPassword){
          if(!EmailExist){
          const Salt = await bcrypt.genSalt(10);
          newProvider.Password = await bcrypt.hash(Password, Salt);
          let Provider = await newProvider.save();
          Provider = newProvider.toObject();
          delete Provider.Password;
          res.status(200).json({
            message: "Success",
            Provider: Provider,
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
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


const ProviderLogin = async (req, res) => {
  try {
    const { PhoneNO, Password } = req.body;
    const ProviderData = await ProviderSchema.findOne({PhoneNO:PhoneNO});
    if (ProviderData) {
      const IsMatch = await bcrypt.compare(Password, ProviderData.Password);
      if (IsMatch) {
        const Paylaod = {
          user: {
            ID: ProviderData.id,
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
        return res.status(200).json({
          message: "Login successful",
          token : token,
          data : ProviderData
        });
      })
      } else {
        return res.status(401).json({
          message: "Password Not Match",
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid phone number",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


const ProviderDetails = async (req, res) => {
  try {
    const ID = req.params.ID
    const Detail = await ProviderSchema.findById(ID).select('-Password')
    // console.log(Detail);
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

const ProviderUpdate = async(req, res)=> {
  try {
    // console.log('req.user.ID',req.user.ID);
    const UpdateData = await ProviderSchema.findByIdAndUpdate(req.user.ID, req.body, {new:true})
    res.status(200).json({
      success : "Success",
      message : 'Update Provider',
      update : UpdateData 
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

const ProviderDelete = async(req, res)=> {
  try {
   
    const DeleteData = await ProviderSchema.findByIdAndDelete(req.user.ID)
    if(DeleteData == null){
// console.log('null');
}else{
  // console.log('data');
    }
    res.status(200).json({
      success : "Success",
      message : 'Delete Provider',
    })
  } catch (error) {
    res.status(500).json({
      success: "Server Error",
      error: error.message,
    });
  }
}

const ProviderList = async(req, res)=>{
  try {
    const List = await ProviderSchema.find()
    res.status(200).json({
      message : 'Provider List',
      list : List
    })
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

module.exports = { ProviderRegister, ProviderLogin, ProviderDetails, ProviderUpdate, ProviderDelete, ProviderList };
