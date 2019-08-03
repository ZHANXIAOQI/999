//到npm官网下载cross-fetch包,并引入该包
import fetch from "cross-fetch";
//创建HTML容器
let page=document.createElement("div");
document.body.appendChild(page);
let input=document.createElement("input");
page.appendChild(input);
let searchBtn=document.createElement("button");
page.appendChild(searchBtn);
let resultView=document.createElement("div");
page.appendChild(resultView);
searchBtn.onclick=function(){
    //str是用户输入的值
    let str=input.value.trim();
    //如果有值则去服务端请求数据
    //需要拿到请求数据的地址https://api.github.com/search/repositories?q=${str}&sort=starts
    //q 和sort 是服务器提供的参数key
    //url这个数据的地址需要通过cross-fetch或者AJAX取到我们需要渲染到页面上的数据
    if(str){
        let url=getSearchResultApi(str);
        getDataFromSever(url);
    }
}


function getSearchResultApi(search){
    return `https://api.github.com/search/repositories?q=${search}&sort=stars`
};
function getDataFromSever(url){
    fetch(url)
    .then(res=>{
        // if(res.status>=400){
        //     throw new Error("Bad response from server");
        // }
        return res.json();
    }).then(data=>{
        console.log(data,'success');
        createResult(data.items)
    })
    // .catch(err=>{
    //     console.log(err,'error');
    // })
};
//这是将数据渲染到页面上的函数
function createResult(itemsArr){//itemsArr是请求到的数据内容中你所需要渲染的部分内容的头头
    //list 是最后遍历出来的数据
    let list="";
    for(let i=0;i<itemsArr.length;i++){
        let item=itemsArr[i];
        let str=`
        <div>
            <a href="${item.html_url}">${item.full_name}</a>
            <p>${item.description}</p>
        </div>
        `
        list+=str;
    }
    resultView.innerHTML=list;
}