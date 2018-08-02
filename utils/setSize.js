const { randomArray } = require('./random');

exports.setSize = (size) => {
  return {
    currentSize: size, 
    numbers: randomArray(size*size), 
    num: 0, 
    width: `${(600-30)/size}rpx`,
    fontSize: `${8/size}rem`
  }
}