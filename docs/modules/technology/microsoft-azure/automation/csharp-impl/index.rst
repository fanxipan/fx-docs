.. include:: /refs/refs.rst

.. _azure-automation-csharp-impl:

Cài đặt logic bằng C#
*********************

Ví dụ dưới đây hướng dẫn cách code 1 |azure-automation| task bằng C#. Chúng ta
sẽ sử dụng |sharepoint-csom|_ để kết nối vào 1 SharePoint Online site --> tạo
custom list tên là `AutomationDemoList` (nếu chưa có) --> thêm 1 vài item vào
list.

- :ref:`csimpl-create-csharp-projects`
- :ref:`csimpl-impl-task-logic-csharp`
- :ref:`csimpl-create-powershell-module`
- :ref:`csimpl-import-powershell-module`
- :ref:`csimpl-create-azure-credential`
- :ref:`csimpl-impl-runbook`
- :ref:`csimpl-start-runbook`

.. hint:: 
   Mở ảnh trong tab mới để xem ảnh rõ nét hơn.

.. include:: 1.create-csharp-projects.data.rst
.. include:: 2.impl-task-logic.data.rst
.. include:: 3.create-powershell-module.data.rst
.. include:: 4.import-powershell-module-to-azure.data.rst
.. include:: 5.create-azure-credential.data.rst
.. include:: 6.impl-runbook-logic.data.rst
.. include:: 7.start-runbook.data.rst