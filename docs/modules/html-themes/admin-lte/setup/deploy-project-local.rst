.. _admin-lte-setup_deploy-local:

Deploy vào webapp trên local
============================

**TL;DR;** Để deploy được trên local thì cần mở được webapp bằng *Solution
Explorer* và copy các file code vào thư mục webapp này.

.. _admin-lte-setup_open-webapp-folder:

Mở webapp bằng Solution Explorer
--------------------------------

1. Mở webapp bằng IE và đăng nhập
#. Chuột phải vào My Computer chọn *Map network drive...*

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_local_01.png
      :alt: Chọn Map network drive...

#. Chọn tên ổ và điền đường dẫn của webapp

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_local_02.png
      :alt: Điền đường dẫn của webapp

#. Điền thông tin đăng nhập
#. Kết quả
   
   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_local_03.png
      :alt: Kết quả

.. _admin-lte-setup_gulp-deploy-local:

Deploy vào webapp bằng Gulp
---------------------------

1. Mở console, ``cd`` đến thư mục project (thư mục chứa file ``gulpfile.js``)
   
   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_local_04.png
      :alt: cd đến thư mục chưa project

#. Gõ lệnh ``npm install & bower install``, chờ đến khi chạy xong.
#. Gõ lệnh ``gulp deploy-full --path Y:/``. Lưu ý tên của ổ có thể thay đổi, tùy
   vào lúc map ổ đã chọn tên ổ là gì thì bây giờ điền tên đó vào.

   .. hint::
      Nếu chọn tên ổ là ``Y`` thì không cần gõ ``--path Y:/``

#. Vào thư mục webapp, kiểm tra nếu có thư mục ``FX`` và file ``default.aspx``
   bị thay đổi là thành công

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_local_05.png
      :alt: Thư mục FX và file default.aspx

#. Mở webapp trên trình duyệt

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_local_06.png
      :alt: Mở webapp trên trình duyệt