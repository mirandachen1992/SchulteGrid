const {
    setSize
  } = require('../../../utils/utils');

Component({

    data:{
        ...setSize(3),
        clickId: 0,
        num:0,
    },
    
    clickMe:function(){
        console.log('clicked!!!!')
    }
})