

var Fx;
(function (Fx) {
    var queue = [];
    function initClass(fn) {
        queue.push(fn);
    }
    Fx.initClass = initClass;
    function finalizeClass() {
        _.forEach(queue, function (fn) { return fn(); });
    }
    Fx.finalizeClass = finalizeClass;
})(Fx || (Fx = {}));
function logObjProps(obj) {
    _.chain(obj)
        .functionsIn()
        .orderBy(function (fn) { return fn.toLowerCase(); })
        .forEach(function (fn) {
        try {
            console.log(fn + ":", obj[fn]());
        }
        catch (e) {
            console.info(fn + ":", e);
        }
    })
        .commit();
}
function logItemFields(item) {
    _.chain(item.$list.fields)
        .map(function (field) { return field.internalName; })
        .orderBy(function (name) { return name.toLowerCase(); })
        .forEach(function (name) {
        try {
            console.log(name + ":", item.$item.get_item(name));
        }
        catch (e) {
            console.info(name + ":", e);
        }
    })
        .commit();
}
function displayGettableFields(list) {
    list.initPromise.then(function () {
        var fieldNames = _
            .chain(list.fields)
            .map(function (field) { return field.internalName; })
            .orderBy(function (name) { return name.toLowerCase(); })
            .value();
        _.map(fieldNames, function (fieldName) {
            var query = new SP.CamlQuery();
            query.set_viewXml("\n\t\t\t\t<View>\n\t\t\t\t\t<ViewFields>\n\t\t\t\t\t\t<FieldRef Name=\"" + fieldName + "\" />\n\t\t\t\t\t</ViewFields>\n\t\t\t\t</View>\n\t\t\t");
            var item = list.splist.getItems(query);
            list.clientContext.load(item);
            return list.serviceContext.commitChanges()
                .then(function () {
                try {
                    console.log(fieldName + ":", item.get_data()[0].get_item(fieldName));
                }
                catch (e) {
                    console.log(fieldName + ":", e);
                }
            });
        });
    });
}

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var fnNamePrefixRegex = /^[\S\s]*?function\s*/;
            var fnNameSuffixRegex = /[\s\(\/][\S\s]+$/;
            function _name() {
                var name = "";
                if (this === Function || this === Function.prototype.constructor) {
                    name = "Function";
                }
                else if (this !== Function.prototype) {
                    name = ("" + this).replace(fnNamePrefixRegex, "").replace(fnNameSuffixRegex, "");
                }
                return name;
            }
            var needsPolyfill = !("name" in Function.prototype && "name" in (function () { }));
            var canDefineProp = typeof Object.defineProperty === "function" &&
                (function () {
                    var result;
                    try {
                        Object.defineProperty(Function.prototype, "_xyz", {
                            get: function () {
                                return "blah";
                            },
                            configurable: true
                        });
                        result = Function.prototype._xyz === "blah";
                        delete Function.prototype._xyz;
                    }
                    catch (e) {
                        result = false;
                    }
                    return result;
                })();
            if (canDefineProp && needsPolyfill) {
                Object.defineProperty(Function.prototype, "name", {
                    get: _name
                });
            }
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            if (!String.format) {
                String.format = function (format) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return format.replace(/{(\d+)}/g, function (match, number) { return (typeof args[number] != "undefined"
                        ? args[number]
                        : match); });
                };
            }
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var AppFactory = (function () {
                function AppFactory() {
                }
                AppFactory.prototype.createServiceContext = function (serverRelativeUrl) {
                    return new Client.ServiceContext(serverRelativeUrl);
                };
                AppFactory.prototype.createList = function (config, serviceContext) {
                    return new Client.List(config, serviceContext);
                };
                AppFactory.prototype.createListItem = function (spItem, list) {
                    var listItem = new Client.ListItem(spItem, list);
                    return listItem.$init().then(function () { return listItem; });
                };
                AppFactory.prototype.createListConfig = function (config, list) {
                    return new Client.ListConfig(config, list);
                };
                AppFactory.prototype.createLogger = function (creationContext) {
                    return new Client.Logger(creationContext);
                };
                AppFactory.prototype.createListItemPrivateData = function (spItem, list) {
                    return new Client.ListItemPrivateData(spItem, list);
                };
                AppFactory.prototype.createPendingQueue = function () {
                    return new Client.PendingQueue();
                };
                AppFactory.prototype.createPendingOperation = function (item) {
                    if (item instanceof Client.ListItem) {
                        return new Fx.SharePoint.Client.ListItemUpdateCommitOperation(item);
                    }
                    throw new Error("Internal error: item type is not supported for creating pending operation. Got " + item + ".");
                };
                AppFactory.prototype.createSessionContextManager = function (serviceContext) {
                    return new Client.SessionContextManager(serviceContext);
                };
                AppFactory.prototype.createGetListItemSessionContext = function (serviceContext, listItem) {
                    return new Client.GetListItemSessionContext(serviceContext, listItem);
                };
                AppFactory.prototype.createListField = function (spField, fieldConfig, list) {
                    switch (spField.get_fieldTypeKind()) {
                        case SP.FieldType.text:
                            return new Client.ListFieldText(spField, fieldConfig, list);
                        case SP.FieldType.note:
                            return new Client.ListFieldMultiLineText(spField, fieldConfig, list);
                        case SP.FieldType.dateTime:
                            return new Client.ListFieldDateTime(spField, fieldConfig, list);
                        case SP.FieldType.number:
                            return new Client.ListFieldNumber(spField, fieldConfig, list);
                        case SP.FieldType.boolean:
                            return new Client.ListFieldBoolean(spField, fieldConfig, list);
                        case SP.FieldType.choice:
                            return new Client.ListFieldChoice(spField, fieldConfig, list);
                        case SP.FieldType.multiChoice:
                            return new Client.ListFieldMultiChoice(spField, fieldConfig, list);
                        case SP.FieldType.lookup:
                            return (function () {
                                var isUniqueId = spField.get_internalName() === "UniqueId" && spField.get_fromBaseType();
                                return isUniqueId
                                    ? new Client.ListFieldUniqueId(spField, fieldConfig, list)
                                    : new Client.ListFieldLookup(spField, fieldConfig, list);
                            })();
                        case SP.FieldType.user:
                            return new Client.ListFieldUser(spField, fieldConfig, list);
                        case SP.FieldType.URL:
                            return new Client.ListFieldUrl(spField, fieldConfig, list);
                        default:
                            return new Client.ListField(spField, fieldConfig, list);
                    }
                };
                AppFactory.prototype.createListFieldLookupValue = function (lookupValue, lookupField, listItem) {
                    return new Client.ListFieldLookupValue(lookupValue, lookupField, listItem);
                };
                AppFactory.prototype.createListFieldLookupValuePrivateData = function (lookupValue, lookupField, listItem) {
                    return new Client.ListFieldLookupValuePrivateData(lookupValue, lookupField, listItem);
                };
                AppFactory.prototype.createListFieldUserValue = function (userValue, userField, listItem) {
                    return new Client.ListFieldUserValue(userValue, userField, listItem);
                };
                AppFactory.prototype.createListFieldUserValuePrivateData = function (userValue, userField, listItem) {
                    return new Client.ListFieldUserValuePrivateData(userValue, userField, listItem);
                };
                AppFactory.prototype.createListFieldUrlValue = function (urlValue, urlField, listItem) {
                    return new Client.ListFieldUrlValue(urlValue, urlField, listItem);
                };
                AppFactory.prototype.createListFieldUrlValuePrivateData = function (urlValue, urlField, listItem) {
                    return new Client.ListFieldUrlValuePrivateData(urlValue, urlField, listItem);
                };
                AppFactory.prototype.createFieldConfig = function (config, listConfig) {
                    return new Client.FieldConfig(config, listConfig);
                };
                AppFactory.prototype.createSingleFieldConfig = function (configLiteral, listConfig) {
                    if (_.isString(configLiteral)) {
                        return this.createFieldConfig({ name: configLiteral }, listConfig);
                    }
                    if (_.isObject(configLiteral)) {
                        return this.createFieldConfig(configLiteral, listConfig);
                    }
                    throw new Client.FieldConfigCreationException("Expect field config is a string or an object, but got '" + configLiteral + "'.");
                };
                AppFactory.prototype.createArrayFieldConfig = function (configLiteral, listConfig) {
                    var _this = this;
                    if (!configLiteral)
                        return [];
                    if (_.isArray(configLiteral))
                        return _.map(configLiteral, function (config) { return _this.createSingleFieldConfig(config, listConfig); });
                    throw new Client.FieldConfigCreationException("Expect field config is an array, but got '" + configLiteral + "'.");
                };
                AppFactory.prototype.createHashFieldConfig = function (configLiteral, listConfig) {
                    var _this = this;
                    if (!_.isObjectLike(configLiteral)) {
                        throw new Client.FieldConfigCreationException("Expect field config is an object, but got '" + configLiteral + "'.");
                    }
                    var config = {};
                    _.forEach(configLiteral, function (value, key) {
                        if (typeof value === "boolean") {
                            var configLiteral_1 = {
                                name: key,
                                active: value
                            };
                            config[key] = _this.createSingleFieldConfig(configLiteral_1, listConfig);
                        }
                        else if (_.isObjectLike(value)) {
                            value.name = key;
                            config[key] = _this.createSingleFieldConfig(value, listConfig);
                        }
                        else {
                            throw new Client.FieldConfigCreationException("Expect field config is a boolean or an object, but got '" + value + "'.", key);
                        }
                    });
                    return config;
                };
                AppFactory.prototype.createMergedFieldsConfigParser = function (spFields, fields, list, defaultFieldsConfigParser, userFieldsConfigParser) {
                    return new Client.MergedFieldsConfigParser(spFields, fields, list, defaultFieldsConfigParser, userFieldsConfigParser);
                };
                AppFactory.prototype.createUserFieldsConfigParser = function (spFields, userFields, list) {
                    return new Client.UserFieldsConfigParser(spFields, userFields, list);
                };
                AppFactory.prototype.createDefaultFieldsConfigParser = function (spFields, defaultFields, list) {
                    return new Client.DefaultFieldsConfigParser(spFields, defaultFields, list);
                };
                AppFactory.prototype.createSPClientContext = function (serverRelativeUrl) {
                    return new SP.ClientContext(serverRelativeUrl);
                };
                AppFactory.prototype.createSPCamlQuery = function () {
                    return new SP.CamlQuery();
                };
                AppFactory.prototype.createSPFieldUrlValue = function (url, description) {
                    var urlValue = new SP.FieldUrlValue();
                    urlValue.set_url(url);
                    urlValue.set_description(description);
                    return urlValue;
                };
                AppFactory.prototype.createSPFieldUserValue = function (id) {
                    var userValue = new SP.FieldUserValue();
                    userValue.set_lookupId(id);
                    return userValue;
                };
                return AppFactory;
            }());
            Client.AppFactory = AppFactory;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            Client.$q = function () { return AppContext.current.$q; };
            Client.$injector = function () { return AppContext.current.$injector; };
            Client.factory = function () { return AppContext.current.factory; };
            var AppContext = (function () {
                function AppContext($q, $http, $timeout, $injector) {
                    this.$q = $q;
                    this.$http = $http;
                    this.$timeout = $timeout;
                    this.$injector = $injector;
                    this.factory = new Client.AppFactory();
                    AppContext.current = this;
                }
                AppContext.$inject = [
                    "$q",
                    "$http",
                    "$timeout",
                    "$injector"
                ];
                return AppContext;
            }());
            Client.AppContext = AppContext;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var FxListService = (function () {
                function FxListService(context) {
                    this.context = context;
                }
                FxListService.prototype.createContext = function (serverRelativeUrl) {
                    return this.context.factory.createServiceContext(serverRelativeUrl);
                };
                FxListService.$inject = [
                    "$fxList.appContext"
                ];
                return FxListService;
            }());
            Client.FxListService = FxListService;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            angular.module("fx.sharepoint.lists.jsom", [])
                .service("$fxList", Client.FxListService)
                .service("$fxList.appContext", Client.AppContext);
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var CamlElement = (function () {
                function CamlElement(config) {
                    var _this = this;
                    this.parent = null;
                    this.attrs = {};
                    this.content = {};
                    if (!config)
                        return;
                    _.assignIn(this.attrs, config.attrs);
                    _.assignInWith(this.content, _.pickBy(config, function (val, key) { return key !== "attrs"; }), function (objValue, srcValue) { return srcValue; });
                    _.forEach(this.content, function (child) {
                        if (child instanceof CamlElement) {
                            child.parent = _this;
                        }
                        else if (child instanceof Array) {
                            _.forEach(child, function (subChild) { return subChild.parent = _this; });
                        }
                    });
                }
                Object.defineProperty(CamlElement.prototype, "className", {
                    get: function () {
                        return this.constructor.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                CamlElement.prototype.toString = function () {
                    var s = "<" + this.className;
                    _.forEach(this.attrs, function (val, key) { return s += " " + _.upperFirst(key) + "=\"" + val + "\""; });
                    s += ">";
                    _.forEach(this.content, function (child) {
                        if (_.isArray(child)) {
                            _.forEach(child, function (subChild) { return s += subChild.toString(); });
                        }
                        else {
                            s += child.toString();
                        }
                    });
                    s += "</" + this.className + ">";
                    return s;
                };
                return CamlElement;
            }());
            Caml.CamlElement = CamlElement;
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var LogicalJoin = (function (_super) {
                    __extends(LogicalJoin, _super);
                    function LogicalJoin(config) {
                        _super.call(this, config);
                    }
                    return LogicalJoin;
                }(Caml.CamlElement));
                Queries.LogicalJoin = LogicalJoin;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var And = (function (_super) {
                    __extends(And, _super);
                    function And() {
                        _super.apply(this, arguments);
                    }
                    return And;
                }(Queries.LogicalJoin));
                Queries.And = And;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var Or = (function (_super) {
                    __extends(Or, _super);
                    function Or() {
                        _super.apply(this, arguments);
                    }
                    return Or;
                }(Queries.LogicalJoin));
                Queries.Or = Or;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var ComparisonOperator = (function (_super) {
                    __extends(ComparisonOperator, _super);
                    function ComparisonOperator(config) {
                        _super.call(this, config);
                    }
                    return ComparisonOperator;
                }(Caml.CamlElement));
                Queries.ComparisonOperator = ComparisonOperator;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var UnaryOperator = (function (_super) {
                    __extends(UnaryOperator, _super);
                    function UnaryOperator() {
                        _super.apply(this, arguments);
                    }
                    return UnaryOperator;
                }(Queries.ComparisonOperator));
                Queries.UnaryOperator = UnaryOperator;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var BinaryOperator = (function (_super) {
                    __extends(BinaryOperator, _super);
                    function BinaryOperator() {
                        _super.apply(this, arguments);
                    }
                    return BinaryOperator;
                }(Queries.ComparisonOperator));
                Queries.BinaryOperator = BinaryOperator;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var SingleValueBinaryOperator = (function (_super) {
                    __extends(SingleValueBinaryOperator, _super);
                    function SingleValueBinaryOperator() {
                        _super.apply(this, arguments);
                    }
                    return SingleValueBinaryOperator;
                }(Queries.BinaryOperator));
                Queries.SingleValueBinaryOperator = SingleValueBinaryOperator;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var MultipleValueBinaryOperator = (function (_super) {
                    __extends(MultipleValueBinaryOperator, _super);
                    function MultipleValueBinaryOperator() {
                        _super.apply(this, arguments);
                    }
                    return MultipleValueBinaryOperator;
                }(Queries.BinaryOperator));
                Queries.MultipleValueBinaryOperator = MultipleValueBinaryOperator;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var DEFAULT_OPTIONS = {
                defer: false
            };
            var ListBase = (function () {
                function ListBase(config, serviceContext) {
                    this.serviceContext = serviceContext;
                    this.config = Client.factory().createListConfig(config, this);
                    this.logger = Client.factory().createLogger({
                        listName: this.config.listName,
                        contextUrl: this.clientContext.get_url()
                    });
                    this.initPromise = this.initFields();
                }
                Object.defineProperty(ListBase.prototype, "clientContext", {
                    get: function () {
                        return this.serviceContext.clientContext;
                    },
                    enumerable: true,
                    configurable: true
                });
                ListBase.setDefaultFields = function (fieldConfig) {
                    ListBase.defaultFieldsLiteral = fieldConfig;
                };
                ListBase.getDefaultFields = function () {
                    return ListBase.defaultFieldsLiteral;
                };
                ListBase.prototype.getFieldByName = function (fieldInternalName) {
                    return _.find(this.fields, function (f) { return f.internalName === fieldInternalName; });
                };
                ListBase.prototype.initFields = function () {
                    var _this = this;
                    this.spList = this.clientContext.get_web().get_lists().getByTitle(this.config.listName);
                    this.clientContext.load(this.spList, "Fields");
                    return this.serviceContext.commitChanges(false).then(function () {
                        _this.spFields = _this.spList.get_fields().get_data();
                        _this.refreshListFields();
                    });
                };
                ListBase.prototype.refreshListFields = function () {
                    var _this = this;
                    this.fields = _.map(this.getFieldConfigs(), function (fieldConfig) {
                        var spField = _.find(_this.spFields, function (spField) { return spField.get_internalName() === fieldConfig.name; });
                        return Client.factory().createListField(spField, fieldConfig, _this);
                    });
                };
                ListBase.prototype.getFieldConfigs = function () {
                    var userFieldsParser = Client.factory().createUserFieldsConfigParser(this.spFields, this.config.userFields, this);
                    var defaultFieldsParser = Client.factory().createDefaultFieldsConfigParser(this.spFields, this.config.defaultFields, this);
                    var mergedfieldsParser = Client.factory().createMergedFieldsConfigParser(this.spFields, this.config.fields, this, defaultFieldsParser, userFieldsParser);
                    if (mergedfieldsParser.hasFieldConfigs) {
                        return mergedfieldsParser.getFieldConfigs();
                    }
                    return _.concat(defaultFieldsParser.getFieldConfigs(), userFieldsParser.getFieldConfigs());
                };
                ListBase.prototype.get_listConfig = function () {
                    return this.config;
                };
                ListBase.prototype.get_fields = function () {
                    return this.fields;
                };
                ListBase.prototype.get_serviceContext = function () {
                    return this.serviceContext;
                };
                ListBase.prototype.get_defaultFieldConfigs = function () {
                    try {
                        return Client.factory().createArrayFieldConfig(ListBase.defaultFieldsLiteral, this.config);
                    }
                    catch (e) {
                        if (e instanceof Client.FieldConfigCreationException) {
                            var error = e;
                            throw new Client.DefaultFieldConfigException(error.message);
                        }
                        else {
                            throw e;
                        }
                    }
                };
                ListBase.prototype.get_logger = function () {
                    return this.logger;
                };
                ListBase.prototype.getByIdAsync = function (id, options) {
                    var _this = this;
                    if (options === void 0) { options = DEFAULT_OPTIONS; }
                    return this.initPromise.then(function () { return _this.getByIdAsyncImpl(id, options); });
                };
                ListBase.prototype.getManyAsync = function (options) {
                    var _this = this;
                    if (options === void 0) { options = DEFAULT_OPTIONS; }
                    return this.initPromise.then(function () { return _this.getManyAsyncImpl(options); });
                };
                ListBase.prototype.deleteItemAsync = function (listItem) {
                    var _this = this;
                    return this.initPromise.then(function () { return _this.deleteItemAsyncImpl(listItem); });
                };
                ListBase.defaultFieldsLiteral = [
                    "Title",
                    "Author",
                    "Editor",
                    "Created",
                    "Modified",
                    "UniqueId"
                ];
                return ListBase;
            }());
            Client.ListBase = ListBase;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var View;
            var Query;
            var Where;
            var Eq;
            var Value;
            var RowLimit;
            var ViewFields;
            var FieldRefQ;
            var FieldRefL;
            var q;
            var l;
            Fx.initClass(function () {
                View = SharePoint.Caml.Lists.View;
                Query = SharePoint.Caml.Lists.Query;
                Where = SharePoint.Caml.Queries.Where;
                Eq = SharePoint.Caml.Queries.Eq;
                Value = SharePoint.Caml.Queries.Value;
                RowLimit = SharePoint.Caml.Lists.RowLimit;
                ViewFields = SharePoint.Caml.Lists.ViewFields;
                FieldRefQ = SharePoint.Caml.Queries.FieldRef;
                FieldRefL = SharePoint.Caml.Lists.FieldRef;
                q = SharePoint.Caml.Queries;
                l = SharePoint.Caml.Lists;
            });
            var List = (function (_super) {
                __extends(List, _super);
                function List() {
                    _super.apply(this, arguments);
                }
                List.prototype.getByIdAsyncImpl = function (id, options) {
                    var _this = this;
                    var items = this.spList.getItems(this.getQuery(id));
                    this.clientContext.load(items);
                    return this.get_serviceContext().commitChanges(false)
                        .then(function () {
                        var item = _.first(items.get_data());
                        return item != null ? Client.factory().createListItem(item, _this) : null;
                    });
                };
                List.prototype.getManyAsyncImpl = function (options) {
                    throw new Error("Not implemented");
                };
                List.prototype.deleteItemAsyncImpl = function (listItem) {
                    listItem.get_spItem().deleteObject();
                    return this.get_serviceContext().commitChanges(false);
                };
                List.prototype.getQuery = function (id) {
                    var view = new View();
                    if (id > 0) {
                        view.content.query =
                            new Query({
                                where: new Where({
                                    condition: new Eq({
                                        fieldRef: new q.FieldRef({ attrs: { name: "ID" } }),
                                        value: new Value({
                                            attrs: { type: "Integer" },
                                            value: id
                                        })
                                    })
                                })
                            });
                    }
                    var fields = _.map(this.get_fields(), function (field) {
                        return new l.FieldRef({ attrs: { name: field.internalName } });
                    });
                    view.content.viewFields = new ViewFields({ fields: fields });
                    var query = Client.factory().createSPCamlQuery();
                    query.set_viewXml(view.toString());
                    return query;
                };
                return List;
            }(Client.ListBase));
            Client.List = List;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListField = (function () {
                function ListField(spField, fieldConfig, list) {
                    this.spField = spField;
                    this.fieldConfig = fieldConfig;
                    this.list = list;
                    this.logger = Client.factory()
                        .createLogger({
                        fieldName: this.internalName,
                        listName: this.listName,
                        contextUrl: this.contextUrl
                    });
                }
                Object.defineProperty(ListField.prototype, "listName", {
                    get: function () {
                        return this.get_list().get_listConfig().listName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListField.prototype, "contextUrl", {
                    get: function () {
                        return this.get_list().get_serviceContext().clientContext.get_url();
                    },
                    enumerable: true,
                    configurable: true
                });
                ListField.prototype.getValueOverride = function (item) {
                    var value = item.get_spItem().get_item(this.internalName);
                    return Client.$q().resolve(value);
                };
                ListField.prototype.setValueOverride = function (item, value) {
                    return this.setValueInternal(item, value);
                };
                ListField.prototype.setField = function (type) {
                    var clientContext = this.get_list().get_serviceContext().clientContext;
                    this.spField = clientContext.castTo(this.spField, type);
                };
                ListField.prototype.setValueInternal = function (item, value) {
                    var originalValue = item.getOriginalData(this);
                    if (this.isFieldValueChanged(value, originalValue)) {
                        item.get_spItem().set_item(this.internalName, value);
                    }
                    return Client.$q().resolve();
                };
                ListField.prototype.isFieldValueChanged = function (newValue, originalValue) {
                    return !_.isEqual(newValue, originalValue);
                };
                ListField.prototype.getLogger = function (listItem) {
                    if (listItem === void 0) { listItem = null; }
                    if (listItem == null)
                        return this.logger;
                    var logger = this.logger.clone();
                    logger.itemId = listItem.id;
                    return logger;
                };
                ListField.prototype.get_list = function () {
                    return this.list;
                };
                ListField.prototype.get_fieldConfig = function () {
                    return this.fieldConfig;
                };
                ListField.prototype.parseResponse = function (item) {
                    var _this = this;
                    return this.getValueOverride(item)
                        .then(function (value) {
                        item.setOriginalData(_this, value);
                        return _.reduce(_this.get_fieldConfig().parsers.response, function (memo, parser) {
                            return memo.then(function (prevValue) {
                                return Client.$q()
                                    .resolve(parser(prevValue, item))
                                    .then(function (newValue) {
                                    if (newValue !== undefined)
                                        item.setOriginalData(_this, newValue);
                                    return item.getOriginalData(_this);
                                });
                            });
                        }, Client.$q().resolve(value));
                    });
                };
                ListField.prototype.parseRequest = function (item) {
                    var _this = this;
                    var value = item.getData(this);
                    return _
                        .reduce(this.get_fieldConfig().parsers.request, function (memo, parser) {
                        return memo.then(function (prevValue) {
                            return Client.$q()
                                .resolve(parser(prevValue, item))
                                .then(function (newValue) {
                                return newValue !== undefined
                                    ? newValue
                                    : prevValue;
                            });
                        });
                    }, Client.$q().resolve(value))
                        .then(function (finalValue) { return _this.setValueOverride(item, finalValue); });
                };
                Object.defineProperty(ListField.prototype, "id", {
                    get: function () {
                        return this.spField.get_id().toString();
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(ListField.prototype, "internalName", {
                    get: function () {
                        return this.spField.get_internalName();
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(ListField.prototype, "readOnlyField", {
                    get: function () {
                        return this.spField.get_readOnlyField();
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(ListField.prototype, "required", {
                    get: function () {
                        return this.spField.get_required();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListField.prototype, "fromBaseType", {
                    get: function () {
                        return this.spField.get_fromBaseType();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListField.prototype, "schemaXml", {
                    get: function () {
                        return this.spField.get_schemaXml();
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                return ListField;
            }());
            Client.ListField = ListField;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldMultiChoice = (function (_super) {
                __extends(ListFieldMultiChoice, _super);
                function ListFieldMultiChoice(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldMultiChoice);
                }
                Object.defineProperty(ListFieldMultiChoice.prototype, "choices", {
                    get: function () {
                        return this.spField.get_choices();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListFieldMultiChoice.prototype, "fillInChoice", {
                    get: function () {
                        return this.spField.get_fillInChoice();
                    },
                    enumerable: true,
                    configurable: true
                });
                ListFieldMultiChoice.prototype.setValueOverride = function (item, value) {
                    var _this = this;
                    if (_.isArray(value)) {
                        value = _.map(value, function (v) { return v != null ? v.toString() : v; });
                    }
                    if (!this.fillInChoice && value != null) {
                        if (!_.isArray(value)) {
                            this.printError(item, value);
                        }
                        _.forEach(value, function (v) {
                            if (!_.includes(_this.choices, v)) {
                                _this.printError(item, value);
                            }
                        });
                    }
                    return _super.prototype.setValueOverride.call(this, item, value);
                };
                ListFieldMultiChoice.prototype.printError = function (item, value) {
                    this.getLogger(item).error("Expect an array of values in the list:\n\n" +
                        _.map(this.choices, function (c) { return "-\t" + c; }).join("\n") +
                        "\n\n" +
                        ("But got '" + value + "'."));
                };
                return ListFieldMultiChoice;
            }(Client.ListField));
            Client.ListFieldMultiChoice = ListFieldMultiChoice;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldChoice = (function (_super) {
                __extends(ListFieldChoice, _super);
                function ListFieldChoice(spField, fieldConfig, list) {
                    _super.call(this, spField, fieldConfig, list);
                    this.setField(SP.FieldChoice);
                }
                ListFieldChoice.prototype.setValueOverride = function (item, value) {
                    if (!this.fillInChoice && value != null && !_.includes(this.choices, value)) {
                        this.getLogger(item).error("Expect a single value in the list:\n\n" +
                            _.map(this.choices, function (c) { return "-\t" + c; }).join("\n") +
                            "\n\n" +
                            ("But got '" + value + "'."));
                    }
                    return _super.prototype.setValueInternal.call(this, item, value);
                };
                return ListFieldChoice;
            }(Client.ListFieldMultiChoice));
            Client.ListFieldChoice = ListFieldChoice;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var Exception = (function (_super) {
                __extends(Exception, _super);
                function Exception(message) {
                    _super.call(this, message);
                    this.message = message;
                }
                return Exception;
            }(Error));
            Client.Exception = Exception;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var FieldConfigCreationException = (function (_super) {
                __extends(FieldConfigCreationException, _super);
                function FieldConfigCreationException(message, fieldName) {
                    _super.call(this, message);
                    this.fieldName = fieldName;
                }
                return FieldConfigCreationException;
            }(Client.Exception));
            Client.FieldConfigCreationException = FieldConfigCreationException;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var DefaultFieldConfigException = (function (_super) {
                __extends(DefaultFieldConfigException, _super);
                function DefaultFieldConfigException() {
                    _super.apply(this, arguments);
                }
                return DefaultFieldConfigException;
            }(Client.Exception));
            Client.DefaultFieldConfigException = DefaultFieldConfigException;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var FieldsConfigParser = (function () {
                function FieldsConfigParser(spFields, fieldConfigs, list) {
                    this.spFields = spFields;
                    this.fieldConfigs = fieldConfigs;
                    this.list = list;
                    this.validate();
                }
                Object.defineProperty(FieldsConfigParser.prototype, "mode", {
                    get: function () {
                        return this.getMode();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FieldsConfigParser.prototype, "logger", {
                    get: function () {
                        return this.list.get_logger();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FieldsConfigParser.prototype, "factory", {
                    get: function () {
                        return Client.AppContext.current.factory;
                    },
                    enumerable: true,
                    configurable: true
                });
                FieldsConfigParser.prototype.getDefaultFields = function () {
                    if (this.mode !== Client.FieldConfigMode.Default) {
                        throw new Error("This field config is not in default mode.");
                    }
                    return this.getDefaultFieldsImpl();
                };
                FieldsConfigParser.prototype.getOverwriteFields = function () {
                    if (this.mode !== Client.FieldConfigMode.Overwrite)
                        throw new Error("This field config is not in overwrite mode.");
                    return this.getOverwriteFieldsImpl();
                };
                FieldsConfigParser.prototype.getModifyFields = function () {
                    if (this.mode !== Client.FieldConfigMode.Modify)
                        throw new Error("This field config is not in modify mode.");
                    return this.getModifyFieldsImpl();
                };
                FieldsConfigParser.prototype.validate = function () {
                    var _this = this;
                    var configs = Client.FieldUtils.getFieldConfigs(this.fieldConfigs);
                    _.forEach(configs, function (config) {
                        if (!_.some(_this.spFields, function (spField) { return spField.get_internalName() === config.name; })) {
                            _this.logger.error("Unexpected field config for nonexisted field '" + config.name + "'.");
                        }
                        if (_.filter(configs, function (c) { return c.name === config.name; }).length > 1) {
                            _this.logger.error("Duplicate field config for field '" + config.name + "'.");
                        }
                    });
                };
                FieldsConfigParser.prototype.getModifyFieldsImpl = function () {
                    var _this = this;
                    var baseConfigs = this.getBaseFieldConfigsForOverwrite();
                    _.forEach(this.fieldConfigs, function (config, key) {
                        if (!config.active && _.some(baseConfigs, function (c) { return c.name === key; })) {
                            _.pullAllWith(baseConfigs, [{ name: key }], function (baseValue, otherValue) { return baseValue.name === otherValue.name; });
                        }
                        else if (config.active) {
                            var existedConfig = _.find(baseConfigs, function (c) { return c.name === key; });
                            if (existedConfig) {
                                _.pull(baseConfigs, existedConfig);
                            }
                            baseConfigs.push(_this.factory.createFieldConfig(config, _this.list.get_listConfig()));
                        }
                    });
                    return baseConfigs;
                };
                FieldsConfigParser.prototype.getFieldConfigs = function () {
                    switch (this.mode) {
                        case Client.FieldConfigMode.Default:
                            return this.getDefaultFields();
                        case Client.FieldConfigMode.Overwrite:
                            return this.getOverwriteFields();
                        case Client.FieldConfigMode.Modify:
                            return this.getModifyFields();
                    }
                };
                return FieldsConfigParser;
            }());
            Client.FieldsConfigParser = FieldsConfigParser;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var MergedFieldsConfigParser = (function (_super) {
                __extends(MergedFieldsConfigParser, _super);
                function MergedFieldsConfigParser(spFields, fieldConfigs, list, defaultFieldsConfigParser, userFieldsConfigParser) {
                    _super.call(this, spFields, fieldConfigs, list);
                    this.defaultFieldsConfigParser = defaultFieldsConfigParser;
                    this.userFieldsConfigParser = userFieldsConfigParser;
                }
                MergedFieldsConfigParser.prototype.getMode = function () {
                    if (this.fieldConfigs == null)
                        return Client.FieldConfigMode.Default;
                    else if (_.isArray(this.fieldConfigs))
                        return Client.FieldConfigMode.Overwrite;
                    else
                        return Client.FieldConfigMode.Modify;
                };
                MergedFieldsConfigParser.prototype.getBaseFieldConfigsForOverwrite = function () {
                    return _.concat(this.defaultFieldsConfigParser.getFieldConfigs(), this.userFieldsConfigParser.getFieldConfigs());
                };
                MergedFieldsConfigParser.prototype.getDefaultFieldsImpl = function () {
                    throw new Error("This field config has no default value.");
                };
                MergedFieldsConfigParser.prototype.getOverwriteFieldsImpl = function () {
                    return this.fieldConfigs;
                };
                Object.defineProperty(MergedFieldsConfigParser.prototype, "hasFieldConfigs", {
                    get: function () {
                        return this.mode !== Client.FieldConfigMode.Default;
                    },
                    enumerable: true,
                    configurable: true
                });
                return MergedFieldsConfigParser;
            }(Client.FieldsConfigParser));
            Client.MergedFieldsConfigParser = MergedFieldsConfigParser;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var DefaultFieldsConfigParser = (function (_super) {
                __extends(DefaultFieldsConfigParser, _super);
                function DefaultFieldsConfigParser() {
                    _super.apply(this, arguments);
                }
                DefaultFieldsConfigParser.prototype.getMode = function () {
                    if (this.fieldConfigs === true)
                        return Client.FieldConfigMode.Default;
                    else if (this.fieldConfigs === false || _.isArray(this.fieldConfigs))
                        return Client.FieldConfigMode.Overwrite;
                    else
                        return Client.FieldConfigMode.Modify;
                };
                DefaultFieldsConfigParser.prototype.getBaseFieldConfigsForOverwrite = function () {
                    return this.getDefaultFieldsImpl();
                };
                DefaultFieldsConfigParser.prototype.getDefaultFieldsImpl = function () {
                    return this.list.get_defaultFieldConfigs();
                };
                DefaultFieldsConfigParser.prototype.getOverwriteFieldsImpl = function () {
                    return (this.fieldConfigs === false)
                        ? []
                        : this.fieldConfigs;
                };
                DefaultFieldsConfigParser.prototype.validate = function () {
                    var _this = this;
                    _super.prototype.validate.call(this);
                    var configs = Client.FieldUtils.getFieldConfigs(this.fieldConfigs);
                    var defaultFields = _.filter(this.spFields, function (spField) { return spField.get_fromBaseType(); });
                    _.forEach(configs, function (config) {
                        if (!_.some(defaultFields, function (field) { return field.get_internalName() === config.name; })) {
                            _this.logger.warn(("Field '" + config.name + "' is not a default field but configured as a default field.\n\n") +
                                "!!!IMPORTANT: Configuration for this field will be ignored.");
                            Client.FieldUtils.removeFieldConfig(_this.fieldConfigs, config);
                        }
                    });
                };
                return DefaultFieldsConfigParser;
            }(Client.FieldsConfigParser));
            Client.DefaultFieldsConfigParser = DefaultFieldsConfigParser;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var UserFieldsConfigParser = (function (_super) {
                __extends(UserFieldsConfigParser, _super);
                function UserFieldsConfigParser() {
                    _super.apply(this, arguments);
                }
                UserFieldsConfigParser.prototype.getMode = function () {
                    if (this.fieldConfigs === true)
                        return Client.FieldConfigMode.Default;
                    else if (this.fieldConfigs === false || _.isArray(this.fieldConfigs))
                        return Client.FieldConfigMode.Overwrite;
                    else
                        return Client.FieldConfigMode.Modify;
                };
                UserFieldsConfigParser.prototype.getBaseFieldConfigsForOverwrite = function () {
                    return this.getDefaultFieldsImpl();
                };
                UserFieldsConfigParser.prototype.getDefaultFieldsImpl = function () {
                    var _this = this;
                    var userFields = _.filter(this.spFields, function (spField) { return !spField.get_fromBaseType(); });
                    return _.map(userFields, function (spField) {
                        return _this.factory.createFieldConfig({ name: spField.get_internalName() }, _this.list.get_listConfig());
                    });
                };
                UserFieldsConfigParser.prototype.getOverwriteFieldsImpl = function () {
                    return (this.fieldConfigs === false)
                        ? []
                        : this.fieldConfigs;
                };
                UserFieldsConfigParser.prototype.validate = function () {
                    var _this = this;
                    _super.prototype.validate.call(this);
                    var configs = Client.FieldUtils.getFieldConfigs(this.fieldConfigs);
                    var userFields = _.filter(this.spFields, function (spField) { return !spField.get_fromBaseType(); });
                    _.forEach(configs, function (config) {
                        if (!_.some(userFields, function (field) { return field.get_internalName() === config.name; })) {
                            _this.logger.warn(("Field '" + config.name + "' is not a user field but configured as a user field.\n\n") +
                                "!!!IMPORTANT: Configuration for this field will be ignored.");
                            Client.FieldUtils.removeFieldConfig(_this.fieldConfigs, config);
                        }
                    });
                };
                return UserFieldsConfigParser;
            }(Client.FieldsConfigParser));
            Client.UserFieldsConfigParser = UserFieldsConfigParser;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var Queue = (function () {
                function Queue() {
                    this.data = [];
                }
                Queue.prototype.enqueue = function (item) {
                    this.data.push(item);
                };
                Queue.prototype.dequeue = function () {
                    if (_.isEmpty(this.data))
                        throw new Error("Queue is empty, can not dequeue.");
                    return this.data.shift();
                };
                Queue.prototype.dequeueAll = function () {
                    var results = [];
                    while (!_.isEmpty(this.data)) {
                        results.push(this.dequeue());
                    }
                    return results;
                };
                return Queue;
            }());
            Client.Queue = Queue;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var PendingQueue = (function (_super) {
                __extends(PendingQueue, _super);
                function PendingQueue() {
                    _super.apply(this, arguments);
                }
                PendingQueue.prototype.enqueue = function (operation) {
                    var existed = _.some(this.data, function (op) { return op.item === operation.item; });
                    if (!existed) {
                        _super.prototype.enqueue.call(this, operation);
                    }
                };
                return PendingQueue;
            }(Client.Queue));
            Client.PendingQueue = PendingQueue;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var CommitOperation = (function () {
                function CommitOperation(item) {
                    this.item = item;
                }
                CommitOperation.prototype.preCommitInvoke = function () {
                    return Client.$q().resolve();
                };
                CommitOperation.prototype.postCommitInvoke = function () {
                    return Client.$q().resolve();
                };
                return CommitOperation;
            }());
            Client.CommitOperation = CommitOperation;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListItemUpdateCommitOperation = (function (_super) {
                __extends(ListItemUpdateCommitOperation, _super);
                function ListItemUpdateCommitOperation() {
                    _super.apply(this, arguments);
                }
                ListItemUpdateCommitOperation.prototype.preCommitInvoke = function () {
                    var _this = this;
                    return this.item.$update()
                        .then(function () { return _this.item.get_spItem().update(); });
                };
                ListItemUpdateCommitOperation.prototype.postCommitInvoke = function () {
                    return this.item.$init();
                };
                return ListItemUpdateCommitOperation;
            }(Client.CommitOperation));
            Client.ListItemUpdateCommitOperation = ListItemUpdateCommitOperation;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var SessionContext = (function () {
                function SessionContext(serviceContext) {
                    this.serviceContext = serviceContext;
                }
                SessionContext.prototype.get_serviceContext = function () {
                    return this.serviceContext;
                };
                SessionContext.prototype.finalize = function () {
                    this.get_serviceContext().finalizeSession(this);
                };
                return SessionContext;
            }());
            Client.SessionContext = SessionContext;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var GetListItemSessionContext = (function (_super) {
                __extends(GetListItemSessionContext, _super);
                function GetListItemSessionContext(serviceContext, listItem) {
                    _super.call(this, serviceContext);
                    this.listItem = listItem;
                }
                GetListItemSessionContext.prototype.get_listItem = function () {
                    return this.listItem;
                };
                GetListItemSessionContext.prototype.getLookupItem = function (itemId, listId, fields) {
                    return Client.$q().resolve({});
                };
                GetListItemSessionContext.prototype.retrieveData = function () {
                    return Client.$q().resolve();
                };
                return GetListItemSessionContext;
            }(Client.SessionContext));
            Client.GetListItemSessionContext = GetListItemSessionContext;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));











var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ServiceContext = (function () {
                function ServiceContext(serverRelativeUrl) {
                    this.clientContext = Client.factory().createSPClientContext(serverRelativeUrl);
                    this.pendingQueue = Client.factory().createPendingQueue();
                    this.sessionContextManager = Client.factory().createSessionContextManager(this);
                }
                ServiceContext.prototype.commitChangesInternal = function () {
                    var defer = Client.$q().defer();
                    this.clientContext.executeQueryAsync(function () {
                        defer.resolve();
                    }, function (_, args) {
                        defer.reject(args.get_message());
                    });
                    return defer.promise;
                };
                ServiceContext.prototype.getList = function (config) {
                    var listConfig = typeof config === "string"
                        ? { listName: config }
                        : config;
                    return Client.factory().createList(listConfig, this);
                };
                ServiceContext.prototype.commitChanges = function (invokeQueue) {
                    var _this = this;
                    if (invokeQueue === void 0) { invokeQueue = true; }
                    var operations;
                    return Client.$q()
                        .resolve()
                        .then(function () {
                        if (invokeQueue) {
                            operations = _this.pendingQueue.dequeueAll();
                            var promises = _.map(operations, function (op) { return op.preCommitInvoke(); });
                            return Client.$q().all(promises);
                        }
                    })
                        .then(function () { return _this.commitChangesInternal(); })
                        .then(function () {
                        if (invokeQueue) {
                            var promises = _.map(operations, function (op) { return op.postCommitInvoke(); });
                            return Client.$q().all(promises);
                        }
                    })
                        .then(function () { });
                };
                ServiceContext.prototype.addPending = function (listItem) {
                    this.pendingQueue.enqueue(Client.factory().createPendingOperation(listItem));
                };
                ServiceContext.prototype.finalizeSession = function (session) {
                    this.sessionContextManager.finalize(session);
                };
                ServiceContext.prototype.getGetListItemSessionContext = function (listItem) {
                    return this.sessionContextManager.getGetListItemSession(listItem);
                };
                return ServiceContext;
            }());
            Client.ServiceContext = ServiceContext;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));















var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var Logger = (function () {
                function Logger(creationContext) {
                    if (creationContext === void 0) { creationContext = {}; }
                    this.creationContext = creationContext;
                }
                Logger.prototype.pretyMessage = function (message, options) {
                    if (options === void 0) { options = {}; }
                    var context = _.defaultsDeep({}, options.creationContext, this.creationContext);
                    return String.format(message, options.actual, options.expected) +
                        "\n\n" +
                        (context.itemId ? "-> Item Id        : '" + context.itemId + "'\n" : "") +
                        (context.fieldName ? "-> Field          : '" + context.fieldName + "'\n" : "") +
                        (context.listName ? "-> List           : '" + context.listName + "'\n" : "") +
                        (context.contextUrl ? "-> Context Url    : '" + context.contextUrl + "'\n" : "") +
                        (options.expected !== undefined ? "-> Expected Value : '" + options.expected + "'\n" : "") +
                        (options.actual !== undefined ? "-> Actual Value   : '" + options.actual + "'\n" : "");
                };
                Object.defineProperty(Logger.prototype, "itemId", {
                    get: function () {
                        return this.creationContext.itemId;
                    },
                    set: function (id) {
                        this.creationContext.itemId = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Logger.prototype, "fieldName", {
                    get: function () {
                        return this.creationContext.fieldName;
                    },
                    set: function (value) {
                        this.creationContext.fieldName = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Logger.prototype, "listName", {
                    get: function () {
                        return this.creationContext.listName;
                    },
                    set: function (value) {
                        this.creationContext.listName = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Logger.prototype, "contextUrl", {
                    get: function () {
                        return this.creationContext.contextUrl;
                    },
                    set: function (value) {
                        this.creationContext.contextUrl = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Logger.prototype.error = function (message, options) {
                    throw new Error(this.pretyMessage(message, options));
                };
                Logger.prototype.warn = function (message, options) {
                    console.warn("Warning: " + this.pretyMessage(message, options));
                };
                Logger.prototype.clone = function () {
                    return new Logger({
                        itemId: this.itemId,
                        fieldName: this.fieldName,
                        listName: this.listName,
                        contextUrl: this.contextUrl
                    });
                };
                return Logger;
            }());
            Client.Logger = Logger;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));



var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Lists;
            (function (Lists) {
                var FieldRef = (function (_super) {
                    __extends(FieldRef, _super);
                    function FieldRef() {
                        _super.apply(this, arguments);
                    }
                    return FieldRef;
                }(Caml.CamlElement));
                Lists.FieldRef = FieldRef;
            })(Lists = Caml.Lists || (Caml.Lists = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

























var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Lists;
            (function (Lists) {
                var Joins = (function (_super) {
                    __extends(Joins, _super);
                    function Joins() {
                        _super.apply(this, arguments);
                    }
                    return Joins;
                }(Caml.CamlElement));
                Lists.Joins = Joins;
            })(Lists = Caml.Lists || (Caml.Lists = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Lists;
            (function (Lists) {
                var Query = (function (_super) {
                    __extends(Query, _super);
                    function Query() {
                        _super.apply(this, arguments);
                    }
                    return Query;
                }(Caml.CamlElement));
                Lists.Query = Query;
            })(Lists = Caml.Lists || (Caml.Lists = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Lists;
            (function (Lists) {
                var RowLimit = (function (_super) {
                    __extends(RowLimit, _super);
                    function RowLimit() {
                        _super.apply(this, arguments);
                    }
                    return RowLimit;
                }(Caml.CamlElement));
                Lists.RowLimit = RowLimit;
            })(Lists = Caml.Lists || (Caml.Lists = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Lists;
            (function (Lists) {
                var View = (function (_super) {
                    __extends(View, _super);
                    function View() {
                        _super.apply(this, arguments);
                    }
                    return View;
                }(Caml.CamlElement));
                Lists.View = View;
            })(Lists = Caml.Lists || (Caml.Lists = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Lists;
            (function (Lists) {
                var ViewFields = (function (_super) {
                    __extends(ViewFields, _super);
                    function ViewFields() {
                        _super.apply(this, arguments);
                    }
                    return ViewFields;
                }(Caml.CamlElement));
                Lists.ViewFields = ViewFields;
            })(Lists = Caml.Lists || (Caml.Lists = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));





var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Views;
            (function (Views) {
                var ProjectedFields = (function (_super) {
                    __extends(ProjectedFields, _super);
                    function ProjectedFields() {
                        _super.apply(this, arguments);
                    }
                    return ProjectedFields;
                }(Caml.CamlElement));
                Views.ProjectedFields = ProjectedFields;
            })(Views = Caml.Views || (Caml.Views = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var Eq = (function (_super) {
                    __extends(Eq, _super);
                    function Eq() {
                        _super.apply(this, arguments);
                    }
                    return Eq;
                }(Queries.SingleValueBinaryOperator));
                Queries.Eq = Eq;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var FieldRef = (function (_super) {
                    __extends(FieldRef, _super);
                    function FieldRef() {
                        _super.apply(this, arguments);
                    }
                    return FieldRef;
                }(Caml.CamlElement));
                Queries.FieldRef = FieldRef;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var GroupBy = (function (_super) {
                    __extends(GroupBy, _super);
                    function GroupBy() {
                        _super.apply(this, arguments);
                    }
                    return GroupBy;
                }(Caml.CamlElement));
                Queries.GroupBy = GroupBy;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));





















var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var In = (function (_super) {
                    __extends(In, _super);
                    function In() {
                        _super.apply(this, arguments);
                    }
                    return In;
                }(Queries.MultipleValueBinaryOperator));
                Queries.In = In;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

























var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var OrderBy = (function (_super) {
                    __extends(OrderBy, _super);
                    function OrderBy() {
                        _super.apply(this, arguments);
                    }
                    return OrderBy;
                }(Caml.CamlElement));
                Queries.OrderBy = OrderBy;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var Today = (function (_super) {
                    __extends(Today, _super);
                    function Today() {
                        _super.apply(this, arguments);
                    }
                    return Today;
                }(Caml.CamlElement));
                Queries.Today = Today;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var Value = (function (_super) {
                    __extends(Value, _super);
                    function Value() {
                        _super.apply(this, arguments);
                    }
                    return Value;
                }(Caml.CamlElement));
                Queries.Value = Value;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var Values = (function (_super) {
                    __extends(Values, _super);
                    function Values() {
                        _super.apply(this, arguments);
                    }
                    return Values;
                }(Caml.CamlElement));
                Queries.Values = Values;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Caml;
        (function (Caml) {
            var Queries;
            (function (Queries) {
                var Where = (function (_super) {
                    __extends(Where, _super);
                    function Where() {
                        _super.apply(this, arguments);
                    }
                    return Where;
                }(Caml.CamlElement));
                Queries.Where = Where;
            })(Queries = Caml.Queries || (Caml.Queries = {}));
        })(Caml = SharePoint.Caml || (SharePoint.Caml = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));











var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListItem = (function () {
                function ListItem(spItem, list) {
                    this.$$private = Client.factory().createListItemPrivateData(spItem, list);
                }
                ListItem.prototype.$init = function () {
                    var _this = this;
                    this.$$private.state = Client.ListItemState.Initializing;
                    return this.retrieveItemFieldsData()
                        .then(function () {
                        _.forEach(_this.$$private.allListFields, function (field) {
                            Object.defineProperty(_this.__proto__, _.lowerFirst(field.internalName), {
                                enumerable: true,
                                configurable: true,
                                get: function () { return _this.getData(field); },
                                set: function (value) { return _this.setData(field, value); }
                            });
                        });
                    })
                        .then(function () {
                        _this.$$private.state = Client.ListItemState.Initialized;
                    });
                };
                ListItem.prototype.$update = function () {
                    var _this = this;
                    return Client.$q()
                        .all(_.map(this.$$private.allListFields, function (field) { return field.parseRequest(_this); }))
                        .then(function () {
                        _this.resetListItem();
                        _this.$$private.state = Client.ListItemState.NotInitialized;
                    });
                };
                ListItem.prototype.getFieldName = function (field) {
                    return (typeof field === "string")
                        ? field
                        : field.internalName;
                };
                ListItem.prototype.resetListItem = function () {
                    var _this = this;
                    var fieldNames = _.map(this.$$private.allListFields, function (f) { return f.internalName; });
                    _.forEach(fieldNames, function (name) {
                        var proto = _this.__proto__;
                        var propName = _.lowerFirst(name);
                        delete proto[propName];
                    });
                    this.$$private.clearData();
                };
                ListItem.prototype.retrieveItemFieldsData = function () {
                    var _this = this;
                    var promises = _.map(this.$$private.allListFields, function (field) { return field.parseResponse(_this); });
                    var listItemContext = this.get_parentList()
                        .get_serviceContext()
                        .getGetListItemSessionContext(this);
                    return listItemContext.retrieveData()
                        .then(function () { return Client.$q().all(promises); })
                        .then(function () { return listItemContext.finalize(); });
                };
                Object.defineProperty(ListItem.prototype, "id", {
                    get: function () {
                        return this.$$private.spItem.get_id();
                    },
                    set: function (id) {
                        throw new Error("'Id' field is readonly. It can not be set.");
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                ListItem.prototype.get_parentList = function () {
                    return this.$$private.list;
                };
                ListItem.prototype.get_spItem = function () {
                    return this.$$private.spItem;
                };
                ListItem.prototype.getData = function (field) {
                    var fieldName = this.getFieldName(field);
                    if (this.$$private.state !== Client.ListItemState.Initialized) {
                        this.$$private.logger.error("Can not get data of uninitialized list item.", {
                            creationContext: {
                                fieldName: fieldName
                            }
                        });
                    }
                    return this.$$private.getData(fieldName);
                };
                ListItem.prototype.setData = function (field, value) {
                    value = (value === undefined) ? null : value;
                    var fieldName = this.getFieldName(field);
                    if (this.$$private.state !== Client.ListItemState.Initialized) {
                        this.$$private.logger.error("Can not set data of uninitialized list item.", {
                            creationContext: {
                                fieldName: fieldName
                            }
                        });
                    }
                    var listField = _.find(this.$$private.allListFields, function (f) { return f.internalName === fieldName; });
                    if (!listField)
                        return;
                    this.$$private.setData(fieldName, value);
                    this.$$private.list.get_serviceContext().addPending(this);
                };
                ListItem.prototype.getOriginalData = function (field) {
                    var fieldName = this.getFieldName(field);
                    return this.$$private.getOriginalData(fieldName);
                };
                ListItem.prototype.setOriginalData = function (field, value) {
                    var fieldName = this.getFieldName(field);
                    this.$$private.setOriginalData(fieldName, value);
                };
                return ListItem;
            }());
            Client.ListItem = ListItem;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListItemPrivateData = (function () {
                function ListItemPrivateData(spItem, list) {
                    this.spItem = spItem;
                    this.list = list;
                    this.fieldData = {};
                    this.fieldOriginalData = {};
                    this.state = Client.ListItemState.NotInitialized;
                    this.logger = Client.factory().createLogger({
                        itemId: this.spItem.get_id(),
                        listName: this.list.get_listConfig().listName,
                        contextUrl: this.list.get_serviceContext().clientContext.get_url()
                    });
                }
                ListItemPrivateData.prototype.getCloneIfPossible = function (objToClone) {
                    var _this = this;
                    if (_.isArray(objToClone)) {
                        return _.map(objToClone, function (elem) { return _this.getCloneIfPossible(elem); });
                    }
                    var cloneFn = objToClone && objToClone.clone;
                    return _.isFunction(cloneFn)
                        ? cloneFn.call(objToClone)
                        : objToClone;
                };
                Object.defineProperty(ListItemPrivateData.prototype, "allListFields", {
                    get: function () {
                        return this.list.get_fields();
                    },
                    enumerable: true,
                    configurable: true
                });
                ListItemPrivateData.prototype.getData = function (fieldName) {
                    var currentValue = this.fieldData[fieldName];
                    if (currentValue !== undefined)
                        return currentValue;
                    var originalValue = this.getCloneIfPossible(this.fieldOriginalData[fieldName]);
                    return (this.fieldData[fieldName] = originalValue);
                };
                ListItemPrivateData.prototype.setData = function (fieldName, value) {
                    this.fieldData[fieldName] = value;
                };
                ListItemPrivateData.prototype.getOriginalData = function (fieldName) {
                    return this.fieldOriginalData[fieldName];
                };
                ListItemPrivateData.prototype.setOriginalData = function (fieldName, value) {
                    this.fieldOriginalData[fieldName] = value;
                };
                ListItemPrivateData.prototype.clearData = function () {
                    this.fieldData = {};
                    this.fieldOriginalData = {};
                };
                return ListItemPrivateData;
            }());
            Client.ListItemPrivateData = ListItemPrivateData;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            (function (ListItemState) {
                ListItemState[ListItemState["NotInitialized"] = 0] = "NotInitialized";
                ListItemState[ListItemState["Initializing"] = 1] = "Initializing";
                ListItemState[ListItemState["Initialized"] = 2] = "Initialized";
            })(Client.ListItemState || (Client.ListItemState = {}));
            var ListItemState = Client.ListItemState;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));











































var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var SessionContextManager = (function () {
                function SessionContextManager(serviceContext) {
                    this.serviceContext = serviceContext;
                    this.getListItemSessionContexts = [];
                }
                Object.defineProperty(SessionContextManager.prototype, "sessionContextsList", {
                    get: function () {
                        return [
                            this.getListItemSessionContexts
                        ];
                    },
                    enumerable: true,
                    configurable: true
                });
                SessionContextManager.prototype.getGetListItemSession = function (listItem) {
                    var context = _.find(this.getListItemSessionContexts, function (context) { return context.get_listItem() === listItem; });
                    if (!context) {
                        context = Client.factory().createGetListItemSessionContext(this.serviceContext, listItem);
                        this.getListItemSessionContexts.push(context);
                    }
                    return context;
                };
                SessionContextManager.prototype.finalize = function (session) {
                    _.forEach(this.sessionContextsList, function (list) { return _.pull(list, session); });
                };
                return SessionContextManager;
            }());
            Client.SessionContextManager = SessionContextManager;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var DEFAULT_CONFIGS = {
                name: undefined,
                active: true,
                json: false,
                expand: false
            };
            var FieldConfig = (function () {
                function FieldConfig(configLiteral, listConfig) {
                    this.configLiteral = configLiteral;
                    this.listConfig = listConfig;
                    this.parsers = {
                        request: null,
                        response: null
                    };
                    this.configLiteral = _.defaultsDeep({}, configLiteral, DEFAULT_CONFIGS);
                    this.logger = Client.factory().createLogger({
                        listName: this.listName,
                        contextUrl: this.contextUrl
                    });
                    if (!this.configLiteral.name) {
                        this.logger.error("Expect field config object has value for 'name' property, but got '" + this.configLiteral.name + "'.");
                    }
                    this.logger.fieldName = this.configLiteral.name;
                    this.name = this.configLiteral.name;
                    this.active = !!this.configLiteral.active;
                    this.json = !!this.configLiteral.json;
                    this.expand = this.getExpandConfig(this.configLiteral.expand);
                    this.parsers.request = this.getParsingHandlers(this.configLiteral.parsers && this.configLiteral.parsers.request);
                    this.parsers.response = this.getParsingHandlers(this.configLiteral.parsers && this.configLiteral.parsers.response);
                }
                Object.defineProperty(FieldConfig.prototype, "listName", {
                    get: function () {
                        return this.get_listConfig().listName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FieldConfig.prototype, "contextUrl", {
                    get: function () {
                        return this.get_listConfig().getList().get_serviceContext().clientContext.get_url();
                    },
                    enumerable: true,
                    configurable: true
                });
                FieldConfig.prototype.getExpandConfig = function (expandConfig) {
                    if (typeof expandConfig === "boolean") {
                        return expandConfig;
                    }
                    if (_.isArray(expandConfig)) {
                        var valid = _.every(expandConfig, function (config) { return _.isString(config); });
                        if (!valid) {
                            this.logger.error("Expect expand is an array of string, but got '" + expandConfig + "'.");
                        }
                        return expandConfig;
                    }
                    this.logger.error("Expect expand is a boolean or an array of string, but got '" + expandConfig + "'.");
                };
                FieldConfig.prototype.getParsingHandlers = function (handler) {
                    var _this = this;
                    var createSingleHandler = function (singleValue) {
                        if (_.isFunction(singleValue)) {
                            return singleValue;
                        }
                        _this.logger.error("Expect field handler is a function, but got '" + singleValue + "'");
                    };
                    if (!handler)
                        return [];
                    return _.isArray(handler) ? _.map(handler, createSingleHandler) : [createSingleHandler(handler)];
                };
                FieldConfig.prototype.get_listConfig = function () {
                    return this.listConfig;
                };
                return FieldConfig;
            }());
            Client.FieldConfig = FieldConfig;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));







var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            (function (FieldConfigMode) {
                FieldConfigMode[FieldConfigMode["Default"] = 0] = "Default";
                FieldConfigMode[FieldConfigMode["Overwrite"] = 1] = "Overwrite";
                FieldConfigMode[FieldConfigMode["Modify"] = 2] = "Modify";
            })(Client.FieldConfigMode || (Client.FieldConfigMode = {}));
            var FieldConfigMode = Client.FieldConfigMode;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));











var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var FieldUtils = (function () {
                function FieldUtils() {
                }
                FieldUtils.getFieldConfigs = function (config) {
                    if (config == null || typeof config === "boolean")
                        return [];
                    return _.isArray(config)
                        ? config
                        : _.values(config);
                };
                FieldUtils.removeFieldConfig = function (config, configToRemove) {
                    if (_.isArray(config)) {
                        _.pull(config, configToRemove);
                    }
                    else {
                        delete config[configToRemove.name];
                    }
                };
                return FieldUtils;
            }());
            Client.FieldUtils = FieldUtils;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

























var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldBoolean = (function (_super) {
                __extends(ListFieldBoolean, _super);
                function ListFieldBoolean(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.Field);
                }
                ListFieldBoolean.prototype.setValueOverride = function (item, value) {
                    value = (value == null) ? value : !!value;
                    return _super.prototype.setValueOverride.call(this, item, value);
                };
                return ListFieldBoolean;
            }(Client.ListField));
            Client.ListFieldBoolean = ListFieldBoolean;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldDateTime = (function (_super) {
                __extends(ListFieldDateTime, _super);
                function ListFieldDateTime(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldDateTime);
                }
                ListFieldDateTime.prototype.getValueOverride = function (item) {
                    return _super.prototype.getValueOverride.call(this, item).then(function (value) {
                        return value != null ? new Date(value) : null;
                    });
                };
                ListFieldDateTime.prototype.setValueOverride = function (item, value) {
                    if (value != null && !(value instanceof Date)) {
                        this.getLogger(item).error("Expect value is instance of type 'Date', but got '" + typeof (value) + "'.");
                    }
                    return _super.prototype.setValueOverride.call(this, item, value);
                };
                return ListFieldDateTime;
            }(Client.ListField));
            Client.ListFieldDateTime = ListFieldDateTime;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldLookup = (function (_super) {
                __extends(ListFieldLookup, _super);
                function ListFieldLookup(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldLookup);
                }
                ListFieldLookup.prototype.getValueOverride = function (item) {
                    var _this = this;
                    var result;
                    var sessionContext = this.get_list().get_serviceContext().getGetListItemSessionContext(item);
                    var value = item.get_spItem().get_item(this.internalName);
                    if (value == null) {
                        result = this.allowMultipleValues ? [] : null;
                    }
                    else {
                        result = this.allowMultipleValues
                            ? Client.$q().all(_.map(value, function (v) { return sessionContext.getLookupItem(v.get_lookupId(), _this.lookupList, []); }))
                            : sessionContext.getLookupItem(value.get_lookupId(), this.lookupList, []);
                    }
                    return Client.$q().resolve(result);
                };
                Object.defineProperty(ListFieldLookup.prototype, "allowMultipleValues", {
                    get: function () {
                        return this.spField.get_allowMultipleValues();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListFieldLookup.prototype, "lookupField", {
                    get: function () {
                        return this.spField.get_lookupField();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListFieldLookup.prototype, "lookupList", {
                    get: function () {
                        return this.spField.get_lookupList();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListFieldLookup;
            }(Client.ListField));
            Client.ListFieldLookup = ListFieldLookup;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldMultiLineText = (function (_super) {
                __extends(ListFieldMultiLineText, _super);
                function ListFieldMultiLineText(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldMultiLineText);
                }
                ListFieldMultiLineText.prototype.getValueOverride = function (item) {
                    var value = item.get_spItem().get_item(this.internalName);
                    var result = value;
                    if (this.get_fieldConfig().json) {
                        try {
                            result = JSON.parse(value);
                        }
                        catch (e) {
                            this.getLogger(item).warn("Error while parsing json field: '" + e + "'.", {
                                actual: value
                            });
                            result = null;
                        }
                    }
                    return Client.$q().resolve(result);
                };
                ListFieldMultiLineText.prototype.setValueOverride = function (item, value) {
                    var result = value;
                    if (this.get_fieldConfig().json) {
                        try {
                            result = JSON.stringify(value);
                        }
                        catch (e) {
                            this.getLogger(item).warn("Error while stringify json field: '" + e + "'.", {
                                actual: value
                            });
                            return Client.$q().resolve();
                        }
                    }
                    return _super.prototype.setValueOverride.call(this, item, result);
                };
                return ListFieldMultiLineText;
            }(Client.ListField));
            Client.ListFieldMultiLineText = ListFieldMultiLineText;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldNumber = (function (_super) {
                __extends(ListFieldNumber, _super);
                function ListFieldNumber(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldNumber);
                }
                ListFieldNumber.prototype.setValueOverride = function (item, value) {
                    var numberValue = (value == null) ? null : parseFloat(value);
                    if (_.isNaN(numberValue)) {
                        this.getLogger(item).error("Expect value is convertible to float, but got '" + value + "'.");
                    }
                    return _super.prototype.setValueOverride.call(this, item, numberValue);
                };
                Object.defineProperty(ListFieldNumber.prototype, "maximumValue", {
                    get: function () {
                        return this.spField.get_maximumValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListFieldNumber.prototype, "minimumValue", {
                    get: function () {
                        return this.spField.get_minimumValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListFieldNumber;
            }(Client.ListField));
            Client.ListFieldNumber = ListFieldNumber;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var MAX_TEXT_LENGTH = 255;
            var ListFieldText = (function (_super) {
                __extends(ListFieldText, _super);
                function ListFieldText(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldText);
                }
                ListFieldText.prototype.setValueOverride = function (item, value) {
                    if (_.size(value) > MAX_TEXT_LENGTH) {
                        this.getLogger(item).error("Expect value length <= '" + MAX_TEXT_LENGTH + "', but got '" + _.size(value) + "'.");
                    }
                    return _super.prototype.setValueOverride.call(this, item, value);
                };
                Object.defineProperty(ListFieldText.prototype, "maxLength", {
                    get: function () {
                        return this.spField.get_maxLength();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListFieldText;
            }(Client.ListField));
            Client.ListFieldText = ListFieldText;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldUniqueId = (function (_super) {
                __extends(ListFieldUniqueId, _super);
                function ListFieldUniqueId() {
                    _super.apply(this, arguments);
                }
                ListFieldUniqueId.prototype.getValueOverride = function (item) {
                    var guid = item.get_spItem().get_item(this.internalName);
                    return Client.$q().resolve(guid.toString());
                };
                ListFieldUniqueId.prototype.setValueOverride = function (item, value) {
                    var originalValue = item.getOriginalData(this);
                    if (value !== originalValue) {
                        this.getLogger(item).error("This field is readonly, its value can not be set.");
                    }
                    return Client.$q().resolve();
                };
                return ListFieldUniqueId;
            }(Client.ListField));
            Client.ListFieldUniqueId = ListFieldUniqueId;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldUrl = (function (_super) {
                __extends(ListFieldUrl, _super);
                function ListFieldUrl(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldUrl);
                }
                ListFieldUrl.prototype.getValueOverride = function (item) {
                    var value = item.get_spItem().get_item(this.internalName);
                    var result = (value == null)
                        ? null
                        : Client.factory().createListFieldUrlValue(value, this, item);
                    return Client.$q().resolve(result);
                };
                ListFieldUrl.prototype.setValueOverride = function (item, value) {
                    if (value == null) {
                        return _super.prototype.setValueOverride.call(this, item, null);
                    }
                    var url = (typeof value === "string") ? value : value.url;
                    var description = (typeof value === "string") ? value : value.description;
                    if (!this.isValidUrl(url)) {
                        this.getLogger(item).error("Url is not valid: '" + url + "'.");
                    }
                    var fieldUrlValue = Client.factory().createSPFieldUrlValue(url, description);
                    return _super.prototype.setValueOverride.call(this, item, fieldUrlValue);
                };
                ListFieldUrl.prototype.isFieldValueChanged = function (newValue, originalValue) {
                    var newUrl = newValue && newValue.get_url();
                    var newDescription = newValue && newValue.get_description();
                    var originalUrl = originalValue && originalValue.url;
                    var originalDescription = originalValue && originalValue.description;
                    return (newUrl !== originalUrl) || (newDescription !== originalDescription);
                };
                ListFieldUrl.prototype.isValidUrl = function (url) {
                    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                    return regexp.test(url);
                };
                return ListFieldUrl;
            }(Client.ListField));
            Client.ListFieldUrl = ListFieldUrl;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldUser = (function (_super) {
                __extends(ListFieldUser, _super);
                function ListFieldUser(field, fieldConfig, list) {
                    _super.call(this, field, fieldConfig, list);
                    this.setField(SP.FieldUser);
                }
                ListFieldUser.prototype.getValueOverride = function (item) {
                    var _this = this;
                    var result;
                    var value = item.get_spItem().get_item(this.internalName);
                    if (value == null) {
                        result = this.allowMultipleValues ? [] : null;
                    }
                    else {
                        result = this.allowMultipleValues
                            ? _.map(value, function (v) { return Client.factory().createListFieldUserValue(v, _this, item); })
                            : Client.factory().createListFieldUserValue(value, this, item);
                    }
                    return Client.$q().resolve(result);
                };
                ListFieldUser.prototype.setValueOverride = function (item, value) {
                    if (value == null) {
                        return _super.prototype.setValueOverride.call(this, item, null);
                    }
                    if (this.allowMultipleValues && !(_.isArray(value) || value == null)) {
                        this.getLogger(item).error("Expect value is an array, but got '" + value + "'.");
                    }
                    return _super.prototype.setValueInternal.call(this, item, this.allowMultipleValues
                        ? this.createSPFieldUserValues(item, value)
                        : this.createSPFieldUserValue(item, value));
                };
                ListFieldUser.prototype.isFieldValueChanged = function (newValue, originalValue) {
                    var newIds = this.getIdFromSPFieldUserValue(newValue);
                    var originalIds = this.getIdFromListFieldUserValue(originalValue);
                    return !_.isEqual(newIds, originalIds);
                };
                ListFieldUser.prototype.createSPFieldUserValue = function (item, rawValue) {
                    var id = (typeof rawValue === "number") ? rawValue : rawValue.id;
                    if (!(id > 0)) {
                        this.getLogger(item).error("Expect user id is a positive integer, but got '" + id + "'.");
                    }
                    return Client.factory().createSPFieldUserValue(id);
                };
                ListFieldUser.prototype.createSPFieldUserValues = function (item, rawValues) {
                    var _this = this;
                    return _.chain(rawValues)
                        .filter(function (v) { return v != null; })
                        .map(function (v) { return _this.createSPFieldUserValue(item, v); })
                        .value();
                };
                ListFieldUser.prototype.getIdFromSPFieldUserValue = function (userValue) {
                    var getId = function (value) {
                        return value == null
                            ? null
                            : value.get_lookupId();
                    };
                    return _.isArray(userValue)
                        ? _.map(userValue, function (v) { return getId(v); })
                        : [getId(userValue)];
                };
                ListFieldUser.prototype.getIdFromListFieldUserValue = function (userValue) {
                    var getId = function (value) {
                        return value == null
                            ? null
                            : value.id;
                    };
                    return _.isArray(userValue)
                        ? _.map(userValue, function (v) { return getId(v); })
                        : [getId(userValue)];
                };
                Object.defineProperty(ListFieldUser.prototype, "selectionMode", {
                    get: function () {
                        return this.spField.get_selectionMode();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListFieldUser;
            }(Client.ListFieldLookup));
            Client.ListFieldUser = ListFieldUser;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));













var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldLookupValue = (function () {
                function ListFieldLookupValue(lookupValue, lookupField, listItem) {
                    this.$$private = Client.factory().createListFieldLookupValuePrivateData(lookupValue, lookupField, listItem);
                }
                ListFieldLookupValue.prototype.enqueueToPendingChanges = function () {
                    this.$$private.listItem.get_parentList().get_serviceContext().addPending(this.$$private.listItem);
                };
                Object.defineProperty(ListFieldLookupValue.prototype, "id", {
                    get: function () {
                        return this.$$private.itemValue.get_lookupId();
                    },
                    set: function (value) {
                        this.$$private.itemValue.set_lookupId(value);
                        this.enqueueToPendingChanges();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ListFieldLookupValue;
            }());
            Client.ListFieldLookupValue = ListFieldLookupValue;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldLookupValuePrivateData = (function () {
                function ListFieldLookupValuePrivateData(itemValue, itemField, listItem) {
                    this.itemValue = itemValue;
                    this.itemField = itemField;
                    this.listItem = listItem;
                }
                return ListFieldLookupValuePrivateData;
            }());
            Client.ListFieldLookupValuePrivateData = ListFieldLookupValuePrivateData;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldUrlValue = (function () {
                function ListFieldUrlValue(urlValue, urlField, listItem) {
                    this.$$private = Client.factory().createListFieldUrlValuePrivateData(urlValue, urlField, listItem);
                }
                ListFieldUrlValue.prototype.enqueueToPendingChanges = function () {
                    this.$$private.listItem.get_parentList().get_serviceContext().addPending(this.$$private.listItem);
                };
                Object.defineProperty(ListFieldUrlValue.prototype, "url", {
                    get: function () {
                        return this.$$private.urlValue.get_url();
                    },
                    set: function (value) {
                        this.$$private.urlValue.set_url(value);
                        this.enqueueToPendingChanges();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListFieldUrlValue.prototype, "description", {
                    get: function () {
                        return this.$$private.urlValue.get_description();
                    },
                    set: function (value) {
                        this.$$private.urlValue.set_description(value);
                        this.enqueueToPendingChanges();
                    },
                    enumerable: true,
                    configurable: true
                });
                ListFieldUrlValue.prototype.clone = function () {
                    var newUrlValue = Client.factory()
                        .createSPFieldUrlValue(this.url, this.description);
                    return Client.factory().createListFieldUrlValue(newUrlValue, this.$$private.urlField, this.$$private.listItem);
                };
                return ListFieldUrlValue;
            }());
            Client.ListFieldUrlValue = ListFieldUrlValue;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldUrlValuePrivateData = (function () {
                function ListFieldUrlValuePrivateData(urlValue, urlField, listItem) {
                    this.urlValue = urlValue;
                    this.urlField = urlField;
                    this.listItem = listItem;
                }
                return ListFieldUrlValuePrivateData;
            }());
            Client.ListFieldUrlValuePrivateData = ListFieldUrlValuePrivateData;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldUserValue = (function (_super) {
                __extends(ListFieldUserValue, _super);
                function ListFieldUserValue(userValue, userField, listItem) {
                    _super.call(this, userValue, userField, listItem);
                    this.$$private = Client.factory().createListFieldUserValuePrivateData(userValue, userField, listItem);
                }
                Object.defineProperty(ListFieldUserValue.prototype, "title", {
                    get: function () {
                        return this.$$private.itemValue.get_lookupValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                ListFieldUserValue.prototype.clone = function () {
                    return Client.factory().createListFieldUserValue(_.cloneDeep(this.$$private.itemValue), this.$$private.itemField, this.$$private.listItem);
                };
                return ListFieldUserValue;
            }(Client.ListFieldLookupValue));
            Client.ListFieldUserValue = ListFieldUserValue;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var ListFieldUserValuePrivateData = (function (_super) {
                __extends(ListFieldUserValuePrivateData, _super);
                function ListFieldUserValuePrivateData(itemValue, itemField, listItem) {
                    _super.call(this, itemValue, itemField, listItem);
                    this.itemValue = itemValue;
                    this.itemField = itemField;
                    this.listItem = listItem;
                }
                return ListFieldUserValuePrivateData;
            }(Client.ListFieldLookupValuePrivateData));
            Client.ListFieldUserValuePrivateData = ListFieldUserValuePrivateData;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));





var Fx;
(function (Fx) {
    var SharePoint;
    (function (SharePoint) {
        var Client;
        (function (Client) {
            var DEFAULT_CONFIGS = {
                listName: undefined,
                fields: null,
                defaultFields: true,
                userFields: true
            };
            var ListConfig = (function () {
                function ListConfig(configLiteral, list) {
                    this.configLiteral = configLiteral;
                    this.list = list;
                    this.configLiteral = _.defaultsDeep({}, configLiteral, DEFAULT_CONFIGS);
                    if (!this.configLiteral.listName && !_.isString(this.configLiteral.listName)) {
                        this.logger.error("Expect 'config.listName' is a string, but got '" + configLiteral.listName + "'.");
                    }
                    this.refreshConfigValue();
                }
                Object.defineProperty(ListConfig.prototype, "contextUrl", {
                    get: function () {
                        return this.getList().get_serviceContext().clientContext.get_url();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListConfig.prototype, "logger", {
                    get: function () {
                        return Client.factory().createLogger({
                            listName: this.listName,
                            contextUrl: this.contextUrl
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                ListConfig.prototype.getBoolableFieldConfig = function (config) {
                    return (typeof config === "boolean")
                        ? config
                        : this.getFieldConfig(config);
                };
                ListConfig.prototype.getFieldConfig = function (config) {
                    try {
                        return (_.isArray(config) || !_.isObjectLike(config))
                            ? Client.factory().createArrayFieldConfig(config, this)
                            : Client.factory().createHashFieldConfig(config, this);
                    }
                    catch (e) {
                        if (e instanceof Client.FieldConfigCreationException) {
                            var error = e;
                            this.logger.error(error.message, {
                                creationContext: {
                                    fieldName: error.fieldName
                                }
                            });
                        }
                        else {
                            throw e;
                        }
                    }
                };
                ListConfig.prototype.validateDuplicateFields = function (fieldConfigs) {
                    var _this = this;
                    var fields = _.isArray(fieldConfigs)
                        ? fieldConfigs
                        : _.values(fieldConfigs);
                    _.forEach(fields, function (field) {
                        if (_.filter(fields, function (f) { return f.name === field.name; }).length > 1) {
                            _this.logger.error("Duplicated field config for field '" + field.name + "'.");
                        }
                    });
                };
                ListConfig.prototype.refreshConfigValue = function () {
                    this.listName = this.configLiteral.listName;
                    this.fields = this.configLiteral.fields == null
                        ? null
                        : this.getFieldConfig(this.configLiteral.fields);
                    this.defaultFields = this.getBoolableFieldConfig(this.configLiteral.defaultFields);
                    this.userFields = this.getBoolableFieldConfig(this.configLiteral.userFields);
                    this.validateConfigValue();
                };
                ListConfig.prototype.validateConfigValue = function () {
                    if (this.fields != null) {
                        this.validateDuplicateFields(this.fields);
                    }
                    if (!_.isBoolean(this.defaultFields)) {
                        this.validateDuplicateFields(this.defaultFields);
                    }
                    if (!_.isBoolean(this.userFields)) {
                        this.validateDuplicateFields(this.userFields);
                    }
                };
                ListConfig.prototype.getList = function () {
                    return this.list;
                };
                return ListConfig;
            }());
            Client.ListConfig = ListConfig;
        })(Client = SharePoint.Client || (SharePoint.Client = {}));
    })(SharePoint = Fx.SharePoint || (Fx.SharePoint = {}));
})(Fx || (Fx = {}));













var Fx;
(function (Fx) {
    Fx.finalizeClass();
})(Fx || (Fx = {}));

//# sourceMappingURL=fx.sharepoint.lists.jsom.js.map
