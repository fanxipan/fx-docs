.. _jsom-setup-module:

Thêm module vào app
===================

Thêm đoạn code sau vào ``app.js``:

.. code:: javascript
   
   var appDeps = [
      "fx.sharepoint.lists.jsom"
   ];

   angular.module("my-app", appDeps);    