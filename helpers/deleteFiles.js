const Modpack = require('../models/modpack');
const path = require('path');
const fs = require('fs');

const deleteFiles = async (filesToDelete, uploadsPath) => {
    try {
        const subDirs = ['screenshots', 'thumbnails', 'modpacks', 'backgrounds', ''];

        for (const file of filesToDelete) {
                const usageCount = await Modpack.countDocuments({ 
                    $or: [
                        { 'mainVersion.zip': file }, 
                        { thumbnail: file }, 
                        { screenshots: file }, 
                        { background: file }
                    ] 
                });

                if (usageCount === 0) {
                    let fileDeleted = false;

                    for (const dir of subDirs) {
                        const filePath = path.join(uploadsPath, dir, file);

                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                            console.log(`Deleted file: ${filePath}`);
                            fileDeleted = true;
                            break; 
                        }
                    }
                    if (!fileDeleted) {
                        console.log(`File not found for deletion: ${file}`);
                    }
                }
        }
    } catch (error) {
        console.error('Error deleting files: ', error);
    }
};

module.exports = { deleteFiles };
