/*
 * Default values
 */
const defaults = {
  card: {
    height: 560,
    width: 400,
    borderRadius: 16,
    strokeWidth: 36,
    strokeColour: "#777",
    fillColour: "#444",
    shadow: true,
    shadowColour: "rgba(0,0,0,0.4)",
    shadowBlur: 20,
    shadowOffsetY: 10
  },
  cardStack: {
    number: 4,
    degreesBetween: 9,
    startDegree: -20
  }
};

/*
 * Setup the HTML 5 Canvas and Context
 */
const canvas = document.getElementById("preview-canvas");
let context = null;
if (canvas.getContext)
  context = canvas.getContext("2d");
else 
  alert("Your browser does not seem to support HTML5 Canvas");

function drawCard(ctx, props) {
  if (!props) props = {};
  if (props.x === undefined || props.x === null) console.error("Please specify the x-coordinate");
  if (props.y === undefined || props.y === null) console.error("Please specify the y-coordinate");
  if (props.w === undefined || props.w === null) props.w = defaults.card.width;
  if (props.h === undefined || props.h === null) props.h = defaults.card.height;
  if (props.r === undefined || props.r === null) props.r = defaults.card.borderRadius;
  if (props.sw === undefined || props.sw === null) props.sw = defaults.card.strokeWidth;
  if (props.sc === undefined || props.sc === null) props.sc = defaults.card.strokeColour;
  if (props.fc === undefined || props.fc === null) props.fc = defaults.card.fillColour;
  if (props.shadow === undefined || props.shadow === null) props.shadow = defaults.card.shadow;
  if (props.shadowColour === undefined || props.shadowColour === null) props.shadowColour = defaults.card.shadowColour;
  if (props.shadowBlur === undefined || props.shadowBlur === null) props.shadowBlur = defaults.card.shadowBlur;
  if (props.shadowOffsetY === undefined || props.shadowOffsetY === null) props.shadowOffsetY = defaults.card.shadowOffsetY;
  
  ctx.beginPath();
  ctx.moveTo(props.x+props.r, props.y);
  ctx.arcTo(props.x+props.w, props.y,   props.x+props.w, props.y+props.h, props.r);
  ctx.arcTo(props.x+props.w, props.y+props.h, props.x,   props.y+props.h, props.r);
  ctx.arcTo(props.x,   props.y+props.h, props.x,   props.y,   props.r);
  ctx.arcTo(props.x,   props.y,   props.x+props.w, props.y,   props.r);
  ctx.closePath();
  
  if (props.shadow) {
    ctx.shadowColor = props.shadowColour;
    ctx.shadowBlur = props.shadowBlur;
    ctx.shadowOffsetY = props.shadowOffsetY;
  }
  
  ctx.fillStyle = props.fc;
  ctx.fill();
  
  ctx.shadowColor = 0;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  ctx.save();
  ctx.clip();
  
  if (props.image !== undefined && props.image !== null) {
    ctx.drawImage(props.image, 0, -(props.image.width * 1.375 - props.image.height) / 2, props.image.width, props.image.width * 1.375, props.x, props.y, props.w, props.h);
  }
  
  if (props.sw > 0) {
    ctx.lineWidth = props.sw * 2;
    ctx.strokeStyle = props.sc;
    ctx.stroke();
  }
  
  ctx.restore();
  
  if (props.sw > 0) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = props.sc;
    ctx.stroke();
  }
}
async function loadImage() {
  const imageInput = $("#image").get(0);
  
  if (!imageInput.files || !imageInput.files[0]) return null;
  
  const fileReader = new FileReader();
  return new Promise((resolve, reject) => {
    try {
      fileReader.onload = function(event){
        const img = new Image();
        img.onload = function(){
          resolve(img);
        }
        img.src = event.target.result;
      };
      fileReader.readAsDataURL(imageInput.files[0]);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

async function renderCards() {
  // Clear the preview canvas
  context.clearRect(0, 0, 10000, 10000);
  
  const cardProps = {
    sc: $("#strokeColour").val(),
    sw: $("#strokeWidth").val(),
    fc: $("#fillColour").val(),
    image: await loadImage(),
    r: parseInt($("#borderRadius").val())
  };
  drawCard(context, {
    x: 840,
    y: 150,
    ...cardProps
  })
}

async function renderFinalCard() {
  const finalCanvas = document.createElement("canvas");
  
  finalCanvas.width = 400;
  finalCanvas.height = 560;
  
  const finalContext = finalCanvas.getContext('2d');
  
  finalContext.fillStyle = $("#strokeColour").val();
  finalContext.fillRect(0,0, 400, 560);
  
  drawCard(finalContext, {
    x: 0,
    y: 0,
    sc: $("#strokeColour").val(),
    sw: $("#strokeWidth").val(),
    fc: $("#fillColour").val(),
    r: parseInt($("#borderRadius").val()),
    image: await loadImage(),
    shadow: false
  });
  
  saveAs(finalCanvas.toDataURL(), "Card.png");
}

$(document).ready(function() {
  $('.colour-picker').spectrum({
    type: "component"
  });
  
  renderCards();
  
  // Wire up our event listeners
  $("#fillColour").on('change', renderCards);
  $("#strokeColour").on('change', renderCards);
  $("#strokeWidth").on('input', renderCards);
  $("#borderRadius").on('input', renderCards);
  $("#image").change(renderCards);
  
  // Wire up the export listeners
  $("#exportPreview").click(() => {
    saveAs($("#preview-canvas").get(0).toDataURL(), "Card Preview.png");
  });
  $("#exportCard").click(renderFinalCard);
  
});
