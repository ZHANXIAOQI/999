import  './yy.scss';
import './gitSearch'
import fetch from 'cross-fetch';
fetch('https://v1.itooi.cn/netease/song/newest').then(res=>{
    return res.json()
}).then(data => {
    console.log(data);
    var dom=document.createElement("p");
    var div=document.querySelector("#app");
    div.appendChild(dom);
    dom.style.background=data[0];
    dom.style.width="100px";
    dom.style.height="100px"
 
  })
//   1381084509
// https://v1.itooi.cn/netease/url?id=37239038&quality=flac
