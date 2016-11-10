.. _complete-html-example:

File ``default.aspx`` hoàn chỉnh
================================

.. code-block:: python
   :linenos:
   :emphasize-lines: 2,15-18,20-22,24,30-33

   <%@ Page Language="C#" %>
   <%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

   <!DOCTYPE html>
   <html ng-app="my-app">
   <head>
      <title>FxList Demo App</title>
   </head>
   <body>
      <div ng-controller="MainCtrl">
         This is a Demo app for <strong>fx.sharepoint.list.jsom</strong>
      </div>

      <div id="scripts">
         <SharePoint:ScriptLink runat="server" Language="javascript" Name="MicrosoftAjax.js" OnDemand="false" Defer="false" Localizable="false" />
         <SharePoint:ScriptLink runat="server" Language="javascript" Name="SP.Core.js" OnDemand="false" Defer="false" Localizable="false" />
         <SharePoint:ScriptLink runat="server" Language="javascript" Name="Sp.js" OnDemand="false" Defer="false" Localizable="false" /> 
         <SharePoint:ScriptLink runat="server" Language="javascript" Name="Sp.RequestExecutor.js" OnDemand="false" Defer="false" Localizable="false" /> 

         <script src="assets/bower/lodash/dist/lodash.js"></script>
         <script src="assets/bower/jquery/dist/jquery.js"></script>
         <script src="assets/bower/angular/angular.js"></script>
         
         <script src="assets/dist/js/fx.sharepoint.lists.jsom.js"></script>
         
         <script src="assets/test-app/app.js"></script>
         <script src="assets/test-app/controllers/main.controller.js"></script>
      </div>
      
      <SharePoint:SharePointForm runat="server"> 
         <SharePoint:FormDigest runat="server" />
         <asp:ScriptManager runat="server" ScriptMode="Debug" />
      </SharePoint:SharePointForm>
   </body>
   </html>

.. hint::

   Có thể paste vào |dirty-markup|_ cho dễ đọc.