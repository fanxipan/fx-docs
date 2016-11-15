.. _jsom-basic-usage-create-operations:

Tạo mới item
------------

Dùng hàm |List.createItemAsync| để tạo mới 1 list item:

.. code-block:: javascript
   :linenos:

   customerList
      .createItemAsync({
         customerName: "Jubei on new record",
         age: 27
      })
      .then(function (customer) {
         console.log(customer);
      });

Dữ liệu trả về có dạng như sau:

.. code-block:: javascript
   :linenos:

   {
      id: 3,

      // default fields
      author: <Author>
      created: <Date>
      ...

      // user fields
      customerName: "Jubei on new record",
      age: 27
   }