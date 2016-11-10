.. _jsom-setup-dependencies:

Thêm các thư viện cần thiết
===========================

.. hint:: Xem ví đầy đủ ở cuối bài

Thư viện của SharePoint
-----------------------

Định nghĩa SharePoint `tag prefix`:

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

.. note::

   Thẻ ``asp:ScriptManager`` trên nhằm mục đích debug code của SharePoint, nếu
   thấy không cần thiết thì có thể bỏ đi.

Thư viện JavaScript khác
------------------------

|FSJL| phụ thuộc vào |lodash|_, |jquery|_ và |angularjs|_:

.. code:: html

   <script src="/path/to/lodash.js"></script>
   <script src="/path/to/jquery.js"></script>
   <script src="/path/to/angular.js"></script>

Thư viện |FSJL|
---------------

.. code:: html

   <script src="/path/to/fx.sharepoint.lists.jsom.js"></script>

.. warning::

   Thêm file này vào sau khi đã thêm hết tất cả các thư viện trên.