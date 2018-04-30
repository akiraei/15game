let clickTime = 0;

let answer = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,"blank"]]

let randomer = () => {
    let a1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,"blank"].sort(function(a, b){return 0.5 - Math.random()})
    console.log("a1", a1)
    return completeFinder(a1) ? a1 : randomer()
}

function lister (x) {
let list = [[],[],[],[]]
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        list[i][j] = x[i*4+j]
    }
}
return list;
}

let list = lister(randomer())  // global_list

let cellList = document.querySelectorAll('.cell')

// let lowDimension = (x) => {
//     let re = [];
//     for(let i = 0; i < x.length; i++) {
//         console.log(1, i, x[i], re)
//         re = re.concat(x[i])
//         console.log(2, i, x[i], re)  
//     }
//     return re;
// }



function locator (x) {
    console.log("locator")
    let r = parseInt(x.getAttribute('row'))
    let c = parseInt(x.getAttribute('column'))
    return [r,c]
}


function search (y,x) {
    console.log(x,y)
    let t = "none"
    if(x>0 && t === "none"){
        console.log("get1", "t",t, "x", x, "y", y, "value", list[y][x-1])
        t = (list[y][x-1] === "blank") ? [y,x-1] : "none"
    }
    if(x<list[0].length-1 && t === "none"){
        console.log("get2", "t",t, "x", x, "y", y, "value", list[y][x+1])
        t = (list[y][x+1] === "blank") ? [y,x+1] : "none"
    }
    if(y>0 && t === "none"){
        console.log("get3", "t",t, "x", x, "y", y, "value", list[y-1][x])
        t = (list[y-1][x] === "blank") ? [y-1,x] : "none"
    }
    if(y < list.length -1 && t === "none"){
        console.log("get4", "t",t, "x", x, "y", y, "value", list[y+1][x])
        t = (list[y+1][x] === "blank") ? [y+1,x] : "none"
    }
    console.log("get return", "t", t)
    return t;
}; // global_list




function replacer (a,b) {
 if(search(a,b) !== "none") {
     console.log("replacer/", "target R:",search(a,b)[0], "targat C:", search(a,b)[1] )
     list[search(a,b)[0]][search(a,b)[1]] = list[a][b];
     list[a][b] = "blank"
 }
} // global_list

function reflector () {
    for (let i = 0; i < cellList.length; i++) {
        cellList[i].textContent = list[Math.floor(i/list.length)][i%list.length]
    }
    document.querySelector(".clickTime").textContent = clickTime
} // global_list



function actor (x) {
    let [a,b] = locator(x)
    console.log("actor","a",a,"b",b)
    replacer(a,b)
    clickTime++
    reflector()
    completeFinder(list) ? (document.querySelector(".answer").textContent = "You Did It") : ""
    }



for(let i = 0; i < cellList.length; i++) {
    let t = cellList[i]
    t.addEventListener("click", function () {
        actor(t)
    } )
}

function completeFinder (x) {
    let num = 0;
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x[0].length; j++) {
            (x[i][j] === answer[i][j]) ? num++ : ""
        }
    }
     return (num > 0) ? false : true;
}

reflector()