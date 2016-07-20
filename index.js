

$(document).ready(function () {


    var canvas = new fabric.Canvas('canvas');

    $('#save').on('click', function () {
        canvas.deactivateAllWithDispatch();
        var filename = $('#filename').val();
        var a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = filename + '.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    $('#removeObj').on('click',function(){
        if(canvas.getActiveObject())
            canvas.getActiveObject().remove();
        if(canvas.getObjects().length  <= 1){
            $('#removeObj').hide();
        }

    });

    $('.imagepicker ul li,.stickers ul li').on('click', function () {
        var id = $(this).data("id");
        var img = new Image();
        var isSticker = $(this).hasClass('stick');
        img.src = isSticker ? "assets/stickers/"  + id + '.png' :  'assets/' + id + '.png';
        img.onload = function () {
            var maxWidth =  canvas.width * 0.4;
            var maxHeight = canvas.width * 0.4;
            if(isSticker){
                maxHeight = canvas.width * 0.15;
                maxWidth = canvas.width * 0.15;
            }
            var w = img.width;
            var h = img.height;

            if (w > maxWidth) {
                ratio = maxWidth / w;
                img.width = maxWidth;
                img.height = h * ratio;
                h = h * ratio;
                w = w * ratio;
            }

            if (h > maxHeight) {
                ratio = maxHeight / h;
                img.width = w * ratio;
                img.height = maxHeight;
                h = h * ratio;
                w = w * ratio;
            }
            var instance = new fabric.Image(img);

            canvas.add(instance);
            if(canvas.getObjects().length  > 1){
            $('#removeObj').show();
        }
        };
    });

    $('#right').on('click',function(){
        $('.imagepicker ul').fadeOut(400,function(){
            $('.stickers ul').fadeIn(400);
        });
    });

    $('#left').on('click',function(){
        $('.stickers ul').fadeOut(400,function(){
            $('.imagepicker ul').fadeIn(400);
        });
    });

    Dropzone.options.dropzone = {
        paramName: "file",
        maxFilesize: 15,
        uploadMultiple: false,
        parallelUploads: 1,
        maxFiles: 1,
        dictDefaultMessage: "Drop your sexy image here!",
        accept: function (file, done) {
            $('#dropzone').hide();
            $('#canvas').show()
            $('#canvas').addClass('animated fadeIn');
            $('.imagepicker ul').fadeIn(500);
           
        },
        init: function () {
            this.on("addedfile", function (file) {
                if (this.files[1] != null) {
                    this.removeFile(this.files[0]);
                }
                var reader = new FileReader();
                reader.addEventListener("load", function (event) {
                    var img = new Image();
                    img.src = event.target.result;

                    var maxHeight = window.innerHeight * 0.75;
                    var maxWidth = window.innerWidth * 0.75;
                    var ratio = 0;
                    var w = img.width;
                    var h = img.height;

                    if (w > maxWidth) {
                        ratio = maxWidth / w;
                        img.width = maxWidth;
                        img.height = h * ratio;
                        h = h * ratio;
                        w = w * ratio;
                    }

                    if (h > maxHeight) {
                        ratio = maxHeight / h;
                        img.width = w * ratio;
                        img.height = maxHeight;
                        h = h * ratio;
                        w = w * ratio;
                    }
                    $('.canvas-container').css({
                        "marginTop": "0",
                        "marginRight": "auto",
                        "marginBottom": "0",
                        "marginLeft": "auto"
                    })
                    canvas.setWidth(img.width);
                    canvas.setHeight(img.height);
                    var instance = new fabric.Image(img);
                    canvas.add(instance);
                    canvas.item(0).selectable = false;
                });
                reader.readAsDataURL(file);
            });
        }

    };
});