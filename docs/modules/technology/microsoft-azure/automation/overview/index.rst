.. include:: /refs/refs.rst

.. _azure-automation-overview:

Tổng quan
*********

Mục đích sử dụng:

- Tự động hóa công việc 
- Thay vì phải thực hiện công việc đó bằng tay --> viết code rồi để nó tự chạy

Lợi ích khi sử dụng: 

- Tiết kiệm thời gian
- Tăng sự tin cậy (giảm lỗi)
- Có thể lập lịch để task tự động thực hiện theo chu kì (vd: 1 ngày 1 lần)
- Tránh nhàm chán khi thực hiện task nhiều lần

Khả năng của |azure-automation|_:

- |azure-automation|_ sử dụng PowerShell nên nó có thể làm mọi thứ mà PowerShell
  và PowerShell Workflow có thể làm được
- PowerShell có thể sử dụng được các module của .NET (\*.dll files) --> có thể
  dùng C# để build \*.dll cho PowerShell sử dụng --> có thể lập trình 
  |azure-automation|_ bằng C#

Tóm lại thì |azure-automation|_ cũng gần giống như |gulp|_, đều là task runner.
Điểm khác biệt là |gulp|_ sử dụng JavaScript còn |azure-automation|_ sử dụng 
PowerShell và C#.