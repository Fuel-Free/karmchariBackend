// const UserProfileSchema = require('../Model/UserProfilSchema')

// const UserProCreate = async(req, res)=>{
//     try {
//         const CreateProfile = await UserProfileSchema.findOne({UserID:req.user.ID})
//         if(CreateProfile == null){
//             const ProfileCreate = await new UserProfileSchema(req.body)
//             ProfileCreate.UserID = req.user.ID
//             const filePath = `/uploads/${req.file.filename}`;
//             ProfileCreate.Profile = filePath;
//             const profileData = await ProfileCreate.save()
//             res.status(200).json({
//                 success: 'Profile Created',
//                 profile : profileData
//             })
//         }else{
//             const ProfileUpdated = await UserProfileSchema.findByIdAndUpdate(CreateProfile._id,req.body,{new:true})
//             res.status(200).json({
//                 success: 'Profile Updated',
//                 profile: ProfileUpdated  
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: "Server Error",
//             error: error.message,
//           });
//     }
// }

// const UserProDetails = async(req ,res)=>{
//     try {
//         const {ProviderProID} = req.params.ProviderProID
//         const FindData = await UserProfileSchema.findById(ProviderProID)
//         res.status.json(FindData)
//     } catch (error) {
//         res.status(500).json({
//             success: "Server Error",
//             error: error.message,
//           });
//     }
// }
// module.exports = {UserProCreate, UserProDetails }