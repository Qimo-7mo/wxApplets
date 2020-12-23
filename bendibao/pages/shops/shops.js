// pages/shops/shops.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopsList:[],
        limitNum:20,
        dt_shipId:1,
        dt_page:0,
        show:false,
        dt_bottomLength:0
    },
    loadMore:function (){
        if(this.data.dt_page!=0&&this.data.limitNum>this.data.dt_bottomLength){
            this.setData({
                show:true
            })
        }else{
            
            //商铺数据请求
            wx.request({
                url: 'https://locally.uieee.com/categories/'+this.data.dt_shipId+'/shops',
                method:"GET",
                data:{
                    _limit:this.data.limitNum,
                    _page:++this.data.dt_page
                },
                success:(options)=>{
                    this.setData({
                        shopsList:this.data.shopsList.concat(options.data),
                        dt_bottomLength:options.data.length
                    });
                    // 当上一次请求数据长度刚好为最大限制时，
                    //（即本次请求得到的资源长度为0时）
                    // 就不加载了
                    if(0==this.data.dt_bottomLength){
                        this.setData({
                            show:true
                        })
                    }
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       wx.showNavigationBarLoading();
        this.setData({
            dt_shipId:options.shopId,
            dt_page:0
        });
        wx.setNavigationBarTitle({
          title: options.title
        })
        var that = this;
        // console.log(that);
        //商铺数据请求
        this.loadMore();
        setTimeout(() => {
            wx.hideNavigationBarLoading()
        }, 2000);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    //    console.log("用户下拉了");
    // 把数据还原默认值，并重新发送请求
    this.setData({
        shopsList:[],
        limitNum:20,
        dt_shipId:1,
        dt_page:0,
        show:false,
        dt_bottomLength:0
    });
    this.loadMore();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
       wx.showNavigationBarLoading();
    //    wx.showLoading({
    //     title: '加载中',
    //   })
      
      setTimeout(function () {
        // wx.hideLoading()
        wx.hideNavigationBarLoading()

      }, 1000)
        console.log("下拉动作");
        this.loadMore();

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})