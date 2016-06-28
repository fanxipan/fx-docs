.. include:: /refs/refs.rst

.. _azure-automation-create-runnbook:

Hello World runbook
*******************

Runbook hiểu đơn giản là 1 phần tử logic chứa đoạn code thực hiện task. Để 
viết được code chạy task sử  dụng |azure-automation|_ thì việc đầu tiên cần 
làm là tìm hiểu cách tạo và sử dụng runbook.

Có thể tham khảo thêm hướng dẫn của Mircosoft
`tại đây <ms-create-workflow-runbook_>`_.

Ví dụ dưới đây hướng dẫn cách tạo 1 runbook đơn giản: nhập tên người dùng 
---> chạy runbook ---> màn hình console hiển thị: "Hello <tên người dùng>"

.. note::
   Ví dụ dưới đây chỉ nhằm mục đích giúp người đọc hiểu rõ hơn vể runbook. 
   Runbook thực sự chạy trên môi trường production sẽ bao gồm các câu lệnh
   PowerShell phức tạp hơn rất nhiều.

.. note::
   |azure-automation|_ sử dụng PowerShell làm ngôn ngữ lập trình
   chính. May mắn là PowerShell có thể gọi được các hàm trong 1 .NET module 
   (\*.dll file) nên về cơ bản, chúng ta hoàn toàn có thể lập trình task cho 
   |azure-automation| bằng C#.

   Để tìm hiểu cách code task bằng C#, xem thêm phần
   :ref:`azure-automation-csharp-impl`.

- :ref:`login-azure`
- :ref:`create-automation-account`
- :ref:`create-runbook`
- :ref:`test-runbook`
- :ref:`publish-runbook`
- :ref:`run-runbook`
- :ref:`schedule-runbook`

.. hint::
   Mở ảnh trong tab mới để xem ảnh rõ nét hơn.

.. include:: login-azure.data.rst
.. include:: create-automation-account.data.rst
.. include:: create-runbook.data.rst
.. include:: test-runbook.data.rst
.. include:: publish-runbook.data.rst
.. include:: run-runbook.data.rst
.. include:: schedule-runbook.data.rst

.. _ms-create-workflow-runbook: https://azure.microsoft.com/en-us/documentation/articles/automation-first-runbook-textual/