import fetch from "cross-fetch";

function getSearchResultApi(search) {
    return `https://api.github.com/search/repositories?q=${search}&sort=stars`
}

// 创建搜索功能容器
let page = document.createElement('div')

document.body.appendChild(page)
page.classList.add("page");

// 创建一个搜索输入框
let input = document.createElement('input')

page.appendChild(input)

// 创建一个搜索按钮
let searchBtn = document.createElement('button')

searchBtn.innerHTML = 'search'

page.appendChild(searchBtn)


// 展示搜索列表元素
let resultView = document.createElement('div');

page.appendChild(resultView)
resultView.classList.add("list");

// 给搜索按钮添加点击查询功能呢
searchBtn.onclick = function () {
    // 点击搜索按钮进行搜索请求
    // 获取输入框中的文本内容
    let str = input.value.trim();
    if (str) { // 搜索内容不为空时,开始搜索
        let url = getSearchResultApi(str)
        getDataFromServer(url)
    }
}

function getDataFromServer(url) {

    fetch(url) // 如果页面与请求服务器是同一个服务器的则请求时可以忽略域名和端口号
        .then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        })
        .then(data => {
            console.log(data, 'success');
            creatResult(data.items)
        })
        .catch(err => {
            console.error(err, 'error');
        });

}

function creatResult(itemsArr) {
    let list = ''
    for (let i = 0; i < itemsArr.length; i++) {
        let item = itemsArr[i]
        let str = `
        <div>
            <a href="${item.html_url}">${item.full_name}</a>
            <p>${item.description}</p>
        </div> 
        `
        list += str
    }
    resultView.innerHTML = list
}

