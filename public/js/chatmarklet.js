/*
+-----------------------+
| >>                + - |
|           You: ###### |
|-----------------------|
|_hi                    |
|                 hello_|
|_etc.                  |
|                       |
|                       |
|                       |
|                       |
|                       |
|                       |
|                       |
|-----------------------|
+-----------------------+

*/
(function() {
  var host = 'http://chatcoyote.herokuapp.com';
  var chatUrl = host + '/chat?room=&href=' + window.location.href;
  var controlHeight = 20;
  var iFrameHeight = 350;
  var width = 250, height = controlHeight + iFrameHeight;

  var container = document.createElement('div');
  container.setAttribute('id', 'chatcoyote');
  container.style.position = 'fixed';
  container.style.bottom = '0px';
  container.style.right = '0px';
  container.style.height = height + 'px';
  container.style.width = width + 'px';
  container.style.background = '#000000';
  container.style.border = '1px solid';
  container.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  container.style.fontSize = '12px';
  container.style.zIndex = '9999';

  var controls = document.createElement('div');
  controls.style.width = width + 'px';
  controls.style.height = controlHeight + 'px';
  container.appendChild(controls);

  var popper = document.createElement('a');
  popper.setAttribute('target', '_blank');
  popper.setAttribute('href', chatUrl)
  popper.style.float = 'left';
  controls.appendChild(popper);

  var popperImg = document.createElement('img');
  popperImg.setAttribute('src', host + '/images/popout.jpg');
  popperImg.style.height = controlHeight + 'px';
  popper.appendChild(popperImg);

  var expander = document.createElement('a');
  expander.setAttribute('href', '#');
  expander.style.float = 'right';
  expander.onclick = function(e) {
    container.style.bottom = '0px';
    controls.removeChild(expander);
    controls.appendChild(collapser);
    e.preventDefault();
  };

  var expanderImg = document.createElement('img');
  expanderImg.setAttribute('src', host + '/images/expander.png');
  expanderImg.style.height = controlHeight + 'px';
  expander.appendChild(expanderImg);

  var collapser = document.createElement('a');
  collapser.setAttribute('href', '#');
  collapser.style.float = 'right';
  collapser.onclick = function(e) {
    container.style.bottom = '-' + iFrameHeight + 'px';
    controls.removeChild(collapser);
    controls.appendChild(expander);
    e.preventDefault();
  };
  controls.appendChild(collapser);

  var collapserImg = document.createElement('img');
  collapserImg.setAttribute('src', host + '/images/collapser.png');
  collapserImg.style.height = controlHeight + 'px';
  collapser.appendChild(collapserImg);
  
  var iFrame = document.createElement('iframe');
  iFrame.setAttribute('src', chatUrl);
  iFrame.setAttribute('style', 'height:' + iFrameHeight + 'px;width:' + width + 'px');
  iFrame.style.border = 'none';
  container.appendChild(iFrame);

  document.body.appendChild(container);

})();