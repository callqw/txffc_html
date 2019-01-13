function randomNum() {
    return new Promise((resolve, reject)=> {
        var random = "";
        var data = ["6", "7", "8", "9", "0", "1", "2", "3", "4", "5"];
        for (var i = 0; i < 8; i++) {
            random += data[Math.floor(Math.random() * 10)]
        }
        resolve(Number(random));
    })
}
module.exports = {
    randomNum : randomNum
}