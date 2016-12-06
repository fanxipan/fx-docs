.. _jsom-basic-usage-example:

Ví dụ mẫu
=========

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 2-3

   function MainCtrl($fxList) {
      var serviceContext = $fxList.createContext();
      var customerList = serviceContext.getList("Customers");

      var currentItem;

      // Tạo mới 1 list item
      customerList
         .createItemAsync({
            customerName: "Leonard"
         })
         .then(function (listItem) {
            console.log(listItem);
            // {
            //    id: 1,
            //    customerName: "Leonard"
            // }
         });

      // Lấy list item theo id
      customerList.getItemByIdAsync(1)
         .then(function(item) {
            currentItem = item;
         })
         // Cập nhật thuộc tính của list item
         .then(function() {
            currentItem.customerName = "Jubei";
            return customerList.updateItemAsync(currentItem);
         })
         // Xóa list item
         .then(function() {
            return customerList.deleteItemAsync(currentItem);
         });	
   }

   angular.module("my-app").controller("MainCtrl", MainCtrl);