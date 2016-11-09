.. _admin-lte-setup_copy-template:

Copy template project 
=====================

1. Mở TFS, tìm đến solution ``Prototype.AdminLTE.SPApp`` theo đường dẫn::

      $/Fanxipan Projects/Fanxipan/2016Apps/Core/Prototype.AdminLTE.SPApp

   .. warning:: 
      **Không nên mở trực tiếp solution này bằng Visual Studio.** Một số 
      extensions của VS sẽ tự động đọc file ``package.json`` và ``bower.json`` 
      rồi tạo ra thư mục ``node_modules`` và ``bower_components``. Hai thư mục 
      này chứa nhiều file có đường dẫn rất dài, rất khó cho việc copy.

#. Mở thư mục chứa solution ``Prototype.AdminLTE.SPApp``:

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_copy_project_01.png
      :alt: Thư mục chứa solution

#. :bg-highlight:`Copy` thư mục này sang thư mục cần làm (nên cho vào thư
   mục nằm trong TFS). Trong ví dụ là copy vào thư mục gốc của TFS:

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_copy_project_02.png
      :alt: Thư mục mới của solution

   .. danger::
       Không chỉnh sửa vào project đã có sẵn.

#. Mở solution :bg-strong-highlight:`vừa mới copy` bằng Visual Studio, chuột
   phải vào solution và chọn *Add Solution to Source Control...*

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_copy_project_03.png
      :alt: Add solution to source Control

      Thêm solution vừa tạo vào TFS

   .. hint::
       Nên check-in solution luôn sau này làm nhỡ bị lỗi thì đỡ phải làm lại nhiều.