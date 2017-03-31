function shape(cobj,canvas,copy){
    //初始化参数
    this.copy=copy;
    this.cobj=cobj;
    this.canvas=canvas;
    this.fillStyle="#fff";
    this.strokeStyle="#fff";
    this.lineWidth=1;
    this.type="line";
    this.style="stroke";
    this.history=[];
    this.isback=true;
    this.bianNum=5;
    this.jiaoNum=5;
    this.xpsize=10;
}
shape.prototype= {
    //给实例化的对象一个默认的样式
    init: function () {
        this.cobj.isback=true;
        this.cobj.fillStyle = this.fillStyle;
        this.cobj.strokeStyle = this.strokeStyle;
        this.cobj.lineWidth = this.lineWidth;

    },
    //画图形
    draw: function () {
        var that = this;
        that.copy.onmousedown = function (e) {
            that.init()
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.copy.onmousemove = function (e) {
                that.cobj.clearRect(0, 0, that.canvas.width, that.canvas.height)
                if (that.history.length > 0) {
                    that.cobj.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that[that.type](startx, starty, endx, endy)
            }
            that.copy.onmouseup = function () {
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
                var data = that.cobj.getImageData(0, 0, that.canvas.width, that.canvas.height)
                that.history.push(data)

            }
        }

    },
    //画线
    line: function (x, y, x1, y1) {
        this.cobj.beginPath();
        this.cobj.moveTo(x, y);
        this.cobj.lineTo(x1, y1);
        this.cobj.stroke()
    },
    //画矩形
    rect: function (x, y, x1, y1) {
        this.cobj.beginPath();
        var w = x1 - x;
        var h = y1 - y;
        this.cobj.rect(x, y, w, h);
        this.cobj[this.style]()
    },
    //画圆
    arc: function (x, y, x1, y1) {
        this.cobj.beginPath();
        var r = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y))
        this.cobj.arc(x, y, r, 0, 2 * Math.PI);
        this.cobj[this.style]()
    },
    //画多边形
    dbx: function (x, y, x1, y1) {
        var num = this.bianNum;
        var r = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        this.cobj.beginPath();
        var startx = Math.cos(0) * r + x;
        var starty = Math.sin(0) * r + y;
        var angle = 360 / num * Math.PI / 180;
        this.cobj.moveTo(startx, starty)
        for (var i = 1; i < num; i++) {
            this.cobj.lineTo(Math.cos(angle * i) * r + x, Math.sin(angle * i) * r + y)
            this.cobj[this.style]()
        }
        this.cobj.closePath()
        this.cobj[this.style]()

    },
    //画多角形
    djx: function (x, y, x1, y1) {
        var num = this.jiaoNum * 2;
        var r1 = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        var r2 = r1 / 3;
        var angle = 360 / (num) * Math.PI / 180;
        this.cobj.beginPath();
        for (var i = 0; i < num; i++) {
            if (i % 2 == 0) {
                this.cobj.lineTo(Math.cos(angle * i) * r1 + x, Math.sin(angle * i) * r1 + y)
            } else {
                this.cobj.lineTo(Math.cos(angle * i) * r2 + x, Math.sin(angle * i) * r2 + y)
            }
        }
        this.cobj.closePath()
        this.cobj[this.style]()
    },
    //铅笔
    qb:function(){
        var that=this;

    that.copy.onmousedown=function(e){
      
    var startx=e.offsetX;
    var starty=e.offsetY;
        that.cobj.beginPath()
        that.cobj.moveTo(startx,starty)
    that.copy.onmousemove=function(e){

        var endx=e.offsetX;
        var endy=e.offsetY;
        that.cobj.lineTo(endx,endy)
        that.cobj.stroke()
    }
    that.copy.onmouseup=function(){
        that.copy.onmousemove=null;
        that.copy.onmouseup=null;
        var data=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height)
        that.history.push(data)
    }
}
    },
    xpc:function(xpele){
        var that=this;
        that.copy.onmousemove=function(e){
            that.move(e,that,xpele)
        }
        that.copy.onmousemove=function(e){
            var x=e.offsetX;
            var y=e.offsetY;
            that.move(e,that,xpele)
            that.cobj.clearRect(x,y,that.canvas.width,that.canvas.height);
        }
        that.copy.onmouseup=function(e){
            that.move(e,that,xpele);
            that.copy.onmouseup=null;
            that.copy.onmousemove=null;
            var data=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height);
            that.history.push(data);
        }
    },
    move:function(e,that,xpele){
            var that=this;
            that.copy.onmousemove=function(e){
                var ox= e.offsetX;
                var oy= e.offsetY;
                xpele.cssText="display:block;left:ox-that.xpsize/2;top:oy-that.xpsize/2"

                if(xpele.left<0){
                    xpele.left=0;
                }
                if(xpele.left>that.copy.width-that.xpsize/2){
                    xpele.left=that.copy.width-that.xpsize/2;
                }
                if(xpele.top<0){
                    xpele.top=0;
                }
                if(xpele.top>that.copy.height-that.xpsize/2){
                    xpele.top=that.copy.height-that.xpsize/2;
                }
            }
        }
}
