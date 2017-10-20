// Copyright 2014 Frank A. Krueger
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//    http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
// �������E�E�E
var NotImplementedException = (function () {
    function NotImplementedException(message) {
        if (message === void 0) { message = "Not implemented"; }
        this.Message = message;
    }
    NotImplementedException.prototype.ToString = function () {
        return "Exception: " + this.Message;
    };
    return NotImplementedException;
}());
// https://qiita.com/YusukeHirao/items/2f0fb8d5bbb981101be0
function stringToArray(str) {
    return str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
}
function stringFromCodePoint(codeNum) {
    var cp = codeNum - 0x10000;
    var high = 0xD800 | (cp >> 10);
    var low = 0xDC00 | (cp & 0x3FF);
    return String.fromCharCode(high, low);
}
//#region Base
var StringSplitOptions;
(function (StringSplitOptions) {
    // �߂�l�ɂ́A��̕������i�[����z��v�f���܂܂�Ă��܂��B
    StringSplitOptions[StringSplitOptions["None"] = 0] = "None";
    // �߂�l�͋�̕������i�[���Ă���z��v�f��܂܂Ȃ�
    StringSplitOptions[StringSplitOptions["RemoveEmptyEntries"] = 1] = "RemoveEmptyEntries";
})(StringSplitOptions || (StringSplitOptions = {}));
// ����
var NString = (function () {
    function NString() {
    }
    NString.IndexOf = function (str, chOrSub, startIndex) {
        var sub;
        if (chOrSub.constructor == Number) {
            sub = String.fromCharCode(chOrSub);
        }
        else {
            sub = chOrSub;
        }
        return str.indexOf(sub);
    };
    NString.IndexOfAny = function (str, subs) {
        for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            for (var j = 0; j < subs.length; ++j) {
                if (c == subs[j])
                    return i;
            }
        }
        return -1;
    };
    NString.GetHashCode = function (str) {
        var hash = 0, i, l, ch;
        if (str.length == 0)
            return hash;
        for (i = 0, l = str.length; i < l; i++) {
            ch = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    NString.Replace = function (str, pattern, replacement) {
        var ps = (pattern.constructor === Number) ? String.fromCharCode(pattern) : pattern;
        var rs = (replacement.constructor === Number) ? String.fromCharCode(replacement) : replacement;
        return str.replace(ps, rs);
    };
    NString.Substring = function (str, startIndex, length) {
        if (length === void 0) { length = -1; }
        return length < 0 ? str.substr(startIndex) : str.substr(startIndex, length);
    };
    NString.Remove = function (str, startIndex, length) {
        if (length === void 0) { length = 0; }
        if (typeof startIndex === undefined) {
            return str.substring(startIndex);
        }
        else {
            return str.substring(0, startIndex - 1) + str.substring(startIndex + length);
        }
    };
    NString.Trim = function (str) {
        return str.trim().replace('\u3000', '');
    };
    NString.TrimStart = function (str, trimChars) {
        var orgChara = "";
        var chara = "";
        for (var ii = 0; ii <= trimChars.length; ii++) {
            var target = str[ii];
            var target2 = trimChars[ii].toString();
            if (target2 == target) {
                chara += target;
            }
            orgChara += target;
        }
        if (orgChara == chara)
            str = str.substr(chara.length, str.length);
        return str;
    };
    NString.TrimEnd = function (str, trimChars) {
        var orgChara = "";
        var chara = "";
        for (var ii = str.length - trimChars.length; ii <= str.length; ii++) {
            var target = str[ii];
            var target2 = trimChars[ii].toString();
            if (target2 == target) {
                chara += target;
            }
            orgChara += target;
        }
        if (orgChara == chara)
            str = str.substr(0, str.length - chara.length);
        return str;
    };
    NString.ToUpperInvariant = function (str) {
        return str.toUpperCase();
    };
    NString.ToLowerInvariant = function (str) {
        return str.toLowerCase();
    };
    NString.Contains = function (str, sub) {
        return str.indexOf(sub) >= 0;
    };
    NString.StartsWith = function (str, sub, comp) {
        return str.indexOf(sub) === 0;
    };
    NString.EndsWith = function (str, sub, comp) {
        return str.indexOf(sub) === str.length - sub.length;
    };
    NString.Format = function (format, arg0, arg1, arg2, arg3, arg4, arg5) {
        if (arg0.constructor === Array) {
            var s = format, i = arg0.length;
            while (i--) {
                s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arg0[i]);
            }
            return s;
        }
        else {
            var args = [arg0, arg1, arg2, arg3, arg4, arg5];
            return NString.Format(format, args[0], args[1], args[2], args[3], args[4], args[5]);
        }
    };
    NString.IsNullOrEmpty = function (str) {
        return !str;
    };
    NString.Join = function (separator, parts) {
        var str = "";
        for (var i = 0; i <= parts.length; i++)
            str += parts[i] + separator;
        str = this.TrimEnd(str, separator);
        return str;
    };
    NString.ToCharArray = function (str) {
        return NString.ToArray(str);
    };
    NString.ToArray = function (str) {
        var target = stringToArray(str);
        return target;
        /*
        var strs = new List<number>();
        for (var i= 0; i < str.length;i++)
        {
            // �N�\�d�l https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
            var target = str.charCodeAt(i);
            // EcmaScript6
            //var target = str.codePointAt(i);

            strs.Add(target);
        }

        return strs.ToArray();
        */
    };
    NString.Concat = function (parts) {
        var str;
        for (var i = 0; i < parts.length; i++) {
            str += parts[i];
        }
        return str;
    };
    NString.FromChars = function (chOrChars, count) {
        /*
        if (chOrChars.constructor === Number) {
            var r = String.fromCharCode(chOrChars);
            for (var i = 2; i < count; i++) {
                r += String.fromCharCode(chOrChars);
            }
            return r;
        }
        */
        if (count === void 0) { count = 1; }
        //return null;
        return stringFromCodePoint(chOrChars);
    };
    NString.Split = function (strs, option) {
        if (option === void 0) { option = StringSplitOptions.None; }
        if (strs.constructor === Number) {
            var num = strs;
            var target;
            var kugiriCount = 0;
            for (var i = 0; i < num.length; i++) {
                var r = stringFromCodePoint(num[i]);
                if (r == ".." || r == ",") {
                    kugiriCount++;
                }
            }
            var sts;
            if (option == StringSplitOptions.None)
                sts = new Array[kugiriCount * 2 + 1];
            if (option == StringSplitOptions.RemoveEmptyEntries)
                sts = new Array[kugiriCount + 1];
            var kugiri = 0;
            for (var i = 0; i < num.length; i++) {
                var r = stringFromCodePoint(num[i]);
                if (r == ".." || r == "," || i == num.length - 1) {
                    sts[kugiri] = target;
                    if (i < num.length - 1)
                        sts[kugiri + 1] = "";
                    target = null;
                    kugiri++;
                    kugiri++;
                }
                else
                    target += r;
            }
            return sts;
        }
        else {
            var num2 = strs;
            var target;
            var kugiriCount = 0;
            for (var i = 0; i < num2.length; i++) {
                var r = stringFromCodePoint(num2[i]);
                if (r == ".." || r == ",") {
                    kugiriCount++;
                }
            }
            var sts;
            if (option == StringSplitOptions.None)
                sts = new Array[kugiriCount * 2 + 1];
            if (option == StringSplitOptions.RemoveEmptyEntries)
                sts = new Array[kugiriCount + 1];
            var kugiri = 0;
            for (var i = 0; i < num2.length; i++) {
                var r = stringFromCodePoint(num2[i]);
                if (r == ".." || r == "," || i == num2.length - 1) {
                    sts[kugiri] = target;
                    if (i < num2.length - 1)
                        sts[kugiri + 1] = "";
                    target = null;
                    kugiri++;
                    kugiri++;
                }
                else
                    target += r;
            }
            return sts;
        }
    };
    NString.Empty = "";
    return NString;
}());
var StringComparison;
(function (StringComparison) {
    StringComparison[StringComparison["InvariantCultureIgnoreCase"] = 0] = "InvariantCultureIgnoreCase";
    StringComparison[StringComparison["Ordinal"] = 1] = "Ordinal";
})(StringComparison || (StringComparison = {}));
var NObject = (function () {
    function NObject() {
    }
    NObject.prototype.Equals = function (other) {
        return this === other;
    };
    NObject.prototype.GetHashCode = function () {
        return NString.GetHashCode(this.toString());
    };
    NObject.prototype.ToString = function () {
        return this.GetType().Name;
    };
    NObject.prototype.toString = function () {
        return this.ToString();
    };
    NObject.prototype.GetType = function () {
        return new Type(this.constructor.toString().match(/function (\w*)/)[1]);
    };
    NObject.ReferenceEquals = function (x, y) {
        return x === y;
    };
    NObject.GenericEquals = function (x, y) {
        if (typeof x === "object")
            return x.Equals(y);
        return x === y;
    };
    NObject.GenericToString = function (x) {
        if (typeof x === "object")
            return x.ToString();
        return x.toString();
    };
    NObject.GenericGetHashCode = function (x) {
        if (typeof x === "object")
            return x.GetHashCode();
        return NString.GetHashCode(this.toString());
    };
    return NObject;
}());
var Exception = (function (_super) {
    __extends(Exception, _super);
    function Exception(message) {
        if (message === void 0) { message = ""; }
        var _this = _super.call(this) || this;
        _this.Message = message;
        return _this;
    }
    Exception.prototype.ToString = function () {
        return "Exception: " + this.Message;
    };
    return Exception;
}(NObject));
var NEvent = (function () {
    function NEvent() {
        this.listeners = new Array();
    }
    NEvent.prototype.Add = function (listener) {
        this.listeners.push(listener);
    };
    NEvent.prototype.Remove = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index < 0)
            return;
        this.listeners.splice(index, 1);
    };
    NEvent.prototype.ToMulticastFunction = function () {
        if (this.listeners.length === 0)
            return null;
        return function () {
            for (var i in this.listeners) {
                this.listeners[i].call(arguments);
            }
        };
    };
    return NEvent;
}());
var Array_Enumerator = (function (_super) {
    __extends(Array_Enumerator, _super);
    function Array_Enumerator(array) {
        var _this = _super.call(this) || this;
        _this.index = -1;
        _this.array = array;
        return _this;
    }
    Array_Enumerator.prototype.MoveNext = function () {
        this.index++;
        return this.index < this.array.length;
    };
    Object.defineProperty(Array_Enumerator.prototype, "Current", {
        get: function () {
            return this.array[this.index];
        },
        enumerable: true,
        configurable: true
    });
    Array_Enumerator.prototype.Dispose = function () {
    };
    return Array_Enumerator;
}(NObject));
var Array_Enumerable = (function (_super) {
    __extends(Array_Enumerable, _super);
    function Array_Enumerable(array) {
        var _this = _super.call(this) || this;
        _this.array = array;
        return _this;
    }
    Array_Enumerable.prototype.GetEnumerator = function () {
        return new Array_Enumerator(this.array);
    };
    return Array_Enumerable;
}(NObject));
// NotImplementedException
var NArray = (function () {
    function NArray() {
    }
    NArray.IndexOf = function (values, value) {
        var i, n = values.length;
        for (i = 0; i < n; i++) {
            if (values[i] === value)
                return i;
        }
        return -1;
    };
    NArray.ToEnumerable = function (array) {
        return new Array_Enumerable(array);
    };
    NArray.Resize = function (parray, newLength) {
        if (parray[0] === null) {
            parray[0] = new Array(newLength);
            return;
        }
        if (parray[0].length === newLength) {
            return;
        }
        throw new NotImplementedException();
    };
    return NArray;
}());
var NumberStyles;
(function (NumberStyles) {
    NumberStyles[NumberStyles["HexNumber"] = 0] = "HexNumber";
})(NumberStyles || (NumberStyles = {}));
var Type = (function (_super) {
    __extends(Type, _super);
    function Type(Name) {
        var _this = _super.call(this) || this;
        _this.Name = Name;
        _this.Assembly = "mscorlib";
        _this.FullName = Name;
        return _this;
    }
    Type.prototype.Equals = function (obj) {
        return (obj instanceof Type) && (obj.Name === this.Name);
    };
    return Type;
}(NObject));
// Kara
var ResourceManager = (function (_super) {
    __extends(ResourceManager, _super);
    function ResourceManager(className, asm) {
        var _this = _super.call(this) || this;
        _this.className = className;
        _this.Assembly = asm;
        return _this;
    }
    return ResourceManager;
}(NObject));
// Kara
var SettingsBase = (function (_super) {
    __extends(SettingsBase, _super);
    function SettingsBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SettingsBase.Synchronized = function (settings) {
        return settings;
    };
    return SettingsBase;
}(NObject));
// Kara
var ApplicationSettingsBase = (function (_super) {
    __extends(ApplicationSettingsBase, _super);
    function ApplicationSettingsBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ApplicationSettingsBase;
}(SettingsBase));
var NNumber = (function () {
    function NNumber() {
    }
    NNumber.Parse = function (text, styleOrProvider, provider) {
        return parseFloat(text);
    };
    NNumber.ToString = function (num, providerOrFormat, provider) {
        return num.toString();
    };
    NNumber.GetHashCode = function (num) {
        return num;
    };
    NNumber.IsInfinity = function (num) {
        return num === Infinity;
    };
    NNumber.TryParse = function (str, pvalue) {
        try {
            pvalue[0] = parseFloat(str);
            return true;
        }
        catch (ex) {
            pvalue[0] = 0;
            return false;
        }
    };
    NNumber.IsNaN = function (num) {
        return isNaN(num);
    };
    return NNumber;
}());
var NBoolean = (function () {
    function NBoolean() {
    }
    NBoolean.TryParse = function (str, pvalue) {
        try {
            var result = parseInt(str);
            pvalue[0] = Boolean(result);
            return true;
        }
        catch (ex) {
            pvalue[0] = false;
            return false;
        }
    };
    NBoolean.GetHashCode = function (bool) {
        return bool ? 1 : 0;
    };
    return NBoolean;
}());
var NChar = (function () {
    function NChar() {
    }
    NChar.IsWhiteSpace = function (ch) {
        return ch === 32 || (ch >= 9 && ch <= 13) || ch === 133 || ch === 160;
    };
    NChar.IsLetter = function (ch) {
        return (65 <= ch && ch <= 90) || (97 <= ch && ch <= 122) || (ch >= 128 && ch !== 133 && ch !== 160);
    };
    NChar.IsLetterOrDigit = function (ch) {
        return (48 <= ch && ch <= 57) || (65 <= ch && ch <= 90) || (97 <= ch && ch <= 122) || (ch >= 128 && ch !== 133 && ch !== 160);
    };
    NChar.IsDigit = function (chOrStr, index) {
        if (arguments.length == 1) {
            return 48 <= chOrStr && chOrStr <= 57;
        }
        else {
            var ch = chOrStr.charCodeAt(index);
            return 48 <= ch && ch <= 57;
        }
    };
    return NChar;
}());
// ����
var NMath = (function (_super) {
    __extends(NMath, _super);
    function NMath() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NMath.PI = function () { return Math.PI; };
    NMath.Truncate = function (value) {
        return value >= 0 ? Math.floor(value) : Math.ceil(value);
    };
    NMath.Log = function (a, newBase) {
        if (newBase === void 0) { newBase = Math.E; }
        if (newBase === Math.E)
            return Math.log(a);
        return Math.log(a) / Math.log(newBase);
    };
    NMath.Log10 = function (a) {
        return NMath.Log(a, 10);
    };
    NMath.Exp = function (a) {
        return Math.exp(a);
    };
    NMath.Floor = function (a) {
        return Math.floor(a);
    };
    NMath.Pow = function (x, y) {
        return Math.pow(x, y);
    };
    NMath.Round = function (a, decimals) {
        if (decimals === void 0) { decimals = 0; }
        if (decimals === 0)
            return Math.round(a);
        var s = Math.pow(10, decimals);
        return Math.round(a * s) / s;
    };
    NMath.Abs = function (x) {
        return Math.abs(x);
    };
    NMath.Acos = function (x) {
        return Math.acos(x);
    };
    NMath.Asin = function (x) {
        return Math.asin(x);
    };
    NMath.Atan = function (x) {
        return Math.atan(x);
    };
    NMath.Atan2 = function (y, x) {
        return Math.atan2(y, x);
    };
    NMath.Cos = function (x) {
        return Math.cos(x);
    };
    NMath.Sin = function (x) {
        return Math.sin(x);
    };
    NMath.Sqrt = function (x) {
        return Math.sqrt(x);
    };
    NMath.Tan = function (x) {
        return Math.tan(x);
    };
    NMath.Cosh = function (x) {
        var ex = Math.exp(x) + Math.log(x);
        return ex / 2;
    };
    NMath.Sinh = function (x) {
        var ex = Math.exp(x) - Math.log(x);
        return ex / 2;
    };
    NMath.Tanh = function (x) {
        return NMath.Sinh(x) / NMath.Cosh(x);
    };
    return NMath;
}(NObject));
//#endregion Base
// #region System
var Nullable = (function (_super) {
    __extends(Nullable, _super);
    function Nullable(value) {
        if (value === void 0) { value = null; }
        var _this = _super.call(this) || this;
        _this.Value = value;
        return _this;
    }
    Object.defineProperty(Nullable.prototype, "HasValue", {
        get: function () { return this.Value != null; },
        enumerable: true,
        configurable: true
    });
    return Nullable;
}(NObject));
var DateTimeKind;
(function (DateTimeKind) {
    DateTimeKind[DateTimeKind["Local"] = 0] = "Local";
    DateTimeKind[DateTimeKind["Unspecified"] = 1] = "Unspecified";
    DateTimeKind[DateTimeKind["Utc"] = 2] = "Utc";
})(DateTimeKind || (DateTimeKind = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek || (DayOfWeek = {}));
// ����
var TimeSpan = (function (_super) {
    __extends(TimeSpan, _super);
    function TimeSpan(days, hours, minutes, seconds, milliseconds) {
        if (days === void 0) { days = -1; }
        if (hours === void 0) { hours = -1; }
        if (minutes === void 0) { minutes = -1; }
        if (seconds === void 0) { seconds = -1; }
        if (milliseconds === void 0) { milliseconds = -1; }
        var _this = _super.call(this) || this;
        _this.baseJsTick = 10000;
        _this.baseTick = 621355968000000000;
        // Millisecond-constants
        _this.msecPerSecond = 1000;
        _this.msecPerMinute = 60000;
        _this.msecPerHour = 3600000;
        _this.msecPerDay = 86400000;
        if (days > -1 && hours == -1 && minutes == -1 && seconds == -1 && milliseconds == -1)
            _this.ticks = (days / _this.baseJsTick) - _this.baseTick;
        else {
            // Internally we store the TimeSpan as Milliseconds
            var msecs = 0, 
            // Helper functions
            isNumeric = function (input) {
                return !isNaN(parseFloat(input)) && isFinite(input);
            };
            // Constructor Logic
            if (days > -1 && isNumeric(days)) {
                msecs += (days * _this.msecPerDay);
            }
            if (hours > -1 && isNumeric(hours)) {
                msecs += (hours * _this.msecPerHour);
            }
            if (minutes > -1 && isNumeric(minutes)) {
                msecs += (minutes * _this.msecPerMinute);
            }
            if (seconds > -1 && isNumeric(seconds)) {
                msecs += (seconds * _this.msecPerSecond);
            }
            if (milliseconds > -1 && isNumeric(milliseconds)) {
                msecs += milliseconds;
            }
            _this.ticks = msecs;
        }
        return _this;
    }
    Object.defineProperty(TimeSpan, "Zero", {
        get: function () {
            return new TimeSpan(6213559680000000000000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMilliseconds", {
        get: function () {
            var result = this.ticks;
            result = Math.floor(result);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalSecond", {
        get: function () {
            var result = this.ticks / this.msecPerSecond;
            return Math.floor(result);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalMinutes", {
        get: function () {
            var result = this.ticks / this.msecPerMinute;
            result = Math.floor(result);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalHours", {
        get: function () {
            var result = this.ticks / this.msecPerHour;
            result = Math.floor(result);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "TotalDays", {
        get: function () {
            var result = this.ticks / this.msecPerDay;
            result = Math.floor(result);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Days", {
        get: function () {
            return Math.floor(this.ticks / this.msecPerDay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Hours", {
        get: function () {
            return Math.floor(this.ticks / this.msecPerHour) % 24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Minutes", {
        get: function () {
            return Math.floor(this.ticks / this.msecPerMinute) % 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Seconds", {
        get: function () {
            return Math.floor(this.ticks / this.msecPerSecond) % 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
        get: function () {
            return this.ticks % 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSpan.prototype, "Ticks", {
        get: function () {
            var result = (this.ticks * this.baseJsTick) + this.baseTick;
            return result;
        },
        enumerable: true,
        configurable: true
    });
    TimeSpan.prototype.Add = function (ts) {
        return new TimeSpan(this.ticks + ts.ticks);
    };
    TimeSpan.prototype.Subtract = function (ts) {
        return new TimeSpan(this.ticks - ts.ticks);
    };
    TimeSpan.Parse = function (s) {
        var num = Number(s);
        var time = new TimeSpan(num);
        return time;
    };
    TimeSpan.FromMilliseconds = function (milliseconds) {
        return new TimeSpan(-1, -1, -1, -1, milliseconds);
    };
    TimeSpan.FromSeconds = function (seconds) {
        return new TimeSpan(-1, -1, seconds);
    };
    TimeSpan.FromMinutes = function (minutes) {
        return new TimeSpan(-1, -1, minutes);
    };
    TimeSpan.FromHours = function (hours) {
        return new TimeSpan(hours, -1, -1);
    };
    TimeSpan.FromDays = function (days) {
        return new TimeSpan(days, 0, -1, -1);
    };
    TimeSpan.FromTicks = function (tick) {
        return new TimeSpan(tick, -1, -1, -1, -1);
    };
    // oparator
    TimeSpan.op_Addition = function (x, y) {
        return new TimeSpan(x.ticks + y.ticks);
    };
    TimeSpan.op_Subtraction = function (x, y) {
        return new TimeSpan(x.ticks - y.ticks);
    };
    TimeSpan.op_Equality = function (x, y) {
        return x.ticks == y.ticks;
    };
    TimeSpan.op_GreaterThanOrEqual = function (x, y) {
        return x.ticks >= y.ticks;
    };
    TimeSpan.op_LessThanOrEqual = function (x, y) {
        return x.ticks <= y.ticks;
    };
    return TimeSpan;
}(NObject));
// ����
var DateTime = (function (_super) {
    __extends(DateTime, _super);
    function DateTime(year, month, day) {
        if (year === void 0) { year = 1; }
        if (month === void 0) { month = 1; }
        if (day === void 0) { day = 1; }
        var _this = _super.call(this) || this;
        _this.dt = new Date(year, month - 1, day);
        _this.kind = DateTimeKind.Unspecified;
        return _this;
    }
    Object.defineProperty(DateTime.prototype, "Kind", {
        get: function () { return this.kind; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Millisecond", {
        get: function () { return this.kind === DateTimeKind.Utc ? this.dt.getUTCMilliseconds() : this.dt.getMilliseconds(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Second", {
        get: function () { return this.kind === DateTimeKind.Utc ? this.dt.getUTCSeconds() : this.dt.getSeconds(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Minute", {
        get: function () { return this.kind === DateTimeKind.Utc ? this.dt.getUTCMinutes() : this.dt.getMinutes(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Hour", {
        get: function () { return this.kind === DateTimeKind.Utc ? this.dt.getUTCHours() : this.dt.getHours(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Month", {
        get: function () { return this.kind === DateTimeKind.Utc ? this.dt.getUTCMonth() + 1 : this.dt.getMonth() + 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Year", {
        get: function () { return this.kind === DateTimeKind.Utc ? this.dt.getUTCFullYear() : this.dt.getFullYear(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Day", {
        get: function () { return this.kind === DateTimeKind.Utc ? this.dt.getUTCDate() : this.dt.getDate(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "DayOfWeek", {
        get: function () { return this.dt.getDay(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "DayOfYear", {
        // ���Ԃ񍇂��Ă�H
        get: function () { return this.dt.getFullYear(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime.prototype, "Ticks", {
        get: function () {
            var currentTime = new Date().getTime();
            // 10,000 ticks in 1 millisecond
            // jsTicks is number of ticks from midnight Jan 1, 1970
            var jsTicks = currentTime * 10000;
            // add 621355968000000000 to jsTicks
            // netTicks is number of ticks from midnight Jan 1, 01 CE
            var netTicks = jsTicks + 621355968000000000;
            return netTicks;
        },
        enumerable: true,
        configurable: true
    });
    DateTime.prototype.ToString = function () {
        return this.kind === DateTimeKind.Utc ? this.dt.toUTCString() : this.dt.toString();
    };
    Object.defineProperty(DateTime, "UtcNow", {
        get: function () {
            var d = new DateTime();
            d.dt = new Date();
            d.kind = DateTimeKind.Utc;
            return d;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTime, "Now", {
        get: function () {
            var d = new DateTime();
            d.dt = new Date();
            d.kind = DateTimeKind.Local;
            return d;
        },
        enumerable: true,
        configurable: true
    });
    DateTime.op_Subtraction = function (x, y) {
        return TimeSpan.FromSeconds((x.dt.getTime() - y.dt.getTime()) / 1000);
    };
    DateTime.op_GreaterThanOrEqual = function (x, y) {
        return x.dt >= y.dt;
    };
    return DateTime;
}(NObject));
var Encoding = (function (_super) {
    __extends(Encoding, _super);
    function Encoding() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Encoding.UTF8 = new Encoding();
    return Encoding;
}(NObject));
var Environment = (function () {
    function Environment() {
    }
    Environment.NewLine = "\n";
    return Environment;
}());
// NotImplementedException ���ˑ�
var Stream = (function (_super) {
    __extends(Stream, _super);
    function Stream() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buffer = [];
        return _this;
    }
    Object.defineProperty(Stream.prototype, "Null", {
        get: function () { return new Stream(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "CanRead", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "CanSeek", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "CanTimeout", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "CanWrite", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "ReadTimeout", {
        get: function () { return null; },
        set: function (time) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "WriteTimeout", {
        get: function () { return null; },
        set: function (time) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stream.prototype, "Position", {
        get: function () { return null; },
        set: function (pos) { },
        enumerable: true,
        configurable: true
    });
    Stream.prototype.Write = function (str) {
        if (typeof str === 'undefined') {
            throw new Error('wrote undefined');
        }
        this.buffer.push(str);
    };
    Object.defineProperty(Stream.prototype, "Length", {
        get: function () {
            var size = 0;
            for (var n in this.buffer) {
                size += this.buffer[n].length;
            }
            return size;
        },
        enumerable: true,
        configurable: true
    });
    Stream.prototype.ToString = function () {
        var str = "";
        for (var n in this.buffer) {
            str += this.buffer[n];
        }
        return str;
    };
    return Stream;
}(NObject));
// NotImplementedException
var MemoryStream = (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MemoryStream.prototype.ToArray = function () {
        //  return buffer;
        throw new NotImplementedException();
    };
    return MemoryStream;
}(Stream));
// NotSupportedException
var TextWriter = (function (_super) {
    __extends(TextWriter, _super);
    function TextWriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextWriter.prototype.Write = function (text) {
        throw new NotSupportedException();
    };
    TextWriter.prototype.WriteLine = function (text) {
        this.Write(text + Environment.NewLine);
    };
    TextWriter.prototype.Flush = function () {
        throw new NotSupportedException();
    };
    TextWriter.prototype.Dispose = function () {
    };
    return TextWriter;
}(NObject));
var StreamWriter = (function (_super) {
    __extends(StreamWriter, _super);
    function StreamWriter(streamOrPath, encoding) {
        return _super.call(this) || this;
    }
    return StreamWriter;
}(TextWriter));
// NotImplementedException
var BinaryWriter = (function (_super) {
    __extends(BinaryWriter, _super);
    function BinaryWriter(baseStream, encoding) {
        return _super.call(this) || this;
    }
    BinaryWriter.prototype.Write = function (n) {
        throw new NotImplementedException();
    };
    BinaryWriter.prototype.Flush = function () {
        throw new NotImplementedException();
    };
    return BinaryWriter;
}(NObject));
// ����
var StringBuilder = (function (_super) {
    __extends(StringBuilder, _super);
    function StringBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parts = new Array();
        return _this;
    }
    StringBuilder.prototype.get_Item = function (index) {
        var o = 0;
        for (var i = 0; i < this.parts.length; ++i) {
            var p = this.parts[i];
            if (index < o + p.length) {
                return p.charCodeAt(index - o);
            }
            o += p.length;
        }
        return 0;
    };
    Object.defineProperty(StringBuilder.prototype, "Length", {
        get: function () {
            var len = 0;
            for (var i = 0; i < this.parts.length; i++) {
                len += this.parts[i].length;
            }
            return len;
        },
        enumerable: true,
        configurable: true
    });
    StringBuilder.prototype.Append = function (textOrChar) {
        var text = (textOrChar.constructor == Number) ? String.fromCharCode(textOrChar) : textOrChar;
        this.parts.push(text);
    };
    StringBuilder.prototype.AppendLine = function (text) {
        if (text === void 0) { text = null; }
        if (text !== null) {
            this.parts.push(text);
        }
        this.parts.push(Environment.NewLine);
    };
    /*
    AppendFormat(text: string): void
    AppendFormat(format: string, arg0: any): void
    AppendFormat(format: string, arg0: any, arg1: any): void
    AppendFormat(format: string, arg0: any, arg1: any, arg2: any): void
    AppendFormat(textOrFormat: string, arg0?: any, arg1?: any, arg2?: any): void {
        throw new NotImplementedException();
    }
    */
    StringBuilder.prototype.Insert = function (index, value) {
        var o = 0;
        for (var i = 0; i < this.parts.length; ++i) {
            var p = this.parts[i];
            if (index - o < p.length) {
                var a = NString.Substring(p, o, (index - o));
                var b = NString.Substring(p, o, p.length - (index - o));
                return a + value + b;
            }
            o += p.length;
        }
    };
    StringBuilder.prototype.ToString = function () {
        return this.parts.join("");
    };
    return StringBuilder;
}(NObject));
// ���ۃN���X
var TextReader = (function (_super) {
    __extends(TextReader, _super);
    function TextReader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextReader.prototype.ReadLine = function () {
        throw new NotSupportedException();
    };
    TextReader.prototype.ReadToEnd = function () {
        throw new NotSupportedException();
    };
    TextReader.prototype.Dispose = function () {
    };
    return TextReader;
}(NObject));
// ����
var StringReader = (function (_super) {
    __extends(StringReader, _super);
    function StringReader(str) {
        var _this = _super.call(this) || this;
        _this.str = str;
        _this.pos = 0;
        return _this;
    }
    StringReader.prototype.Peek = function () {
        var p = this.pos;
        if (p >= this.str.length)
            return -1;
        var end = p;
        while (end < this.str.length && this.str.charCodeAt(end) !== 10) {
            end++;
        }
        return end + 1;
    };
    StringReader.prototype.ReadLine = function () {
        var p = this.pos;
        if (p >= this.str.length)
            return null;
        var end = p;
        while (end < this.str.length && this.str.charCodeAt(end) !== 10) {
            end++;
        }
        var tend = end;
        if (tend > p && this.str.charCodeAt(tend - 1) == 13) {
            tend--;
        }
        var r = this.str.substr(p, tend - p);
        this.pos = end + 1;
        return r;
    };
    StringReader.prototype.Read = function () {
        var p = this.pos;
        if (p >= this.str.length)
            return null;
        p++;
        var r = this.str.substr(p, 1);
        this.pos = p;
        return r;
    };
    StringReader.prototype.ReadToEnd = function () {
        var p = this.pos;
        var r = this.str.substr(p, this.str.length - p);
        this.pos = this.str.length;
        return r;
    };
    return StringReader;
}(TextReader));
// Kara
var StringWriter = (function (_super) {
    __extends(StringWriter, _super);
    function StringWriter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StringWriter;
}(TextWriter));
var NConsole = (function (_super) {
    __extends(NConsole, _super);
    function NConsole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
    static WriteLine (line: string)
    static WriteLine (format: string, arg0: any)
    static WriteLine (lineOrFormat: string, arg0?: any)
    {

        throw new NotImplementedException ();
    }
    */
    NConsole.WriteLine = function (line) {
        try {
            console.log(line);
        }
        finally { }
    };
    return NConsole;
}(NObject));
var ArgumentException = (function (_super) {
    __extends(ArgumentException, _super);
    function ArgumentException(nameOrMessage, name) {
        return _super.call(this) || this;
    }
    return ArgumentException;
}(Exception));
var ArgumentNullException = (function (_super) {
    __extends(ArgumentNullException, _super);
    function ArgumentNullException(name) {
        return _super.call(this, name) || this;
    }
    return ArgumentNullException;
}(ArgumentException));
var ArgumentOutOfRangeException = (function (_super) {
    __extends(ArgumentOutOfRangeException, _super);
    function ArgumentOutOfRangeException(name) {
        return _super.call(this, name) || this;
    }
    return ArgumentOutOfRangeException;
}(ArgumentException));
// Kara
var EventArgs = (function (_super) {
    __extends(EventArgs, _super);
    function EventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventArgs;
}(NObject));
// Kara
var EventHandler = (function (_super) {
    __extends(EventHandler, _super);
    function EventHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventHandler.prototype.Invoke = function (sender, e) {
    };
    return EventHandler;
}(NObject));
// Kara
var InvalidOperationException = (function (_super) {
    __extends(InvalidOperationException, _super);
    function InvalidOperationException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidOperationException;
}(Exception));
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}
//https://qiita.com/weal/items/1a2af81138cd8f49937d
var Base64a = {
    encode: (function (i, tbl) {
        for (i = 0, tbl = { 64: 61, 63: 47, 62: 43 }; i < 62; i++) {
            tbl[i] = i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4);
        } //A-Za-z0-9+/=
        return function (arr) {
            var len, str, buf;
            if (!arr || !arr.length) {
                return "";
            }
            for (i = 0, len = arr.length, buf = [], str = ""; i < len; i += 3) {
                str += String.fromCharCode(tbl[arr[i] >>> 2], tbl[(arr[i] & 3) << 4 | arr[i + 1] >>> 4], tbl[i + 1 < len ? (arr[i + 1] & 15) << 2 | arr[i + 2] >>> 6 : 64], tbl[i + 2 < len ? (arr[i + 2] & 63) : 64]);
            }
            return str;
        };
    }()),
    decode: (function (i, tbl) {
        for (i = 0, tbl = { 61: 64, 47: 63, 43: 62 }; i < 62; i++) {
            tbl[i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4)] = i;
        } //A-Za-z0-9+/=
        return function (str) {
            var j, len, arr, buf;
            if (!str || !str.length) {
                return [];
            }
            for (i = 0, len = str.length, arr = [], buf = []; i < len; i += 4) {
                for (j = 0; j < 4; j++) {
                    buf[j] = tbl[str.charCodeAt(i + j) || 0];
                }
                arr.push(buf[0] << 2 | (buf[1] & 63) >>> 4, (buf[1] & 15) << 4 | (buf[2] & 63) >>> 2, (buf[2] & 3) << 6 | buf[3] & 63);
            }
            if (buf[3] === 64) {
                arr.pop();
                if (buf[2] === 64) {
                    arr.pop();
                }
            }
            return arr;
        };
    }())
};
// ����
var Convert = (function (_super) {
    __extends(Convert, _super);
    function Convert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Convert.ToUInt16 = function (str) {
        var value = Number(str);
        if (value < 0)
            value = 0;
        if (value >= 0xFFFF)
            value = 0xFFFF;
        return value;
    };
    Convert.ToUInt32 = function (str) {
        var value = Number(str);
        if (value < 0)
            value = 0;
        if (value >= 0xFFFFFFFF)
            value = 0xFFFFFFFF;
        return value;
    };
    Convert.FromBase64String = function (str) {
        var bit8Array = Base64a.decode(str);
        var target;
        for (var i; i < bit8Array.length; i++) {
            // ES6 String.fromCodePoint()
            //target+=String.fromCharCode(bit8Array[i]);
            target += stringFromCodePoint(bit8Array[i]);
        }
        return target;
        // �ʏ�̕��͂̂�
        //return decodeURIComponent(this.escape(atob(str)));
    };
    Convert.ToBase64String = function (bytes) {
        return Base64a.encode(bytes);
    };
    Convert.ToString = function (num, radixOrProvider) {
        throw new NotImplementedException();
    };
    return Convert;
}(NObject));
var NumberFormatInfo = (function (_super) {
    __extends(NumberFormatInfo, _super);
    function NumberFormatInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NumberDecimalSeparator = ".";
        _this.NumberGroupSeparator = ",";
        return _this;
    }
    return NumberFormatInfo;
}(NObject));
var CultureInfo = (function (_super) {
    __extends(CultureInfo, _super);
    function CultureInfo(name) {
        var _this = _super.call(this) || this;
        _this.Name = "Invariant";
        _this.nfi = new NumberFormatInfo();
        return _this;
    }
    CultureInfo.prototype.GetFormat = function (type) {
        if (type.Name === "NumberFormatInfo") {
            return this.nfi;
        }
        return null;
    };
    CultureInfo.InvariantCulture = new CultureInfo("Invariant");
    CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
    return CultureInfo;
}(NObject));
var NotSupportedException = (function (_super) {
    __extends(NotSupportedException, _super);
    function NotSupportedException(message) {
        if (message === void 0) { message = "Not supported"; }
        return _super.call(this, message) || this;
    }
    return NotSupportedException;
}(Exception));
var OverflowException = (function (_super) {
    __extends(OverflowException, _super);
    function OverflowException() {
        return _super.call(this, "Overflow") || this;
    }
    return OverflowException;
}(Exception));
// ����
var List = (function (_super) {
    __extends(List, _super);
    function List(itemsOrCapacity) {
        var _this = _super.call(this) || this;
        _this.array = new Array(); // Public to help the enumerator
        if (arguments.length == 1 && itemsOrCapacity.constructor !== Number) {
            _this.AddRange(itemsOrCapacity);
        }
        return _this;
    }
    List.prototype.Add = function (item) {
        this.array.push(item);
    };
    List.prototype.AddRange = function (items) {
        var e = items.GetEnumerator();
        while (e.MoveNext()) {
            this.Add(e.Current);
        }
    };
    Object.defineProperty(List.prototype, "Count", {
        get: function () {
            return this.array.length;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.get_Item = function (index) {
        return this.array[index];
    };
    List.prototype.set_Item = function (index, value) {
        this.array[index] = value;
    };
    List.prototype.GetEnumerator = function () {
        return new List_Enumerator(this);
    };
    List.prototype.Remove = function (item) {
        var idx = this.IndexOf(item);
        this.array.splice(idx, 1);
    };
    List.prototype.RemoveAt = function (index) {
        this.array.splice(index, 1);
    };
    List.prototype.RemoveRange = function (index, count) {
        this.array.splice(index, count);
    };
    List.prototype.Insert = function (index, item) {
        this.array.splice(index, 0, item);
    };
    List.prototype.Clear = function () {
        this.array = new Array();
    };
    List.prototype.ToArray = function () {
        return this.array.slice(0);
    };
    List.prototype.RemoveAll = function (predicate) {
        var newArray = new Array();
        for (var i = 0; i < this.array.length; i++) {
            if (!predicate(this.array[i]))
                newArray.push(this.array[i]);
        }
        this.array = newArray;
    };
    List.prototype.Reverse = function () {
        this.array.reverse();
    };
    List.prototype.IndexOf = function (item) {
        var i, n = this.array.length;
        for (i = 0; i < n; i++) {
            if (this.array[i] === item)
                return i;
        }
        return -1;
    };
    return List;
}(NObject));
var List_Enumerator = (function (_super) {
    __extends(List_Enumerator, _super);
    function List_Enumerator(list) {
        return _super.call(this, list.array) || this;
    }
    return List_Enumerator;
}(Array_Enumerator));
var Stack = (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stack.prototype.Push = function (item) {
        this.Add(item);
    };
    Stack.prototype.Pop = function () {
        throw new NotImplementedException();
    };
    return Stack;
}(List));
var HashSet_Enumerator = (function (_super) {
    __extends(HashSet_Enumerator, _super);
    function HashSet_Enumerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HashSet_Enumerator.prototype.MoveNext = function () {
        throw new NotImplementedException();
    };
    Object.defineProperty(HashSet_Enumerator.prototype, "Current", {
        get: function () {
            throw new NotImplementedException();
        },
        enumerable: true,
        configurable: true
    });
    HashSet_Enumerator.prototype.Dispose = function () {
    };
    return HashSet_Enumerator;
}(NObject));
var HashSet = (function (_super) {
    __extends(HashSet, _super);
    function HashSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.store = {};
        return _this;
    }
    HashSet.prototype.Add = function (item) {
        throw new NotImplementedException();
    };
    HashSet.prototype.GetEnumerator = function () {
        throw new NotImplementedException();
    };
    HashSet.prototype.Contains = function (item) {
        throw new NotImplementedException();
    };
    Object.defineProperty(HashSet.prototype, "Count", {
        get: function () {
            throw new NotImplementedException();
        },
        enumerable: true,
        configurable: true
    });
    return HashSet;
}(NObject));
var KeyValuePair = (function (_super) {
    __extends(KeyValuePair, _super);
    function KeyValuePair(key, value) {
        var _this = _super.call(this) || this;
        _this.Key = key;
        _this.Value = value;
        return _this;
    }
    return KeyValuePair;
}(NObject));
var Dictionary_Enumerator = (function (_super) {
    __extends(Dictionary_Enumerator, _super);
    function Dictionary_Enumerator(list) {
        return _super.call(this, list) || this;
    }
    return Dictionary_Enumerator;
}(List_Enumerator));
var Dictionary_KeyCollection = (function (_super) {
    __extends(Dictionary_KeyCollection, _super);
    function Dictionary_KeyCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dictionary_KeyCollection;
}(List));
var Dictionary_KeyCollection_Enumerator = (function (_super) {
    __extends(Dictionary_KeyCollection_Enumerator, _super);
    function Dictionary_KeyCollection_Enumerator(list) {
        return _super.call(this, list) || this;
    }
    return Dictionary_KeyCollection_Enumerator;
}(List_Enumerator));
var Dictionary_ValueCollection = (function (_super) {
    __extends(Dictionary_ValueCollection, _super);
    function Dictionary_ValueCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dictionary_ValueCollection;
}(List));
var Dictionary_ValueCollection_Enumerator = (function (_super) {
    __extends(Dictionary_ValueCollection_Enumerator, _super);
    function Dictionary_ValueCollection_Enumerator(list) {
        return _super.call(this, list) || this;
    }
    return Dictionary_ValueCollection_Enumerator;
}(List_Enumerator));
var Dictionary = (function (_super) {
    __extends(Dictionary, _super);
    function Dictionary(other) {
        var _this = _super.call(this) || this;
        _this.keys = {};
        _this.values = {};
        return _this;
    }
    Dictionary.prototype.get_Item = function (key) {
        return this.values[this.GetKeyString(key)];
    };
    Dictionary.prototype.set_Item = function (key, value) {
        var ks = this.GetKeyString(key);
        if (!this.values.hasOwnProperty(ks)) {
            this.keys[ks] = key;
        }
        this.values[ks] = value;
    };
    Dictionary.prototype.Add = function (key, value) {
        var ks = this.GetKeyString(key);
        if (this.values.hasOwnProperty(ks)) {
            throw new InvalidOperationException();
        }
        else {
            this.keys[ks] = key;
            this.values[ks] = value;
        }
    };
    Dictionary.prototype.GetKeyString = function (key) {
        if (key === null)
            return "null";
        if (typeof key === "undefined")
            return "undefined";
        return key + "";
    };
    Dictionary.prototype.ContainsKey = function (key) {
        return this.values.hasOwnProperty(this.GetKeyString(key));
    };
    Dictionary.prototype.TryGetValue = function (key, pvalue) {
        var ks = this.GetKeyString(key);
        if (this.values.hasOwnProperty(ks)) {
            pvalue[0] = this.values[ks];
            return true;
        }
        else {
            pvalue[0] = null;
            return false;
        }
    };
    Dictionary.prototype.Remove = function (key) {
        var ks = this.GetKeyString(key);
        delete this.values[ks];
        delete this.keys[ks];
    };
    Dictionary.prototype.Clear = function () {
        this.values = {};
        this.keys = {};
    };
    Object.defineProperty(Dictionary.prototype, "Count", {
        get: function () {
            return Object.keys(this.values).length;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.GetEnumerator = function () {
        var kvs = new List();
        for (var ks in this.values) {
            kvs.Add(new KeyValuePair(this.keys[ks], this.values[ks]));
        }
        return new Dictionary_Enumerator(kvs);
    };
    Object.defineProperty(Dictionary.prototype, "Keys", {
        get: function () {
            var keys = new Dictionary_KeyCollection();
            for (var ks in this.keys) {
                keys.Add(this.keys[ks]);
            }
            return keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "Values", {
        get: function () {
            var vals = new Dictionary_ValueCollection();
            for (var ks in this.values) {
                vals.Add(this.values[ks]);
            }
            return vals;
        },
        enumerable: true,
        configurable: true
    });
    return Dictionary;
}(NObject));
var Group = (function (_super) {
    __extends(Group, _super);
    function Group(value, index) {
        var _this = _super.call(this) || this;
        _this.Length = 0;
        _this.Value = "";
        _this.Index = 0;
        _this.Value = value || "";
        _this.Length = _this.Value.length;
        _this.Index = index;
        return _this;
    }
    return Group;
}(NObject));
var Match = (function (_super) {
    __extends(Match, _super);
    function Match() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Groups = new List();
        _this.Success = false;
        return _this;
    }
    return Match;
}(NObject));
var Regex = (function (_super) {
    __extends(Regex, _super);
    function Regex(pattern) {
        var _this = _super.call(this) || this;
        _this.re = new RegExp(pattern, "g");
        return _this;
    }
    Regex.prototype.Match = function (input) {
        var m = new Match();
        var r = this.re.exec(input);
        if (r) {
            var loc = r.index;
            for (var i = 0; i < r.length; ++i) {
                var text = "";
                if (typeof r[i] === "undefined") { }
                else if (r[i].constructor === String)
                    text = r[i];
                m.Groups.Add(new Group(text, loc));
                if (i !== 0)
                    loc += text.length;
            }
            m.Success = true;
        }
        return m;
    };
    Regex.prototype.Replace = function (input, repl) {
        return input.replace(this.re, repl);
    };
    Regex.prototype.IsMatch = function (input) {
        return this.re.test(input);
    };
    return Regex;
}(NObject));
// #endregion System.Collections.Generic
// #region System.Linq
// ������
var Enumerable = (function (_super) {
    __extends(Enumerable, _super);
    function Enumerable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Enumerable.ToArray = function (e) {
        throw new NotImplementedException();
    };
    Enumerable.ToList = function (e) {
        return new List(e);
    };
    Enumerable.Empty = function () {
        return new List();
    };
    Enumerable.Range = function (start, count) {
        var end = start + count;
        var r = new List();
        for (var i = start; i < end; i++) {
            r.Add(i);
        }
        return r;
    };
    Enumerable.Select = function (e, selector) {
        var r = new List();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            r.Add(selector(i.Current));
        }
        return r;
    };
    Enumerable.SelectMany = function (e, selector, comb) {
        throw new NotImplementedException();
    };
    Enumerable.Where = function (e, p) {
        var r = new List();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p(i.Current))
                r.Add(i.Current);
        }
        return r;
    };
    Enumerable.OrderBy = function (e, s) {
        var r = new List();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            r.Add(i.Current);
        }
        r.array.sort(function (x, y) {
            var sx = s(x);
            var sy = s(y);
            if (sx === sy)
                return 0;
            if (sx < sy)
                return -1;
            return 1;
        });
        return r;
    };
    Enumerable.OrderByDescending = function (e, s) {
        var r = new List();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            r.Add(i.Current);
        }
        r.array.sort(function (x, y) {
            var sx = s(x);
            var sy = s(y);
            if (sx === sy)
                return 0;
            if (sx < sy)
                return 1;
            return -1;
        });
        return r;
    };
    Enumerable.ThenBy = function (e, s) {
        return Enumerable.OrderBy(e, s);
    };
    Enumerable.Concat = function (x, y) {
        var r = new List(x);
        r.AddRange(y);
        return r;
    };
    Enumerable.Take = function (e, count) {
        var r = new List();
        var i = e.GetEnumerator();
        while (r.Count < count && i.MoveNext()) {
            r.Add(i.Current);
        }
        return r;
    };
    Enumerable.Skip = function (e, count) {
        var r = new List();
        var i = e.GetEnumerator();
        var j = 0;
        while (i.MoveNext()) {
            if (j >= count)
                r.Add(i.Current);
            j++;
        }
        return r;
    };
    Enumerable.Distinct = function (e) {
        var d = new Dictionary();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            d.set_Item(i.Current, null);
        }
        return d.Keys;
    };
    Enumerable.Cast = function (e) {
        return e;
    };
    Enumerable.OfType = function (e) {
        // Doesn't work. Stupid type erasure.
        // var i = e.GetEnumerator();
        // var r = new List<U>();
        // while (i.MoveNext()) {
        // 	if (i.Current instanceof U) r.Add (i.Current);
        // }
        // return r;
        throw new NotImplementedException();
    };
    Enumerable.Contains = function (e, val) {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (i.Current === val)
                return true;
        }
        return false;
    };
    Enumerable.FirstOrDefault = function (e, p) {
        if (p === void 0) { p = null; }
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p === null || p(i.Current))
                return i.Current;
        }
        return null;
    };
    Enumerable.LastOrDefault = function (e, p) {
        if (p === void 0) { p = null; }
        var i = e.GetEnumerator();
        var last = null;
        while (i.MoveNext()) {
            if (p === null || p(i.Current))
                last = i.Current;
        }
        return last;
    };
    Enumerable.Last = function (e, p) {
        if (p === void 0) { p = null; }
        var i = e.GetEnumerator();
        var last = null;
        var gotLast = false;
        while (i.MoveNext()) {
            if (p === null || p(i.Current)) {
                last = i.Current;
                gotLast = true;
            }
        }
        if (gotLast)
            return last;
        throw new Exception("Not found");
    };
    Enumerable.First = function (e, p) {
        if (p === void 0) { p = null; }
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p === null || p(i.Current))
                return i.Current;
        }
        throw new Exception("Not found");
    };
    Enumerable.Any = function (e, p) {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p(i.Current))
                return true;
        }
        return false;
    };
    Enumerable.All = function (e, p) {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (!p(i.Current))
                return false;
        }
        return true;
    };
    Enumerable.Count = function (e) {
        throw new NotImplementedException();
    };
    Enumerable.Sum = function (e, s) {
        throw new NotImplementedException();
    };
    Enumerable.Max = function (e, s) {
        throw new NotImplementedException();
    };
    Enumerable.Min = function (e, s) {
        throw new NotImplementedException();
    };
    Enumerable.ToDictionary = function (e, k, v) {
        throw new NotImplementedException();
    };
    return Enumerable;
}(NObject));
var PropertyChangedEventArgs = (function (_super) {
    __extends(PropertyChangedEventArgs, _super);
    function PropertyChangedEventArgs(name) {
        return _super.call(this) || this;
    }
    return PropertyChangedEventArgs;
}(EventArgs));
var Debug = (function (_super) {
    __extends(Debug, _super);
    function Debug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Debug.WriteLine = function (text) {
        console.log(text);
    };
    return Debug;
}(NObject));
var Thread = (function (_super) {
    __extends(Thread, _super);
    function Thread() {
        var _this = _super.call(this) || this;
        _this.ManagedThreadId = Thread.nextId++;
        return _this;
    }
    Thread.nextId = 1;
    Thread.CurrentThread = new Thread();
    return Thread;
}(NObject));
// #endregion System.Linq
//#region System.Diagnostics
var Stopwatch = (function (_super) {
    __extends(Stopwatch, _super);
    function Stopwatch() {
        var _this = _super.call(this) || this;
        _this.Reset();
        return _this;
    }
    Object.defineProperty(Stopwatch.prototype, "IsRunning", {
        get: function () {
            return this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    Stopwatch.GetTimestamp = function () {
        var tim;
        var ticks = tim.Ticks;
        return ticks;
    };
    Stopwatch.getTimestampMilliseconds = function () {
        return (new Date()).getTime();
    };
    Object.defineProperty(Stopwatch.prototype, "currentLapMilliseconds", {
        get: function () {
            return this._isRunning
                ? (Stopwatch.getTimestampMilliseconds() - this._startTimeStamp)
                : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stopwatch.prototype, "currentLap", {
        get: function () {
            return this._isRunning
                ? new TimeSpan(this.currentLapMilliseconds)
                : TimeSpan.Zero;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stopwatch.prototype, "ElapsedMilliseconds", {
        get: function () {
            var _ = this;
            var timeElapsed = _._elapsed;
            if (_._isRunning)
                timeElapsed += _.currentLapMilliseconds;
            return timeElapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stopwatch.prototype, "Elapsed", {
        get: function () {
            return new TimeSpan(this.ElapsedMilliseconds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stopwatch.prototype, "ElapsedTicks", {
        get: function () {
            var span = this.Elapsed.Ticks;
            return span;
        },
        enumerable: true,
        configurable: true
    });
    Stopwatch.StartNew = function () {
        var s = new Stopwatch();
        s.Start();
        return s;
    };
    Stopwatch.prototype.Reset = function () {
        var _ = this;
        _._elapsed = 0;
        _._isRunning = false;
        _._startTimeStamp = NaN;
    };
    Stopwatch.prototype.Restart = function () {
        this.Reset();
        this.Start();
    };
    Stopwatch.prototype.Start = function () {
        var _ = this;
        if (!_._isRunning) {
            _._startTimeStamp = Stopwatch.getTimestampMilliseconds();
            _._isRunning = true;
        }
    };
    Stopwatch.prototype.Stop = function () {
        var _ = this;
        if (_._isRunning) {
            _._elapsed += _.currentLapMilliseconds;
            _._isRunning = false;
        }
    };
    return Stopwatch;
}(NObject));
//#endregion System.Diagnostics
// ������
// #region  System.Net.WebSockets
var Uri = (function (_super) {
    __extends(Uri, _super);
    function Uri(uri) {
        if (uri === void 0) { uri = ""; }
        var _this = _super.call(this) || this;
        _this._OriginalString = uri;
        return _this;
    }
    Object.defineProperty(Uri.prototype, "OriginalString", {
        get: function () { return this._OriginalString; },
        set: function (uri) { this._OriginalString = uri; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "UserEscaped", {
        get: function () {
            var str = this._OriginalString;
            var xnnn = "\ xnnn".replace(" ", "");
            return NString.IndexOf(str, "\'") > -1 || NString.IndexOf(str, "\"") > -1 || NString.IndexOf(str, "\?") > -1 || NString.IndexOf(str, "\\") > -1 || NString.IndexOf(str, "\0") > -1 || NString.IndexOf(str, "\nnn") > -1 || NString.IndexOf(str, "\a") > -1 || NString.IndexOf(str, "\b") > -1 || NString.IndexOf(str, "\f") > -1 || NString.IndexOf(str, "\n") > -1 || NString.IndexOf(str, "\r") > -1 || NString.IndexOf(str, "\t") > -1 || NString.IndexOf(str, "\v") > -1 || NString.IndexOf(str, xnnn) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "Scheme", {
        get: function () {
            if (NString.StartsWith(this._OriginalString, "file://"))
                return "file";
            if (NString.StartsWith(this._OriginalString, "ftp://"))
                return "ftp";
            if (NString.StartsWith(this._OriginalString, "gopher://"))
                return "gopher";
            if (NString.StartsWith(this._OriginalString, "http://"))
                return "http";
            if (NString.StartsWith(this._OriginalString, "https://"))
                return "https";
            if (NString.StartsWith(this._OriginalString, "ldap://"))
                return "ldap";
            if (NString.StartsWith(this._OriginalString, "mailto:"))
                return "mailto";
            if (NString.StartsWith(this._OriginalString, "net.pipe://"))
                return "net.pipe";
            if (NString.StartsWith(this._OriginalString, "net.tcp://"))
                return "net.tcp";
            if (NString.StartsWith(this._OriginalString, "news:"))
                return "news";
            if (NString.StartsWith(this._OriginalString, "nntp://"))
                return "nntp";
            if (NString.StartsWith(this._OriginalString, "telnet://"))
                return "telnet";
            if (NString.StartsWith(this._OriginalString, "uuid:"))
                return "uuid";
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "IsLoopback", {
        get: function () {
            var idx = NString.IndexOf(this._OriginalString, "localhost/");
            return idx > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "IsFile", {
        get: function () {
            return NString.StartsWith(this._OriginalString, "file://");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "Fragment", {
        get: function () {
            var idx = NString.IndexOf(this._OriginalString, "#");
            if (idx > -1) {
                return NString.Substring(this._OriginalString, idx, this._OriginalString.length - idx);
            }
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "Host", {
        get: function () {
            if (this.Scheme != null && this.Scheme.length > 0) {
                var header = this.Scheme + "://";
                var heaIdx = NString.IndexOf(this._OriginalString, header) + header.length;
                if (heaIdx > header.length - 1) {
                    var str = NString.Substring(this._OriginalString, heaIdx, (this._OriginalString.length - heaIdx));
                    var firstSlashIdx = NString.IndexOf(str, "/");
                    var httpIdx = NString.IndexOf(this._OriginalString, header);
                    if (firstSlashIdx > 0) {
                        var result = NString.Substring(this._OriginalString, httpIdx, (this._OriginalString.length - httpIdx - firstSlashIdx));
                        return result;
                    }
                    else {
                        var result = NString.Substring(this._OriginalString, httpIdx, (this._OriginalString.length - httpIdx));
                        return result;
                    }
                }
                else
                    return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "LocalPath", {
        get: function () {
            var idx = NString.IndexOf(this._OriginalString, "#");
            if (idx > 0 && this.Host.length > 0) {
                // �z�X�g��#top�Ȃǂ�܂�Uri
                var str = NString.Substring(this._OriginalString, this.Host.length, idx - 1);
                return Uri.UnescapeDataString(str);
            }
            else {
                if (this.IsFile) {
                    // �t�@�C���ilocalhost��܂�
                    var str2 = NString.Substring(this._OriginalString, "file://".length, this._OriginalString.length - "file://".length);
                    if (this.UserEscaped)
                        return Uri.UnescapeDataString(str2);
                    else
                        return str2;
                }
                else {
                    // �t�@�C���ł�z�X�g�ł�Ȃ�
                    if (this.Scheme == null) {
                        if (this.UserEscaped)
                            return Uri.UnescapeDataString(this._OriginalString);
                        else
                            return this._OriginalString;
                    }
                }
                // �d�l��g��Ȃ�
                /*
                if (this.IsLoopback) {
                    var idx = NString.IndexOf(this._OriginalString, "localhost/");
                }
                */
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Uri.UnescapeDataString = function (stringToUnescape) {
        return decodeURIComponent(stringToUnescape);
    };
    Object.defineProperty(Uri.prototype, "AbsoluteUri", {
        get: function () {
            if (this.Scheme == null) {
                var target = this._OriginalString.toLowerCase();
                if (NString.StartsWith(target, "c:/") || NString.StartsWith(target, "d:/") || NString.StartsWith(target, "e:/") || NString.StartsWith(target, "f:/") || NString.StartsWith(target, "g:/") || NString.StartsWith(target, "h:/") || NString.StartsWith(target, "i:/") || NString.StartsWith(target, "j:/") || NString.StartsWith(target, "k:/") || NString.StartsWith(target, "l:/") || NString.StartsWith(target, "m:/") || NString.StartsWith(target, "n:/") || NString.StartsWith(target, "0:/") || NString.StartsWith(target, "p:/") || NString.StartsWith(target, "q:/") || NString.StartsWith(target, "r:/"))
                    return " file:///" + this._OriginalString;
            }
            if (this.UserEscaped == false)
                return encodeURIComponent(this._OriginalString);
            else
                return this._OriginalString;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "AbsolutePath", {
        get: function () {
            var str = NString.Substring(this._OriginalString, this.Host.length, this._OriginalString.length - this.Host.length);
            if (this.UserEscaped == false)
                return encodeURIComponent(str);
            else
                return str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uri.prototype, "Query", {
        get: function () {
            var str = NString.Substring(this._OriginalString, this.Host.length, this._OriginalString.length - this.Host.length);
            var question = NString.IndexOf(str, "?");
            if (question > -1)
                return str;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    return Uri;
}(NObject));
// ������
// �f�[�^��擾����܂Ń��b�Z�[�W���[�v����K�v������
// #region ClientWebSocket
var CancellationToken = (function (_super) {
    __extends(CancellationToken, _super);
    function CancellationToken(isToken) {
        var _this = _super.call(this) || this;
        _this._CanBeCanceled = isToken;
        return _this;
    }
    Object.defineProperty(CancellationToken.prototype, "CanBeCanceled", {
        get: function () { return this._CanBeCanceled; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CancellationToken.prototype, "IsCancellationRequested", {
        get: function () { return false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CancellationToken, "None", {
        get: function () { return new CancellationToken(false); },
        enumerable: true,
        configurable: true
    });
    return CancellationToken;
}(NObject));
var ArraySegment = (function (_super) {
    __extends(ArraySegment, _super);
    function ArraySegment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArraySegment;
}(List));
var WebSocketMessageType;
(function (WebSocketMessageType) {
    WebSocketMessageType[WebSocketMessageType["Binary"] = 0] = "Binary";
    WebSocketMessageType[WebSocketMessageType["Close"] = 1] = "Close";
    WebSocketMessageType[WebSocketMessageType["Text"] = 2] = "Text";
})(WebSocketMessageType || (WebSocketMessageType = {}));
var Task = (function (_super) {
    __extends(Task, _super);
    function Task() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Task;
}(NObject));
var WebSocketReceiveResult = (function (_super) {
    __extends(WebSocketReceiveResult, _super);
    function WebSocketReceiveResult(result) {
        var _this = _super.call(this) || this;
        _this.Result = result;
        return _this;
    }
    return WebSocketReceiveResult;
}(NObject));
var ClientWebSocket = (function (_super) {
    __extends(ClientWebSocket, _super);
    function ClientWebSocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientWebSocket.prototype.ConnectAsync = function (uri, cancellationToken) {
        if (cancellationToken === void 0) { cancellationToken = CancellationToken.None; }
        var ws = null;
        // �X�L�[�}��ws��
        var header = uri.Scheme + "://";
        var heaIdx = NString.IndexOf(uri.OriginalString, header) + header.length;
        if (heaIdx > header.length - 1) {
            var str = NString.Substring(uri.OriginalString, heaIdx, uri.OriginalString.length - heaIdx);
            ws = "ws:" + str;
        }
        if (uri.Query.length > 0) {
            this.originUri = new Uri(NString.Replace(ws, uri.Query, ""));
            this.que = uri.Query;
        }
        else
            this.originUri = new Uri(ws);
        this.socket = new WebSocket(ws);
    };
    ClientWebSocket.prototype.SendAsync = function (buffer, messageType, endOfMessage, cancellationToken) {
        if (messageType === void 0) { messageType = WebSocketMessageType.Text; }
        var connection = this.socket;
        connection.onopen = function () {
            connection.send(buffer);
        };
    };
    ClientWebSocket.prototype.ReceiveAsync = function (buffer, messageType) {
        if (messageType === void 0) { messageType = WebSocketMessageType.Text; }
        var connection = this.socket;
        connection.onmessage = function (e) {
            console.log('Server: ' + e.data);
            var result;
            result.Result = e.data;
            return result;
        };
        return null;
    };
    return ClientWebSocket;
}(NObject));
// #endregion ClientWebSocket
// NotImplementedException
var WebClient = (function (_super) {
    __extends(WebClient, _super);
    function WebClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebClient.prototype.DownloadString = function (url) {
        var ws;
        throw new NotImplementedException();
    };
    return WebClient;
}(NObject));
// #endregion  System.Net.WebSockets
//# sourceMappingURL=mscorlib.js.map