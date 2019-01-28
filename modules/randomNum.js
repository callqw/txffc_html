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
function randomNumMore() {
    return new Promise((resolve, reject)=> {
        var random = "";
        var data = ["A","B","6","E","U","F","G", "7","C","D", "8", "9", "H","0","I","V","Z", "1","R","S","T", "2","Y","O","P","Q","J","N", "3","W", "K","M","4", "L","X","5"];
        for (var i = 0; i < 32; i++) {
            random += data[Math.floor(Math.random() * 36)]
        }
        resolve(random);
    })
}
module.exports = {
    randomNum : randomNum,randomNumMore:randomNumMore
}