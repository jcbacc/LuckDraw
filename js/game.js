    var wheel = document.getElementById('wheel'); // 转盘
    var arrow = document.getElementById('arrow'); // 转盘按钮
    var footer = document.getElementById('footer'); // 转盘按钮
    var luckDrawCountDom = document.querySelector('.luckDrawCount span'); // 抽奖次数dom
    var gift = localStorage.getItem("gift");
    // 转盘游戏属性
    var gameState = false;          //  游戏状态
    var a = 5;
    var luckDrawCount = localStorage.getItem("number") ? localStorage.getItem("number"): 1; 
    luckDrawCountDom.innerHTML = luckDrawCount;  
    document.querySelector('.luckDrawGift').innerHTML = gift ? '恭喜你获得': '';
    document.querySelector('.Gift').innerHTML = gift ? gift : '';
    
         //  抽奖次数
    var rotateZPositionCount = 0;   //  当前转盘的rotateZ 值
    var preUseRotateZ = 0;          //  上一次已抽奖中奖奖品的RotateZ
    var rotateZ = 360;              //  一圈360deg
    var rotateZCount = 10;          //  旋转圈数的倍数
    var runTime = 6;                //  游戏过度时间
    var num = 158;
    var nums = 0;
		draw();
    // 奖品指针位置
    // 20   一等奖，
    // 158  二等奖，
    // 200  二等奖，
    // 112  三等奖， 
    // 68   四等奖，
    // 计算归着，每次抽奖最终rotateZ值 + 相应的奖品值位置 = (rotateZCount + rotateZPosition[0]) 等于一等奖
    var rotateZPosition = [50, 50, 150];
    const prize = [                 //  奖品设置 传入一个奖项，0，1，2，3，4， 分别是12345等奖
      {
        title: '手气不错哟～恭喜获得',
        prize: '移动电源', 
      },
      {
        title: '手气不错哟～恭喜获得',
        prize: '精美雨伞',
      },
      {
        title: '手气不错哟～恭喜获得',
        prize: '商务笔',
      },
    ];
  
    // 运行游戏
    function gameAction(rotateZPositionIndex){
        // 转盘位置计算规则 一圈360deg 乘以 10圈，加上 奖品 rotateZ值，再减去上一次中奖rotateZ值

        var toRotateZCount = (rotateZPositionCount - nums + num) + rotateZ * rotateZCount*Math.random() + 1000; // 达到圈数位置
        // var toRotateZCount = (rotateZPositionCount - preUseRotateZ + rotateZPosition[rotateZPositionIndex]) + rotateZ * rotateZCount; // 达到圈数位置
        wheel.style.transition = 'transform '+ runTime +'s ease-in-out 0s'; // 过度时间
        wheel.style.transform = 'rotateZ(' + toRotateZCount + 'deg)'; // 旋转
        preUseRotateZ = rotateZPosition[rotateZPositionIndex]; // 上传抽奖的中奖rotateZ
        rotateZPositionCount = toRotateZCount; // 保存当前转盘值
        + luckDrawCount --;  // 游戏次数减一
        localStorage.setItem("number",luckDrawCount);
        // 页面更新抽奖次数
        luckDrawCountDom.innerHTML = luckDrawCount;
        nums = num;
        console.log(toRotateZCount)
        console.log(rotateZPositionIndex)
        console.log(rotateZ)
        
        //  弹出中奖信息
        setTimeout(() => {
            gameState = false; // 设置游戏当前状态
            var d =  parseInt(toRotateZCount/360);
            var i = parseInt((toRotateZCount - d*360)/45);
            console.log(i)
            var index;
            if(i === 1 || i === 3 || i === 5 ||i === 7){
                console.log('商务笔')
                index = 2;
            }
            if(i === 4|| i === 8|| i === 0){
                console.log('精美雨伞')
                index = 1;
            }
            if(i === 2 || i === 6){
                console.log('移动电源')
                index = 0;
            }
            alert(prize[index].title+ '\r\n' + prize[index].prize);
            localStorage.setItem("gift",prize[index].prize);
            document.querySelector('.luckDrawGift').innerHTML = '恭喜你获得';
            document.querySelector('.Gift').innerHTML = prize[index].prize;
        }, runTime*1000);

    }
		
    function draw() {
        var canvas = document.getElementById('my-canvas');//转盘所在画布
        var canvas1 = document.getElementById('my-canvas-bg');//转盘所在画布
        var container = document.getElementById('wheel');
        canvas.width  = 300;
        canvas.height = 300;
        var prizeItems = document.createElement('ul'), // 奖项容器
        turnNum = 1 / num, // 文字旋转 turn 值
        html = []; // 奖项
        var sector = canvas.getContext("2d"); //每一个区域块
        var ctx2 = canvas1.getContext("2d");
        var w = canvas.width;
        var h = canvas.height;
        var len = 8;
        var angle = Math.PI * 2 / len;	
        for (var i = 0; i < len; i++) {
            sector.beginPath();
            sector.moveTo(w / 2, h / 2);
            sector.lineTo(w - 3, h / 2);
            sector.arc(w / 2, h / 2, h / 2, 0, angle);
            sector.lineTo(w / 2, h / 2);
            sector.fill();
            sector.translate(150, 150); // 设置原点为画布中心
            sector.rotate(angle);
            sector.translate(-150, -150); // 恢复画布中心到（0，0）
            sector.save();
            if ((i + 1) === 8) {
                prizeItems.className = 'gb-turntalbe-list';
                container.appendChild(prizeItems);
                prizeItems.innerHTML = html.join('');
            }
        }
       
    }
    // 开始游戏
    arrow.addEventListener('click', function(){
        var flag = false;
        console.log(new Date().getHours())
        console.log(new Date().getMinutes())
        var hour = new Date().getHours();
        var min = new Date().getMinutes();
        if(hour === 9){
            if(min < 30){
                flag = true;
            }
        }
        if(hour === 15){
            if(min > 30){
                flag = true;
            }
        }
        console.log(flag)
        if(!flag) {
            alert('未到抽奖时间');
            return;
        }else{
            if(localStorage.getItem("gift")){
                alert('你已经抽过奖了');
                return;
            }
            // 模拟抽奖
            var rotateZPositionIndex = Math.round(Math.random()* 3);
            // 判断游戏是否进行中
            if(gameState) return;
            // 判断是否还有抽奖资格
            if(luckDrawCount <= 0){
                alert('Sorry 您没有抽奖机会了');
                return;
            }
            gameState = true; // 设置游戏当前状态
            // run game
            gameAction(rotateZPositionIndex);
        }
        
    }, false)

    footer.addEventListener('click', function(){
        a--;
        if(a === 0 ){
            localStorage.removeItem("number");
            localStorage.removeItem("gift");
            location.href = location.href;
            a = 5;
        }
        
    }, false)
    