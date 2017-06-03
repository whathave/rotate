var control = {
    domClass: '',
    getById: function(id) {
        return document.getElementById(id);
    },
    wrap: function() {
        return document.getElementsByClassName(this.domClass);
    },
    //获取当前旋转值
    getRotate: function() {
        var image = this.wrap()[0].getElementsByTagName("img");
        return Number(image[0].getAttribute("data-rotate")) || 0;
    },

    trunRight: function() {
        var r = this.getRotate();
        r++
        if (r > 3) r = 0;
        this.rotate(r);
    },

    trunLeft: function() {
        var r = this.getRotate();
        r--;
        if (r < 0) r = 3;
        this.rotate(r);
    },
    //canvas旋转
    rotate: function(r) {

        var canvas = this.getById("canvas") || document.createElement("canvas"),
            context = canvas.getContext("2d"),
            img = this.wrap()[0].getElementsByTagName("img");
        x = 0, y = 0;
        canvas.id = "canvas";
        img[0].style.position = "absolute";
        img[0].style.visibility = "hidden";

        switch (r) {
            case 0:
                canvas.width = img[0].width;
                canvas.height = img[0].height;
                x = 0;
                y = 0;
                break;
            case 1:
                canvas.width = img[0].height;
                canvas.height = img[0].width;
                x = 0;
                y = -img[0].height;
                break;
            case 2:
                canvas.width = img[0].width;
                canvas.height = img[0].height;
                x = -img[0].width;
                y = -img[0].height;
                break;
            case 3:
                canvas.width = img[0].height;
                canvas.height = img[0].width;
                x = -img[0].width;
                y = 0;
                break;
        }
        if (canvas.width > img[0].width) {
            canvas.style.width = img[0].width + "px";
        }
        canvas.style.position = 'relative';
        canvas.style.top = (img[0].height - img[0].width / (canvas.width / canvas.height)) / 2 + 'px';
        context.clearRect(0, 0, img[0].width, img[0].height);
        context.save();
        context.rotate(r * 90 * Math.PI / 180);
        context.drawImage(img[0], x, y, img[0].width, img[0].height)
        context.restore();
        img[0].parentNode.appendChild(canvas);
        img[0].setAttribute("data-rotate", r);
    }
}
