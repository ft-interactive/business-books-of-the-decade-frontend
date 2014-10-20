'use strict';

onDomReady(function () {

  require('fastclick')(document.body); // github.com/ftlabs/fastclick

  /* ADD INTERACTIVITY HERE! */











  // Now unhide everything by removing the `invisible` class from the body
  document.body.className = document.body.className.replace(/\binvisible\b/, '');
});
