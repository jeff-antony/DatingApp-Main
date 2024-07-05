import cloudinary from '../config/cloudinary.js';
import User from '../models/UserModel.js';

const uploadUserPhotos = async (req, res) => {
    const { userId } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        const uploadResults = await Promise.all(files.map(file => 
            cloudinary.uploader.upload(file.path, { folder: '/server/photos' })
        ));

        const photos = uploadResults.map(result => ({
            url: result.secure_url,
            public_id: result.public_id
        }));

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { photos: { $each: photos } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found.');
        }

        res.status(200).send('Photos uploaded successfully.');
    } catch (err) {
        res.status(500).send(`Error uploading photos: ${err.message}`);
    }
};

const getUserPhotos = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(user.photos);
    } catch (err) {
        res.status(500).send(`Error retrieving photos: ${err.message}`);
    }
};

const deleteUserPhoto = async (req, res) => {
    const { userId, public_id } = req.params;

    try {
        await cloudinary.uploader.destroy(public_id);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { photos: { public_id } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found.');
        }

        res.status(200).send('Photo deleted successfully.');
    } catch (err) {
        res.status(500).send(`Error deleting photo: ${err.message}`);
    }
};

export { uploadUserPhotos, getUserPhotos, deleteUserPhoto };
