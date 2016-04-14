.. _setup-git:

|git-icon| Git
==============

|git|_ là hệ thống quản lý phiên bản, được dùng để quản lý mã nguồn. |git|_ có
chức năng tương tự như Team Foundation Server của Microsoft.

Do các package của |bower|_ (xem phần `cài đặt bên dưới <setup-bower_>`_) chủ
yếu được cài đặt trên |git|_ nên chúng ta cần phải cài đặt thêm cả |git|_.

Link tải `git version >= v2.8.1 <git-download_>`_

Tiến hành cài đặt, các options lựa chọn như sau:

.. figure:: /_static/images/dev-workflow/install_git_01.png
   :alt: Bỏ Git GUI và giữ lại Git Bash

   Bỏ Git GUI và giữ lại Git Bash

.. figure:: /_static/images/dev-workflow/install_git_02.png
   :alt: Chọn Use Git from the Windows Command Promt

   Chọn Use Git from the Windows Command Promt

:bg-highlight:`Các lựa chọn phía sau để mặc định.` Sau khi cài đặt xong kiểm
tra lại bằng cách gõ lệnh::
	
	git --version

Nếu kết quả như sau là thành công:

.. figure:: /_static/images/dev-workflow/install_git_03.png
   :alt: Kiểm tra phiên bản của Git

   (Phiên bản có thể khác)

.. _git-home: https://git-scm.com/
.. _git-download: https://git-scm.com/download/win

.. |git| replace:: Git
.. _git: git-home_

.. |git-icon| image:: /_static/icons/git_64x64.png
              :width: 64px