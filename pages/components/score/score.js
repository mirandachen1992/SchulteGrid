const app = getApp();

Component({
    properties: {
        item: String,
        posParam:{
            type:Number,
            value:0,
        }
      },
      ready:function(){
        var item = this.data.item;
        if(item ==="."){
            this.setData({
                posParam:-822
            })
            return
        }
        if(item ==="s"){
            this.setData({
                posParam:-897
            })
            return
        }
        this.setData({
            posParam:-85*item
        })
      }
})