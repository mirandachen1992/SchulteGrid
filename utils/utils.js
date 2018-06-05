function randomArray (num) {
  var arr = [];
  while(arr.length < num) {
    var random = randomFn(num);
    if(arr.indexOf(random) > -1) {
      continue;
    } else {
      arr.push(random);
    }
  }
  return arr;
}

function randomFn (num) {
  return Math.floor(Math.random()*num + 1)
}

function setSize (size) {
  return {
    currentSize: size, 
    numbers: randomArray(size*size), 
    num: 0, 
    width: `${(600-60)/size}rpx`,
    fontSize: `${8/size}rem`
  }
}


module.exports = {randomArray, setSize}