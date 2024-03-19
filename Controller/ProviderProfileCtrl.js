const ProfileSchema = require('../Model/ProviderProfileSchema')

const ProfileCreate = async(req, res)=>{
    try {
        const ProviderID = req.params.ProviderID
        const VerifyData = await ProfileSchema.findOne({ProviderID:ProviderID})
        if(VerifyData == null){
            const profile = await new ProfileSchema(req.body)
            profile.ProviderID = ProviderID
            // const FilePath = `/uploads/${req.file.filename}`;
            // profile.Logo = FilePath;
            const profileData = await profile.save()
            res.status(200).json({
                success: 'Profile Created',
                profile : profileData
            })
        }else{
            const ProfileUpdate = await ProfileSchema.findByIdAndUpdate(VerifyData._id, req.body, {new:true})
            res.status(404).json({
                success: 'Profile Updated',
                details : ProfileUpdate
            })
        }
    } catch (error) {
        res.status(500).json({
            success: "Server Error",
            error: error.message,
          });
    }
}

const Providerdetail = async(req, res) =>{
    try {
        const ID = req.params.ProviderID
        // console.log(ID);
        const ProviderDetail = await ProfileSchema.findById(ID)
        // console.log(ProviderDetail);
        res.status(404).json({
            success: 'Profile Details',
            detail : ProviderDetail
        })
    } catch (error) {
        res.status(500).json({
            success: "Server Error",
            error: error.message,
          });
    }
}


const SearchJobTitle = async (req, res) => {
    try {
        const {City, Profession  } = req.query
        const queryObject = {}
          if (Profession) {
            queryObject.Profession = { $regex: Profession, $options: "i" }
          }
          if (City) {
            queryObject.City = { $regex:City, $options: "i" }
          }
          const Data = await ProfileSchema.find(queryObject)
        //   .sort({createdAt: -1  })
        res.status(200).json({
            success: 'success',
            data: Data,
        });
    } catch (error) {
        res.status(500).json({
            success: 'Server Error',
            error: error.message,
        });
    }
};


module.exports = { ProfileCreate, SearchJobTitle, Providerdetail}
