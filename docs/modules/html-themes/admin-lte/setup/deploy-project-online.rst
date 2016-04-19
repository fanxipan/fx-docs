.. _admin-lte-setup_deploy-online:

Deploy lên Office 365
=====================

1. Mở tab *Properties* của project và điền url
   
   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_online_01.png
      :alt: Điền url của sharepoint site

#. Mở console, ``cd`` đến thư mục project (thư mục chứa file ``gupfile.js``)
#. Gõ lệnh ``gulp release``, lệnh này sẽ tạo ra folder ``release``

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_online_02.png
      :alt: Điền url của sharepoint site

#. Copy toàn bộ file và thư mục trong ``release`` vào module ``App`` của project

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_online_03.png
      :alt: Copy release vào app

   .. note::
      Cần chủ động *include* các file trong 3 thư mục ``app``, ``assets`` và 
      ``deps`` vì VS không tự add các file con nằm trong thư mục vào project. 
      Cách nhanh nhất là *exlucde* cả 3 thư mục này ra rồi *include* vào lại.

#. Deploy project

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_online_04.png
      :alt: Deploy project

   .. hint::
      Có thể bấm ``Ctrl + F5`` để deploy.

#. Vào *Site Contents* để mở app

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_online_05.png
      :alt: Vào site contents để mở app

#. Kết quả

   .. figure:: /_static/images/html-themes/admin-lte/lte_setup_deploy_online_06.png
      :alt: Kết quả