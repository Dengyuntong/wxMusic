function tabbarinit() {
  return [
       { "current":0,
         "pagePath": "/pages/index/index",
         "iconPath": "/imgs/home.png",
         "selectedIconPath": "/imgs/home_on.png",
         "text": "主页"
       },
       {
         "current": 0,
         "pagePath": "/pages/class/index",
         "iconPath": "/imgs/category.png",
         "selectedIconPath": "/imgs/category_on.png",
         "text": "分类"
       },
       {
         "current": 0,
         "pagePath": "/pages/my/index",
         "iconPath": "/imgs/buy.png",
         "selectedIconPath": "/imgs/buy_on.png",
         "text": "我的"
       }
     ]
 
 }
 //tabbar 主入口
 function tabbarmain(bindName = "tabdata", id, target) {
   var that = target;
   var bindData = {};
   var otabbar = tabbarinit();
   otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
   otabbar[id]['current'] = 1;
   bindData[bindName] = otabbar
   that.setData({ bindData });
 }
 
 module.exports = {
   tabbar: tabbarmain
 }