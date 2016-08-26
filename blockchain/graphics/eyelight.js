// document.documentElement.onload = function() { 
function initEyescribe() { 
  console.log("initEyescribe");
  console.log(navigator.userAgent.toLowerCase());

  if (-1 == navigator.userAgent.toLowerCase().indexOf("firefox")) {
    console.log("indexOf: " + navigator.userAgent.toLowerCase().indexOf("firefox"));
    console.log("inside conditional");

    // the zoom doesn't currently work in Firefox, so we'll just stick to links
    var hilites = document.querySelectorAll(".hilite");
    for (var i = 0, iLen = hilites.length; iLen > i; i++) {
      var hiliteEl = hilites[i];
      hiliteEl.addEventListener("mouseover", hilite, false);
      hiliteEl.addEventListener("mouseout", lolite, false);
      if (!hiliteEl.id) {
        var titleEl = hiliteEl.querySelector("title");
        
        console.log("textContent 3");
        var titleID = titleEl.textContent.replace(/\W+/g, "-");
        var dupeID = document.getElementById(titleID);
        var u = 1;
        while (dupeID) {
          u++;
          dupeID = document.getElementById(titleID + "_" + u);
        }
        if (u > 1) {
          titleID += "_" + u;
        }
        hiliteEl.setAttribute( "id", titleID);
      }
    }
  }
}

function hilite(evt) { 
  // console.log("hilite");
  var el = evt.target;
  var magnifier = document.getElementById("hilite-magnifier");
  var masker = document.getElementById("hilite-masker");
  var clip = document.getElementById("hilite-clip-use");

  var id = el.getAttribute("id");
  var scale = parseFloat(el.getAttribute("data-zoom"));
  if (!scale) {
    scale = 1.3;
  }
  var bbox = el.getBBox();
  
  var cx = (-bbox.x + ((bbox.x/scale) + ((bbox.width/2)/scale))) - ((bbox.width/2));
  if (-bbox.x > cx) { 
    cx = -bbox.x;
  }
  var cy = -bbox.y + ((bbox.y/scale) + ((bbox.height/2)/scale)) - ((bbox.height/2));
  if (-bbox.y > cy) { 
    cy = -bbox.y;
  }

  masker.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + id); 
  clip.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + id);


  magnifier.setAttribute( "x", cx);
  magnifier.setAttribute( "y", cy);
  magnifier.setAttribute( "transform", "scale(" + scale + ")");

  var maskVal = el.getAttribute("data-mask");
  if (maskVal) {
    var mask = document.getElementById("image-mask");
    mask.setAttribute( "opacity", 0.05);
  }
}

function lolite(evt) { 
  // console.log("lolite");
  var masker = document.getElementById("hilite-masker");
  var clip = document.getElementById("hilite-clip-use");
  
  masker.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#"); 
  clip.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#");

  var mask = document.getElementById("image-mask");
  mask.setAttribute( "opacity", 1);
}