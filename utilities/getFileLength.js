const fs = require('fs')
const path = require('path')
const fsp = fs.promises;

const buff = Buffer.alloc(100);
const header = Buffer.from("mvhd");

module.exports = async (file) => {
    try {
        const filePath = `D:\\Github\\VideoSample\\${file}`
        const fileHandler = await fsp.open(filePath, "r");
        const { buffer } = await fileHandler.read(buff, 0, 100, 0);
        await fileHandler.close();
        const start = buffer.indexOf(header) + 17;
        const timeScale = buffer.readUInt32BE(start);
        const duration = buffer.readUInt32BE(start + 4);   
        const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;
        return audioLength
    } catch (ex) {
        console.log(ex)
    }
   
}

