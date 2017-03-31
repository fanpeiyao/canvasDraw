window.onload=function(){
        var canvas=document.getElementsByTagName("canvas")[0];
        var cobj=canvas.getContext("2d")
    var copy=document.getElementsByClassName("copy")[0]
        var obj=new shape(cobj,canvas,copy)
    //后退
        var back=document.getElementsByClassName("back")[0];
        back.onclick=function(){
            if(obj.history.length==0){
                cobj.clearRect(0,0,canvas.width,canvas.height)
                alert("不能后退了哦")
                return;
            }
            if(obj.isback){
                obj.history.pop();
                var data=obj.history.pop();


            }else{
                var data=obj.history.pop()
            }
            cobj.putImageData(data,0,0);
            obj.isback=false;
        }
        //清空
    var qk=document.getElementsByClassName("qk")[0]
    qk.onclick=function(){
        var yes=confirm("是否清空");
        if(yes){
            cobj.clearRect(0,0,canvas.width,canvas.height);
            obj.history=[];
        }
    }

        //画图
        var x=document.getElementById("x")
        x.onclick=function(){
            obj.type="line";
            obj.draw()
        }
        var f=document.getElementById("f")
        f.onclick=function(){
            obj.type="rect";
            obj.draw()
        }
        var y=document.getElementById("y")
        y.onclick=function(){
            obj.type="arc";
            obj.draw()
        }
        var b=document.getElementById("b")
        b.onclick=function(){
            var num=prompt("请输入边数");
            obj.bianNum=num;
            obj.type="dbx";
            obj.draw()
        }
        var j=document.getElementById("j")
        j.onclick=function(){
            var num=prompt("请输入角数")
            obj.jiaoNum=num
            obj.type="djx";
            obj.draw()
        }
        var q=document.getElementById("q")
        q.onclick=function(){
            obj.type="qb";
            obj.draw()
        }
    //线条粗细
        var se1=document.getElementsByClassName("xt-c")[0]
        se1.onclick=function(){
            obj.lineWidth=10
            obj.draw()
        }
        var se2=document.getElementsByClassName("xt-z")[0]
        se2.onclick=function(){
            obj.lineWidth=5
            obj.draw()
        }
        var se3=document.getElementsByClassName("xt-x")[0]
        se3.onclick=function(){
            obj.lineWidth=1
            obj.draw()
        }
    //填充 描边
    var tc=document.getElementsByClassName("fi")[0]
    var mb=document.getElementsByClassName("st")[0]
    tc.onclick=function(){
        obj.style="fill"
        obj.draw()
    }
    mb.onclick=function(){
        obj.style="stroke"
        obj.draw()
    }
    //颜色
    var ys=document.getElementsByClassName("ys")[0]
    ys.onchange=function(){
        if(obj.style=="stroke"){
            obj.strokeStyle=this.value;
            obj.draw();
        }else{
            obj.fillStyle=this.value;
            obj.draw()
        }
    }

    //保存
    var bc=document.getElementsByClassName("bc")[0]
        bc.onclick=function(){
        var yes=confirm("是否保存");
        if(yes){
            var url=canvas.toDataURL().replace("data:image/png","data:stream/octet");
            location.href=url;
        }
    }
    //新建
    var xj=document.getElementsByClassName("xj")[0]
    xj.onclick=function(){
        var yes=confirm("是否新建");
        if(yes){
            var url=canvas.toDataURL().replace("data:image/png","data:stream/octet");
            location.href=url;
            cobj.clearRect(0,0,canvas.width,canvas.height,copy);
            obj.history=[];
        }
    }
    //橡皮擦
    var xp=document.getElementsByClassName("xp")[0]
    xp.onclick=function(){
        obj.type="xpc"
    }
}
