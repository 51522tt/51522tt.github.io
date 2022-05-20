const fym = {
	win: {
		main: {
			showState: true,
			obj: null
		},
		sub: {
			obj: null,
			currentWin: null,
			show: (div) => {
				if (fym.win.sub.currentWin != null) {
					fym.win.sub.hidden()
				}
				fym.win.sub.currentWin = div
				fym.win.sub.currentWin.style.display = 'block';
				fym.win.sub.obj.style.display = "block";
				fym.win.sub.obj.getElementsByClassName('content')[0].appendChild(fym.win.sub.currentWin)
			},
			hidden: () => {
				fym.win.sub.obj.style.display = "none";
				fym.win.sub.currentWin.style.display = "none"
				fym.win.sub.currentWin = null
			}
		}
	}
}



const mainContent = `  <span id="operWin" style="padding: 1px;">

<div>
    <button onclick="openConf('wcConf')" style="width: 100px;">自动外城</button>
</div>
<div ">
    <button onclick=" openConf('fbConf')" style="width: 100px;">自动副本</button>
</div>
<div ">
    <button onclick=" openConf('kxConf')" style="width: 100px;">一键开箱</button>
</div>
<div>
    <button onclick="openConf('fjConf')" style="width: 100px;">一键分解</button>
</div>
<div  >
    <div> <button onclick="openConf('zanzhu')" style="font-size:10px">点击这里，有惊喜</button> </div>
    <div style="display: none;width: 100%;" id="zanzhu">
	<br>
	<div style="font-size:30px;height:50px;">嘘寒问暖，不如给打笔巨款</div>

        <div style="display: flex;">
   <img style="width: 250px;display: inline;" id="zfb" src="https://51522tt.github.io/image/jfb.jpg" > 
   <img style="width: 250px;display: inline;" id="wx" src="https://51522tt.github.io/image/wx.jpg" > 
</div>
</div>

</div>
<div>

</div>
<div>
    <span>作者简介:</span>
	<br>
    <div style="font-size: 50px;text-align: center;margin-top:20px">
        帅
    </div>
		<br>
		<br>
    <span>只此一字,贯穿一生</span>
</div>
<div style="margin-nt">version:v0.0.2-简陋先行版</div>
</span>
<div id="showBtn" style="cursor: pointer;height: 100%;background-color: #f7882e;border-radius: 0 3px 3px 0;"
onclick="changeMainWin()">≤</div>
</div>

<div id="wcConf" style="display: none;">
<div> 外城配置（暂时没空弄）</div>
</div>
<div id="fbConf" style="display: none;">
<div>副本配置（暂时没空弄）</div>
</div>
<div id="kxConf" style="display: none;">
<div>一键开箱（暂时没空弄）</div>
</div>
<div id="fjConf" style="display: none;">
<div style="display: flex;flex-direction: column;">
<div style="">
    <div style="display:flex">装备品质: &nbsp;&nbsp;
        <span style="color: #bebebe;"><input name="灰色" class="pzBox" type="checkbox"
                value="1" />灰色</span>&nbsp;&nbsp;
        <span style="color: #ffffff;"><input name="白色" class="pzBox" type="checkbox"
                value="2" />白色</span>&nbsp;&nbsp;
        <span style="color: #3be643;"><input name="绿色" class="pzBox" type="checkbox"
                value="3" />绿色</span>&nbsp;&nbsp;
        <span style="color: #3489f8;"><input name="蓝色" class="pzBox" type="checkbox"
                value="4" />蓝色</span>&nbsp;&nbsp;
        <span style="color: #9f22f1;"><input name="紫色" class="pzBox" type="checkbox"
                value="5" />紫色</span>&nbsp;&nbsp;
        <span style="color: #ee0909;"><input name="红色" class="pzBox" type="checkbox" disabled
                value="6" />红色</span>&nbsp;&nbsp;
        <span style="color: #f7882e;"><input name="橙色" class="pzBox" type="checkbox" disabled
                value="7" />橙色</span>
    </div>
</div>
<div>
    <button onclick="zbShowBox(3)">查询装备</button>
    <button onclick="startFj()">一键分解</button>
</div>
<div style="border: 1px solid rgb(192, 192, 192);margin-top: 5px;margin-bottom:5px;height:300px;overflow: hidden;overflow-y:scroll">
	<div id="tips"></div>
    <table id="zbShowBox" style="">
    </table>
</div>


</div>`;

function initMoveDiv(div) {
	div.style.cssText += "display:none";
	var x, y;
	var isDrop = false;
	div.onmousedown = (e) => {
		var e = e || window.event;
		x = e.clientX - div.offsetLeft;
		y = e.clientY - div.offsetTop;
		isDrop = true;
	};
	document.onmousemove = (e) => {
		if (isDrop) {
			var e = e || window.event;
			var moveX = e.clientX - x;
			var moveY = e.clientY - y;
			var maxX = document.documentElement.clientWidth - div.offsetWidth;
			var maxY = document.documentElement.clientHeight - div.offsetHeight;
			moveX = Math.min(maxX, Math.max(0, moveX));
			moveY = Math.min(maxY, Math.max(0, moveY));
			div.style.left = `${moveX}px`;
			div.style.top = `${moveY}px`;
		} else {
			return;
		}
	};
	document.onmouseup = () => {
		isDrop = false;
	};
}

function initSubWin() {
	let subWin = document.createElement('div');
	subWin.style.cssText =
		`z-index: 99999; background: rgb(121, 168, 169);position: absolute; width: 500px;left: 30%; top: 166px; border-radius: 5px; padding: 10px;max-height:500px;`;
	subWin.innerHTML = `
        <div ><button onclick="closeConf()">关闭</button></div>
        <div class="content"></div>
    `;
	fym.win.sub.obj = subWin;
	document.body.appendChild(subWin);
	initMoveDiv(subWin);
	return subWin;
}

function openConf(tagId) {
	fym.win.sub.show(document.getElementById(tagId));
}

function closeConf() {
	fym.win.sub.hidden();
}

function changeMainWin() {
	fym.win.main.showState = !fym.win.main.showState;
	if (fym.win.main.showState) {
		document.getElementById("operWin").style.display = "block";
		document.getElementById("showBtn").innerText = "≤";
		fym.win.main.obj.style.left = "8px";
	} else {
		document.getElementById("operWin").style.display = "none";
		document.getElementById("showBtn").innerText = "≥";
		fym.win.main.obj.style.left = "0px";
	}

}

function zbShowItem(items) {
	var zbShouwBox = document.getElementById("zbShowBox");
	zbShouwBox.innerHTML = "";
	if (items.length == 0) {
		document.getElementById("tips").innerText = "莫得东西~~";
		return
	}
	
	let tdnum = items.length;
	let setup = 8;
	let trnum = Math.ceil(tdnum / setup);
	let index = 0
	for (let i = 0; i < tdnum; i++) {
		var tr = document.createElement("tr");
		for (let j = 0; j < setup; j++) {
			if (index < tdnum) {
				var td = document.createElement("td");
				td.innerHTML = `<img src='${items[index++].imgUrl}'/>`;
				tr.appendChild(td);
			}
		}
		zbShouwBox.appendChild(tr);
	}
}

function getZhAttr() {
	let pzobjs = document.getElementsByClassName("pzBox");
	let pzcheckVal = [];
	for (k in pzobjs) {
		if (pzobjs[k].checked) {
			pzcheckVal.push(pzobjs[k].value);
		}
	}
	let zbobjs = document.getElementsByClassName("zbBox");
	let zbcheckVal = [];
	for (k in zbobjs) {
		if (zbobjs[k].checked) {
			zbcheckVal.push(zbobjs[k].value);
		}
	}
	let bkTypebjs = document.getElementsByClassName("bkType");
	let typecheckVal = [];
	for (k in bkTypebjs) {
		if (bkTypebjs[k].checked) {
			typecheckVal.push(bkTypebjs[k].value);
		}
	}
	console.log(pzcheckVal, zbcheckVal, typecheckVal);
	return {
		pz: pzcheckVal,
		zbtype: zbcheckVal,
		bktype: typecheckVal
	}
}


function init() {
	if (document.getElementById("main") != null) {
		console.error("请勿重复初始化！！！");
		return
	}
	//初始化主窗口
	fym.win.main.obj = document.createElement("div");
	fym.win.main.obj.id = 'main';
	fym.win.main.obj.innerHTML = mainContent;
	fym.win.main.obj.style.cssText =
		"z-index: 99999;position: fixed;top:30%;left:8px;background-color:#67aeff;border-radius: 3px;height: 250px;display: flex;";
	//初始化弹窗
	initSubWin();
	// 加入页面
	// document.body.insertBefore(fym.win.main.obj, document.body.children[0])
	document.body.appendChild(fym.win.main.obj)
	return fym;
}

const baseUrl = "http://s123.tc2.9wee.com"

// 宝库对象
const bk = {
	pageNum: 0,
	currentPage: 0,
	itemUriList: [{}]
}
// 物品对象 
var itemObj = {
	pz: "",
	name: "",
	des: "",
	jbOper: ""
}

function jxItemObj(text) {
	const reg1 = /itemClass\.tip\(\[.*?\]\)/
	const reg2 = /prop\.im\(\[.*?\]\)/
	let a1 = text.match(reg1)
	let a2 = text.match(reg2)
	var t = ""
	if (a1 != null) {
		t = eval(a1[0])
	} else {
		t = eval(a2[0])
	}
	const pzReg = /props_name zb_color[0-9]/
	const nameReg = /props_name zb.*?<\/div>/
	const desReg = /items_des.*?<\/div>/
	const jbOperReg = /itemClass\.doDecomposeItem\(.*?\)/
	const jbParamReg = /[0-9]*,.*,.[0-9]*/
	const imgReg = /http:\/\/.*gif/
	let pzr = t.match(pzReg)
	let namer = t.match(nameReg)
	let desr = t.match(desReg)
	let imgr = text.match(imgReg)
	let jbOperr = text.match(jbOperReg)
	pz = pzr != null ? pzr[0].split('props_name zb_color')[1] : null,
		name = namer != null ? namer[0] : null,
		des = desr != null ? desr[0] : null,
		img = imgr != null ? imgr[0] : null
	jbOper = jbOperr != null ? jbOperr[0] : null,

		jbParam = null
	if (jbOper != null) {
		jbParamStr = jbOper.match(jbParamReg)[0]
		jbParams = jbParamStr.split(',')
		jbParam = {
			zbId: jbParams[0].trim(),
			page: jbParams[1].trim(),
			goodType: jbParams[2].trim()
		}
	}
	return {
		"name": name,
		"pz": pz,
		"jbParam": jbParam,
		"imgUrl": img,
		"des": des,
		"jbOper": jbOper
	}

}


// 获取页数 1:当前页 2:总页
function getPage(text) {
	const pageReg = /<span class="page_on">[0-9]*\/[0-9]*<\/span>/
	let a = text.match(pageReg)
	const pageNumReg = /[0-9]*\/[0-9]*/
	let b = a[0].match(pageNumReg)
	return b[0].split('/')
}

// 获取宝库类型
async function getBkTypes() {
	url = `${baseUrl}/index.php?mod=depot/depot&op=show&func=my_depot&page=1&goods_type=3&r=0.7008728766759771`
	const resp = await fetch(url, {
		method: "GET"
	})
	let text = await resp.text()
	let bkTypeReg = /index\.php\?.*<\/li>/g
	var a = text.match(bkTypeReg)
	var temp = []
	for (let i in a) {
		b = a[i].split("','_my_depot_');\">")
		temp.push({
			uri: b[0],
			title: b[1].split('</a></li>')[0]
		})
	}
	return temp
}

// 获取具体宝库分类数据
async function getBkItem(uri, data) {
	let url = `${baseUrl}/${uri}&page=${data['page']}`
	const resp = await fetch(url, {
		method: "GET"
	})
	const res = await resp.text()
	return res
}

// 解析宝库分类数据为具体物品
// function jxBkItemText(text) {
//     const reg1 = /itemClass\.tip\(\[.*?\]\)/g
//     const reg2 = /prop\.im\(\[.*?\]\)/g
//     let a1 = text.match(reg1)
//     let a2 = text.match(reg2)
//     if (a1 != null) {
//         if (a2 != null) {
//             return a1.concat(a2)
//         }
//         return a1
//     }else{
//         return a2
//     }
// }
function jxBkItemText(text) {
	const reg1 = /<img src="http:\/\/static\.tc2\.9wee\.com\/.*?\/>/g
	let a1 = text.match(reg1)
	return a1
}
// 根据分页批量获取
async function getBkItemAll(uri, pageNum) {
	var temp = []
	for (let i = 1; i <= pageNum; i++) {
		let res = await getBkItem(uri, {
			'page': i
		})
		temp = temp.concat(jxBkItemText(res))
		// temp.push(jxBkItemText(res))
	}
	return temp
}


// 匹配装备类型
async function showZbByTypeId(typeId) {
	bk.itemUriList = await getBkTypes()
	console.log("bk",bk.itemUriList)
	let bkItemText = await getBkItem(bk.itemUriList[typeId]['uri'], {
		'page': 1
	})
	// console.log(bkItemText)
	console.log('当前访问：', bk.itemUriList[typeId])
	let page = getPage(bkItemText)
	bk['currentPage'] = page[0]
	bk['pageNum'] = page[1]
	console.log("当前宝库：", bk)
	let res = await getBkItemAll(bk.itemUriList[typeId]['uri'], bk.pageNum)
	let temp = []
	for (let i in res) {
		temp.push(jxItemObj(res[i]))
	}
	return temp
}
async function zbShowBox() {
	document.getElementById("tips").innerText = "正在查询..."
	let a = getZhAttr();
	// let t = await showZbByTypeId(a.bktype[0])
	let t = await showZbByTypeId(3)
	let temp = []
	if (a.pz.length != 0) {
		for (let i in t) {
			if (t[i].pz != null && a.pz.includes(String(t[i].pz))&&t[i].jbOper != null) {
				temp.push(t[i])
			}
		}
	} else {
		for (let i in t) {
			if (t[i].pz != null && t[i].jbOper != null) {
				temp.push(t[i])
			}
		}
	}
	zbShowItem(temp)
	document.getElementById("tips").innerText = `已查询:${temp.length}`;
}

async function startFj() {
	document.getElementById("tips").innerText = `正在查询...`
	let a = getZhAttr();
	// let t = await showZbByTypeId(a.bktype[0])
	let t = await showZbByTypeId(3)
	let temp = []
	if (a.pz.length != 0) {
		for (let i in t) {
			if (t[i].pz != null && a.pz.includes(String(t[i].pz))) {
				temp.push(t[i])
			}
		}
	} else {
		temp = t
	}
	
	let count = 0
	temp1 = []
	document.getElementById("tips").innerText = `正在分解以下装备`
	for (let i in temp) {
		if (temp[i].jbOper != null && temp[i].pz <6) {
			temp1.push(temp[i])
			await fj(temp[i].jbParam)
		}
	}
	zbShowItem(temp1)
	if (temp1.length == 0){
		document.getElementById("tips").innerText = `无可分解装备哦～`
	}else{
		document.getElementById("tips").innerText = `已分解以下装备:${temp1.length},点击“查询装备”刷新`
	}

}


async function toFjzb(zhId, page, goodType) {
	const formData = new FormData();
	formData.append("item_hero_id", zhId)
	formData.append("page", page)
	formData.append("good_type", goodType)
	const req = await fetch(
		'http://s123.tc2.9wee.com/index.php?mod=item/item&op=do&func=decompose_item&r=0.6903758802079241', {
			method: "POST",
			body: formData
		})

	const res = await req.text()
	console.log(res)

}


async function fj(param) {
	await toFjzb(param['zbId'], param['page'], param['goodType'])
}


// var rrr = await start(3)
// for(let i in rrr){
// 	if(rrr[i].pz != null&&rrr[i].jbParam){
// 		if(rrr[i].pz <= 4){
// 			await fj(rrr[i].jbParam)
// 		}
// 	}
// }
init()