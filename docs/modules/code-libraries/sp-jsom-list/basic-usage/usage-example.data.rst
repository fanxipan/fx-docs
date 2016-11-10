.. _jsom-basic-usage-example:

Ví dụ mẫu
=========

.. code-block:: javascript
   :linenos:

   function MainCtrl($fxList) {
      var serviceContext = $fxList.createContext();
      var customerList = serviceContext.getList("Customers");

      var currentItem;

      // Lấy list item theo id
      customerList.getByIdAsync(1)
         .then(function(item) {
            currentItem = item;
         })
         // Cập nhật thuộc tính của list item
         .then(function() {
            currentItem.customerName = "Jubei";
            return serviceContext.commitChanges();
         })
         // Xóa list item
         .then(function() {
            currentItem.deleteObject();
            return serviceContext.commitChanges();
         });	
   }

   angular.module("my-app").controller("MainCtrl", MainCtrl);