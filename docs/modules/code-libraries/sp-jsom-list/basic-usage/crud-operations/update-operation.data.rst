.. _jsom-basic-usage-update-operations:

Cập nhật item
-------------

Lấy ví dụ với object ``customer`` đã lấy về ở phần :ref:`jsom-basic-usage-read-by-id-operations`,
để thay đổi trường ``customerName`` thì làm như sau:

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