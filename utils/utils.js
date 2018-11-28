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

function mockData(){
  return{
    mockdata:[
      {title:'1st',size:3,time:6,pass:false,lock:false},
      {title:'2nd',size:3,time:3,pass:false,lock:true},
      {title:'3rd',size:4,time:10,pass:false,lock:true},
      {title:'4th',size:4,time:8,pass:false,lock:true},
      {title:'5th',size:5,time:10,pass:false,lock:true},
      {title:'6th',size:5,time:8,pass:false,lock:true},
      {title:'7th',size:6,time:12,pass:false,lock:true},
      {title:'8th',size:7,time:14,pass:false,lock:true},
      {title:'9th',size:8,time:15,pass:false,lock:true},
    ]
  }
}
module.exports = {randomArray, setSize,mockData}