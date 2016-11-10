.. include:: /refs/refs.rst

.. _jsom-setup:

Cài đặt
*******

Để sử dụng được thư viện Fanxipan SharePoint JSOM List (|FSJL|) cần phải thực 
hiện các bước sau:

.. hint:: Xem ví đầy đủ ở cuối bài

Thêm các thư viện cần thiết
===========================

Thư viện của SharePoint
-----------------------

Định nghĩa `tag prefix`:

.. code:: html
  
   <%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

Vì |FSJL| sử dụng |sharepoint-jsom|_ nên cần phải thêm các file sau của 
SharePoint vào  file ``default.aspx``:

.. code:: html

   <SharePoint:ScriptLink runat="server" Language="javascript" Name="MicrosoftAjax.js" OnDemand="false" Defer="false" Localizable="false" />
   <SharePoint:ScriptLink runat="server" Language="javascript" Name="SP.Core.js" OnDemand="false" Defer="false" Localizable="false" />
   <SharePoint:ScriptLink runat="server" Language="javascript" Name="Sp.js" OnDemand="false" Defer="false" Localizable="false" /> 
   <SharePoint:ScriptLink runat="server" Language="javascript" Name="Sp.RequestExecutor.js" OnDemand="false" Defer="false" Localizable="false" /> 

.. note:: 

   File ``Sp.RequestExecutor.js`` chỉ dùng cho các project dạng SharePoint Addins,
   mục đích là để tạo Cross Origin request. Các project làm cho SharePoint
   On-Premises và SharePoint Online thì không cần.   

Định nghĩa ``FormDigest`` element, SharePoint dùng form digest để authenticate 
với server:

.. code:: html

   <SharePoint:SharePointForm runat="server"> 
      <SharePoint:FormDigest runat="server" />
      <asp:ScriptManager runat="server" ScriptMode="Debug" />
   </SharePoint:SharePointForm>

Thư viện JavaScript khác
------------------------

Thêm module vào app
===================