const path = require('path')
const { google } = require("googleapis");
const stream = require('stream')
const KEYFILEPATH = path.join(__dirname, "../../crud.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

const upLoadImage = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const { body, files } = req;

        const response = await uploadFile(files[0]);

        return res.status(200).json({
            id: response.id, // luu id vao urlImage ben product http://localhost:8888/image/get/id
            name: response.name,
        });
    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message })
    }
}

//Up image
const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["1KRRjl2LR624Y9G4Uyvi7BR8uutx37h_l"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
    return { name: data.name, id: data.id }
};

// Get image
const getImage = async (req, res) => {
    try {
        const fileId = req.params.fileId;

        const response = await drive.files.get({
            fileId,
            alt: 'media', // Get file content
        }, { responseType: 'stream' }); // Stream the image data

        response.data
            .on('end', () => {})
            .on('error', err => {
                res.status(500).json({ error: 'Image retrieval failed' });
            })
            .pipe(res); // Pipe the image data to the response
    } catch (error) {
        res.status(500).json({ error: 'Image retrieval failed' });
    }
}

module.exports = {
    upLoadImage,
    getImage,
}