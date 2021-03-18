function decodeId(id) {
    return Buffer.from(id, 'base64').toString().split(':')[1];
}

module.exports = {
    decodeId
}