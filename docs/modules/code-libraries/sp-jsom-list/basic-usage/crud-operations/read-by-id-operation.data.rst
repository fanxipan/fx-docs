.. _jsom-basic-usage-read-by-id-operations:

Lấy item theo id
----------------

Sử dụng hàm |List.getItemByIdAsync| và truyền vào id của item cần lấy:

.. code-block:: javascript
   :linenos:

   customerList.getItemByIdAsync(1).then(function (customer) {
      console.log(customer);
   });

Kết quả trả về có dạng sau:

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