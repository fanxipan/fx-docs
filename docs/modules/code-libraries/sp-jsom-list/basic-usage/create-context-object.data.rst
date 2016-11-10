.. _jsom-basic-usage-create-context-object:

Tạo ServiceContext object
=========================

|ServiceContext| là object dùng để:

   - Quản lý vòng đời (lifetime) cho các object khác như |List|, |ListItem|...
   - Queue các thay đổi của ClientObject (|ListItem|), ví dụ như xóa 1 item +
     tạo mới 1 item + thay đổi property của 1 item khác, sau đó gọi 1 request
     duy nhất để cập nhật các thay đổi này lên server

     .. note::

        Xem thêm phần :ref:`jsom-advance-usage-single-and-batch-request`.

Để tạo một |ServiceContext| object:

   #. Inject service |FxListService| vào trong controller
   
      .. code-block:: javascript
         :linenos:

         function MainCtrl($fxList) {
            // this is our service
            console.log($fxList);
         }

         angular.module("my-app").controller("MainCtrl", MainCtrl);

   #. Dùng hàm |FxListService.createContext| để tạo đối tượng thuộc 
      class |ServiceContext|. Lưu ý tham số truyền vào ``serverRelativeUrl``
      là đường dẫn tương đối đến web muốn tương tác, để trống sẽ lấy 
      web hiện tại.

      .. code-block:: javascript
         :linenos:

         var serviceContext = $fxList.createContext();