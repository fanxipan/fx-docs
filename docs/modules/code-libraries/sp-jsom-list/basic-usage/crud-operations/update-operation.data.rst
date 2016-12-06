.. _jsom-basic-usage-update-operations:

Cập nhật item
-------------

Lấy ví dụ với object ``customer`` đã lấy về ở phần :ref:`jsom-basic-usage-read-by-id-operations`,
để thay đổi trường ``customerName`` thì làm như sau:

Cách 1:
+++++++

Thay đổi trực tiếp vào object |ListItem|:

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 1

   customer.customerName = "New customer name"; // not 'Jubei' anymore
   customerList.updateItemAsync(customer).then(function(updatedCustomer) {
      console.log(updatedCustomer.customerName); // -> "New customer name"
      console.log(customer === updatedCustomer); // -> true
   });

Cách 2:
+++++++

Truyền thuộc tính của list item muốn thay đổi vào trong hàm |List.updateItemAsync|:

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 4

   customer.customerName = "New customer name"; // not 'Jubei' anymore
   customerList
      .updateItemAsync(customer, {
         customerName: "New customer name"
      })
      .then(function(updatedCustomer) {
         console.log(updatedCustomer.customerName); // -> "New customer name"
         console.log(customer === updatedCustomer); // -> true
      });

Cách 3:
+++++++

Sử dụng hàm |ListItem.updateAsync|:

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 2, 13

   // Chỉnh sửa object customer rồi gọi hàm updateAsync()
   customer.customerName = "New customer name"; // not 'Jubei' anymore
   customer.updateAsync().then(function (updatedCustomer) {
      console.log(updatedCustomer.customerName); // -> "New customer name"
      console.log(customer === updatedCustomer); // -> true
   });

   // -- hoặc --

   // Truyền luôn giá trị field cần cập nhật vào hàm updateAsync()
   customer
      .updateAsync({
         updatedItem: "New customer name"
      })
      .then(function (updatedCustomer) {
         console.log(updatedCustomer.customerName); // -> "New customer name"
         console.log(customer === updatedCustomer); // -> true
      });

Nếu biết ``id`` của item cần update thì có thể làm như sau (các ví dụ dưới đây giả sử
cần update object ``customer`` có ``id`` = 1):

Cách 4:
+++++++

Gọi hàm |List.updateItemAsync| và truyền riêng rẽ ``id`` của item cần update và
giá trị các field của nó:

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 3-6

   customerList
      .updateItemAsync(
         1, // id của item cần update
         {
            customerName: "New customer name"
         }
      )
      .then(function(updatedCustomer) {
         console.log(updatedCustomer.customerName); // -> "New customer name"
      });

Cách 5:
+++++++

Cũng gọi hàm |List.updateItemAsync| nhưng gộp chung ``id`` của item và giá trị các
field của nó vào 1 object:

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 3

   customerList
      .updateItemAsync({
         id: 1,
         customerName: "New customer name"
      })
      .then(function(updatedCustomer) {
         console.log(updatedCustomer.customerName); // -> "New customer name"
      });

.. note::

   Khi sử dụng các cách cập nhật item thông qua ``id``, nếu trong SharePoint list
   không tồn tại item có ``id`` như vậy thì object ``updatedItem`` có giá trị là ``null``.

Cách 6:
+++++++

Sử dụng hàm |ServiceContext.commitChanges|:

.. code-block:: javascript
   :linenos:

   customer.customerName = "New customer name"; // not 'Jubei' anymore
   serviceContext.commitChanges().then(function() {
      console.log("All changes have been commited to server!");
   });

.. note::
   
   Trong ví dụ trên sử dụng hàm |ServiceContext.commitChanges| để cập nhật tất
   cả những thay đổi của tất cả đối tượng do ``serviceContext`` quản lý. Xem 
   thêm phần :ref:`jsom-advance-usage-single-and-batch-request` để nắm rõ hơn về
   |ServiceContext|.

.. warning::

   Thay đổi dữ liệu các trường dạng `readonly` như ``Author``, ``Created``... 
   sẽ gây ra lỗi