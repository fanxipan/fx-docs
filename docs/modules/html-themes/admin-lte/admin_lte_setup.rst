.. include:: /icons.rst
.. include:: /utils.rst

.. _admin-lte-setup:

|setup-icon| Cài đặt
********************

Deploy Core project
===================

Mở TFS, tìm đến project ``Fx.Core`` theo đường dẫn::

	$/Fanxipan Projects/Fanxipan/2016Apps/Core/Fx.Core

Chỉnh URL của project đến WebApp trên máy local:

.. figure:: /_static/images/html-themes/admin-lte/lte_setup_core_01.png
   :alt: Chỉnh url của project Fx.Core

Deploy project:

.. figure:: /_static/images/html-themes/admin-lte/lte_deploy_core_01.png
   :alt: Deploy project Fx.Core

Copy Prototype project
======================

Mở TFS, tìm đến project ``Vendor.AdminLTE.Prototype`` theo đường dẫn::

	$/Fanxipan Projects/Fanxipan/2016Apps/Core/Vendor.AdminLTE

:bg-highlight:`Copy` project prototype này sang 1 thư mục khác và làm trên
project vừa được copy này.

.. danger::

	Không được chỉnh sửa trên project ``Vendor.AdminLTE.Prototype`` đã có sẵn

Sau khi copy xong, chỉnh sửa URL của project đến WebApp trên máy và deploy như
đã làm với project ``Fx.Core``.

.. figure:: /_static/images/html-themes/admin-lte/lte_deploy_prototype_01.png
   :alt: Sửa url của project Vendor.AdminLTE.Prototype