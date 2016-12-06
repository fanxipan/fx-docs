.. _jsom-changelog-v0.3.0:

v0.3.0
======

Tài liệu

   - Cập nhật :ref:`jsom-basic-usage-example`
   - Thêm nhiều cách :ref:`jsom-basic-usage-update-operations`
   - Thêm phần :ref:`jsom-basic-usage-save-operations`
     
API

   - Bỏ class ``ListBase``
   - Đổi tên hàm 

      + ``List.getByIdAsync`` --> |List.getItemByIdAsync|
      + ``List.getManyAsync`` --> |List.getManyItemsAsync|
      
   - Thêm các hàm 
      
      + |List.createItemAsync|
      + |List.updateItemAsync|
      + |List.saveItemAsync|