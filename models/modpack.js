const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    id: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
    changelog: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    visible: {
        type: String,
        required: false,
    },
    clean: {
        type: String,
        required: false,
    }
});

const modpackSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    background: {
        type: String,
        required: false,
    },
    mainVersion: {
        type: versionSchema,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    jvmArgs: {
        type: String,
        required: false,
    },
    versions: [versionSchema],
});

const Modpack = mongoose.model('Modpack', modpackSchema);

module.exports = Modpack;