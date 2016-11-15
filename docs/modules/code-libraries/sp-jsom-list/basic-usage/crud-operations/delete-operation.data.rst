.. _jsom-basic-usage-delete-operations:

Xóa item
--------

Dùng hàm |List.deleteItemAsync| để xóa list item, truyền vào đối tượng 
|ListItem| cần xóa:

.. code::

   customerList.deleteItemAsync(customer).then(function() {
      console.log("Item deleted!");
   });