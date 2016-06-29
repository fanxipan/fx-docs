.. include:: /refs/refs.rst

.. _azure-automation-csharp-impl:

Cài đặt logic bằng C#
*********************

Ví dụ dưới đây hướng dẫn cách code 1 |azure-automation| task bằng C#. Chúng ta
sẽ sử dụng |sharepoint-csom|_ để kết nối vào 1 SharePoint Online site --> tạo
custom list tên là `AutomationDemoList` (nếu chưa có) --> thêm 1 vài item vào
list.

- Tạo C# project bằng Visual Studio
- Cài đặt logic cho task
- Tạo PowerShell module
- Đưa PowerShell module lên Azure
- Tạo Credential trên Azure
- Cài đặt logic cho runbook
- Chạy runbook

.. hint:: 
   Mở ảnh trong tab mới để xem ảnh rõ nét hơn.