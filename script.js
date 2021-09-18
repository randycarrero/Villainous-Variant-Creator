var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

$("#exportCard").click(function(){
	$("#shani_canvas").get(0).toBlob(function(blob){
		saveAs(blob, "Villainous_Realm.png");
	});
});
    
fabric.util.loadImage('https://duw6wk4ou1qt.cloudfront.net/files/v649/generator/57/men/front/BC3001_men_preview_front_dark.png', (image) => {
    image = new fabric.Image(image);
  image.set({
    width: canvas.width,
    height: canvas.height,
    top: canvas.height / 2,
    left: canvas.width / 2
    });
    canvas.add(image);
    canvas.renderAll();
    }, null, { crossOrigin: 'Anonymous' })
$('#color').on('change', ()=>{
    canvas.setBackgroundColor($('input#color').val())
    canvas.renderAll();
    })
// hero[fate] card location//
      var Herocard3 = new fabric.Rect({
        left: 791,
        top: -60,
        width: 250,
        height: 150,
        stroke: 'red',
        fill: 'grey',
        strokeWidth: 2,
        rx: 10,
        ry: 10,
        opacity: .7,
        selectable: false,
    });
    canvas.add(Herocard3);
    var Herocard1 = new fabric.Rect({
        left: 228,
        top: -60,
        width: 250,
        height: 150,
        stroke: 'red',
        fill: 'grey',
        strokeWidth: 2,
        rx: 10,
        ry: 10,
        opacity: .7,
        selectable: false,
    });
    canvas.add(Herocard1);
    var Herocard2 = new fabric.Rect({
        left: 509,
        top: -60,
        width: 250,
        height: 150,
        stroke: 'red',
        fill: 'grey',
        strokeWidth: 2,
        rx: 10,
        ry: 10,
        opacity: .7,
        selectable: false,
    });
    canvas.add(Herocard2);
    var Herocard4 = new fabric.Rect({
        left: 1070,
        top: -60,
        width: 250,
        height: 150,
        stroke: 'red',
        fill: 'grey',
        strokeWidth: 2,
        rx: 10,
        ry: 10,
        opacity: .7,
        selectable: false,
    });
    canvas.add(Herocard4);
    // Villian Potrait Box //
    document.getElementById('portrait').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var imgObj = new Image();
          imgObj.src = event.target.result;
          imgObj.onload = function() {
            var portrait = new fabric.Image(imgObj);
            portrait.set({
                left: -5,
                top: -10,
                width: 210,
                height: 520,
                stroke: 'red',
                fill:'grey',
                strokeWidth: 2,
                rx:10,
                ry:10,
                opacity: .7,
                selectable: false,
            });
            canvas.add(portrait);
          };
        };
        reader.readAsDataURL(e.target.files[0]);
      };
  //file upload//
document.getElementById('imgLoader1').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function() {
        var image = new fabric.Image(imgObj);
        image.set({
            left: 218,
            top: 22,
            width: 270,
            height: 270,
            stroke: 'red',
            strokeWidth: 2,
            rx:10,
            ry:10,
            selectable: false,
        });
        canvas.add(image);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  document.getElementById('imgLoader2').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function() {
        var image2 = new fabric.Image(imgObj);
        image2.set({
            left: 500,
            top: 22,
            width: 270,
            height: 270,
            stroke: 'red',
            strokeWidth: 2,
            rx:10,
            ry:10,
            selectable: false,
        });
        canvas.add(image2);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  document.getElementById('imgLoader3').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function() {
        var image3 = new fabric.Image(imgObj);
        image3.set({
            left: 782,
            top: 22,
            width: 270,
            height: 270,
            stroke: 'red',
            strokeWidth: 2,
            rx:10,
            ry:10,
            selectable: false,
        });
        canvas.add(image3);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  document.getElementById('imgLoader4').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function() {
        var image4 = new fabric.Image(imgObj);
        image4.set({
            left: 1061,
            top: 22,
            width: 270,
            height: 270,
            stroke: 'red',
            strokeWidth: 2,
            rx:10,
            ry:10,
            selectable: false,
        });
        canvas.add(image4);
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };