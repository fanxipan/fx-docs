.. _dev-workflow-tools:

Cài đặt môi trường
******************

Cần cài đặt các tool sau (một số tool có thể cài đặt hoặc không):

* :ref:`setup-nodejs`
* :ref:`setup-cmder`
* :ref:`setup-bower`
* :ref:`setup-gulp`

.. _setup-nodejs:

Node.js
=======

`Node.js`_ là một platform dùng để phát triển các ứng dụng bằng ngôn ngữ 
JavaScript. Một số ứng dụng cụ thể sẽ được dùng đến như `Bower <setup-bower_>`_, 
`Gulp <setup-gulp_>`_...

Vào `trang chủ Node.js <nodejs-home_>`_ để tải. Chọn phiên bản 4 (tại thời điểm 
viết là `node-v4.4.3LTS`_) tải về và cài đặt:

.. _nodejs-home: https://nodejs.org/en/
.. _node-v4.4.3LTS: https://nodejs.org/dist/v4.4.3/node-v4.4.3-x64.msi

.. figure:: /_static/images/dev-workflow/install_node_01.png
   :alt: cài đặt nodejs

   Để mặc định các lựa chọn khi cài đặt.

Để kiểm tra đã cài đặt thành công hay chưa thì bật cmd và gõ lệnh::

	node --version

Nếu thấy kết quả như sau thì đã thành công (tên version có thể khác):

.. figure:: /_static/images/dev-workflow/install_node_02.png
   :alt: kiểm tra cài đặt nodejs

   Hiển thị phiên bản ra console.

.. _setup-cmder:

Cmder (nên cài)
===============

Các tool đang được cài đặt sẽ được dùng chủ yếu bằng cách viết lệnh, dùng
``cmd`` của Windows nhiều khi tỏ ra rất bất tiện(*xấu*, khó thao tác...), do đó
nên cài thêm `Cmder <cmder-home_>`_.

Link tải `Cmder v1.2.9 <cmder-v1.2.9_>`_

Tải về và cài đặt. Kết quả như sau:

.. figure:: /_static/images/dev-workflow/install_cmder_01.png
   :alt: sử dụng cmder

   Y như cmder, nhưng đẹp hơn :D

.. _cmder-home: http://cmder.net/
.. _cmder-v1.2.9: https://github.com/cmderdev/cmder/releases/download/v1.2.9/cmder.zip

.. _setup-bower:

Bower
=====

.. _setup-gulp:

Gulp
====