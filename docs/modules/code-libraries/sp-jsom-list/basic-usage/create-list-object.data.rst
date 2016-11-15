.. _jsom-basic-usage-create-list-object:

Tạo List object
===============

Sử dụng hàm |ServiceContext.getList| để tạo đối tượng |List|:

.. code-block:: javascript
   :linenos:

   var customerList = serviceContext.getList("Customers");

.. note::

   Đây là cách tạo |List| object đơn giản nhất. Hàm |ServiceContext.getList| có 
   thể nhận object |IListConfigLiteral| làm tham số để tinh chỉnh phương thức 
   hoạt động của list.

Với |List| object được tạo như trên, khi lấy item từ server:

.. code-block:: javascript
   :linenos:

   customerList.getByIdAsync(1).then(function (customer) {
      console.log(customer);
   });

thì các trường sau của SharePoint list sẽ được lấy về cho |ListItem|:

   - Các trường được định nghĩa ở |ListBase.defaultFieldsLiteral|
   - Các trường người dùng định nghĩa thêm vào SharePoint list
     
Trong ví dụ trên thì object ``customer`` sẽ có dạng như sau:

.. code-block:: javascript
   :linenos:

   {
      id: 1,

      // default fields:
      title: "Title",
      author: "Author",
      editor: "Editor",
      created: <Date> object,
      modified: <Date> object,
      uniqueId: "fa773dda-1267-49d2-87ef-d65e3353ab7c",

      // user fields:
      customerName: "Jubei",
      address: "Hanoi, Vietnam"
   }
    
.. note::
   
   Để chỉ định chính xác những trường nào sẽ được lấy về cho item, xem thêm phần
   :ref:`jsom-advance-usage-list-definition-fields-config`