import { ImageKit } from "@imagekit/nodejs";

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export async function uploadFile(file, fileName) {
    const result = await client.files.upload({
        file: file,
        fileName: fileName,
    });

    return result;
}
