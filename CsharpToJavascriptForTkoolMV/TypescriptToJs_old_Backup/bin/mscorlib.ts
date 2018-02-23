

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

/*!
 * @author electricessence / https://github.com/electricessence/
 * .NET Reference: http://referencesource.microsoft.com/#mscorlib/system/text/StringBuilder.cs
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */

// 末実装・・・
class NotImplementedException{
    Message: string;

    ToString(): string {
        return "Exception: " + this.Message;
    }

    constructor(message: string = "Not implemented") {
        this.Message = message;
    }
}

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
enum StringSplitOptions
{
    // 戻り値には、空の文字列を格納する配列要素が含まれています。
    None,
    // 戻り値は空の文字列を格納している配列要素を含まない
    RemoveEmptyEntries
}

// 完成
class NString {
    static Empty = "";
    static IndexOf(str: string, ch: number): number
    static IndexOf(str: string, ch: number, startIndex: number): number
    static IndexOf(str: string, sub: string): number
    static IndexOf(str: string, sub: string, startIndex: number): number
    static IndexOf(str: string, chOrSub: any, startIndex?: number): number {
        var sub: string;
        if (chOrSub.constructor == Number) {
            sub = String.fromCharCode(chOrSub);
        }
        else {
            sub = chOrSub;
        }
        return str.indexOf(sub);
    }
    static IndexOfAny(str: string, subs: number[]): number {
        for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            for (var j = 0; j < subs.length; ++j) {
                if (c == subs[j])
                    return i;
            }
        }
        return -1;
    }
    static GetHashCode(str: string): number {
        var hash = 0, i, l, ch;
        if (str.length == 0) return hash;
        for (i = 0, l = str.length; i < l; i++) {
            ch = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    static Replace(str: string, pattern: number, replacement: number): string
    static Replace(str: string, pattern: string, replacement: string): string
    static Replace(str: string, pattern: any, replacement: any): string {
        var ps = (pattern.constructor === Number) ? String.fromCharCode(pattern) : pattern;
        var rs = (replacement.constructor === Number) ? String.fromCharCode(replacement) : replacement;
        return str.replace(ps, rs);
    }
    static Substring(str: string, startIndex: number): string
    static Substring(str: string, startIndex: number, length: number): string
    static Substring(str: string, startIndex: number, length: number = -1): string {
        return length < 0 ? str.substr(startIndex) : str.substr(startIndex, length);
    }

    static Remove(str: string, startIndex: number): string;
    static Remove(str: string, startIndex: number, length: number): string;
    static Remove(str: any, startIndex: any, length: any = 0): any {

        if (typeof startIndex === undefined) {
            return str.substring(startIndex);
        }
        else {
            // TODO:return str.substring(0, startIndex) + str.substring(startIndex + length); 合ってるのか？
            return str.substring(0, startIndex - 1) + str.substring(startIndex + length);
        }
    }

    static Trim(str: string): string {
        return str.trim().replace('\u3000', '');
    }
    static TrimStart(str: string, trimChars: number[]): string {
        var orgChara = "";
        var chara = "";
        for (var ii = 0; ii <= trimChars.length;ii++)
        {
            var target = str[ii];

            var target2 = trimChars[ii].toString();

            if (target2 == target)
            {
                chara += target;
            }

            orgChara += target;
        }

        if (orgChara == chara)
            str = str.substr(chara.length, str.length);

        return str;
    }
    static TrimEnd(str: string, trimChars: number[]): string {
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
    }
    static ToUpperInvariant(str: string): string {
        return str.toUpperCase();
    }
    static ToLowerInvariant(str: string): string {
        return str.toLowerCase();
    }
    static Contains(str: string, sub: string): boolean {
        return str.indexOf(sub) >= 0;
    }
    static StartsWith(str: string, sub: string): boolean
    static StartsWith(str: string, sub: string, comp: StringComparison): boolean
    static StartsWith(str: string, sub: string, comp?: StringComparison): boolean {
        return str.indexOf(sub) === 0;
    }
    static EndsWith(str: string, sub: string): boolean
    static EndsWith(str: string, sub: string, comp: StringComparison): boolean
    static EndsWith(str: string, sub: string, comp?: StringComparison): boolean {
        return str.indexOf(sub) === str.length - sub.length;
    }

    static Format(format: string, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): string{
    //static Format(format: string, arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any): string {
        if (arg0.constructor === Array) {
            var s = format,
                i = arg0.length;
            while (i--) {
                s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arg0[i]);
            }
            return s;
        }
        else {
            var args = [arg0, arg1, arg2, arg3, arg4, arg5];

            return NString.Format(format, args);
            //return NString.Format(format, args[0], args[1], args[2], args[3], args[4], args[5]);
        }
    }
    static IsNullOrEmpty(str: string): boolean {
        return !str;
    }

    static Join(separator: string, parts: object[]);
    static Join(separator: string, parts: string[]);
    static Join(separator: any, parts: any[]): any {
        var str = "";
        for (var i = 0; i <= parts.length; i++)
            str += parts[i] + separator;

        str = this.TrimEnd(str, separator);

        return str;
    }

    static ToCharArray(str: string): number[]
    {
        return NString.ToArray(str);
    }

    static ToArray(str: string): number[]
    {
        var target = stringToArray(str);

        return target;

        /*
        var strs = new List<number>();
        for (var i= 0; i < str.length;i++)
        {
            // クソ仕様 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
            var target = str.charCodeAt(i);
            // EcmaScript6
            //var target = str.codePointAt(i);

            strs.Add(target);
        }

        return strs.ToArray();
        */
    }

    static Concat(parts: any[]): string {
        var str: string;
        for (var i = 0; i < parts.length; i++) {
            str += parts[i];
        }

        return str;
    }

    static FromChars(ch: number, count: number): string
    static FromChars(chars: number[]): string
    static FromChars(chOrChars: any, count: number = 1): string {
        /*
        if (chOrChars.constructor === Number) {
            var r = String.fromCharCode(chOrChars);
            for (var i = 2; i < count; i++) {
                r += String.fromCharCode(chOrChars);
            }
            return r;
        }
        */

        //return null;

        return stringFromCodePoint(chOrChars);
    }

    static Split(chars: number[]): string[];
    static Split(strs: string[], option: StringSplitOptions): string[];
    static Split(strs: any, option: StringSplitOptions = StringSplitOptions.None): string[] {
        if (strs.constructor === Number) {
            var num: number[] = strs;
            var target: string;

            var kugiriCount: number = 0;
            for (var i = 0; i < num.length; i++) {
                var r = stringFromCodePoint(num[i]);

                if (r == ".." || r == ",") {
                    kugiriCount++;
                }
            }
            var sts: string[];
            if (option == StringSplitOptions.None)
                sts = new Array[kugiriCount * 2 + 1];
            if (option == StringSplitOptions.RemoveEmptyEntries)
                sts = new Array[kugiriCount + 1];

            var kugiri: number = 0;
            for (var i = 0; i < num.length; i++) {
                var r = stringFromCodePoint(num[i]);

                if (r == ".." || r == "," || i == num.length - 1) {
                    sts[kugiri] = target;
                    if (i < num.length - 1)
                        sts[kugiri + 1] = "";

                    target = null;

                    kugiri++;
                    kugiri++;
                } else
                    target += r;
            }

            return sts;
        }
        else
        {
            var num2: string[] = strs;
            var target: string;

            var kugiriCount: number = 0;
            for (var i = 0; i < num2.length; i++) {
                var r = stringFromCodePoint(num2[i]);

                if (r == ".." || r == ",") {
                    kugiriCount++;
                }
            }
            var sts: string[];
            if (option == StringSplitOptions.None)
                sts = new Array[kugiriCount * 2 + 1];
            if (option == StringSplitOptions.RemoveEmptyEntries)
                sts = new Array[kugiriCount + 1];

            var kugiri: number = 0;
            for (var i = 0; i < num2.length; i++) {
                var r = stringFromCodePoint(num2[i]);

                if (r == ".." || r == "," || i == num2.length - 1) {
                    sts[kugiri] = target;
                    if (i < num2.length - 1)
                        sts[kugiri + 1] = "";

                    target = null;

                    kugiri++;
                    kugiri++;
                } else
                    target += r;
            }

            return sts;
        }
    }
}

enum StringComparison {
    InvariantCultureIgnoreCase,
    Ordinal,
}

class NObject {
    Equals(other: NObject): boolean {
        return this === other;
    }
    GetHashCode(): number {
        return NString.GetHashCode(this.toString());
    }
    ToString(): string {
        return this.GetType().Name;
    }
    toString(): string {
        return this.ToString();
    }
    GetType(): Type {
        return new Type(this.constructor.toString().match(/function (\w*)/)[1]);
    }
    static ReferenceEquals(x: NObject, y: NObject): boolean {
        return x === y;
    }
    static GenericEquals(x: any, y: any): boolean {
        if (typeof x === "object") return x.Equals(y);
        return x === y;
    }
    static GenericToString(x: any): string {
        if (typeof x === "object") return x.ToString();
        return x.toString();
    }
    static GenericGetHashCode(x: any): number {
        if (typeof x === "object") return x.GetHashCode();
        return NString.GetHashCode(this.toString());
    }
}

class Exception extends NObject {
    Message: string;
    constructor(message: string = "") {
        super();
        this.Message = message;
    }
    ToString(): string {
        return "Exception: " + this.Message;
    }
}

class NEvent<T>
{
	private listeners: T[] = new Array<T> ();

	Add(listener: T): void
	{
		this.listeners.push(listener);
	}

	Remove(listener: T): void
	{
		var index = this.listeners.indexOf(listener);
		if (index < 0) return;
		this.listeners.splice(index, 1);
	}

	ToMulticastFunction(): any
	{
		if (this.listeners.length === 0)
			return null;
		return function() {
			for (var i in this.listeners) {
				this.listeners[i].call (arguments);
			}
		};
	}
}

interface IDisposable {
    Dispose(): void;
}

interface IEnumerable<T> {
    GetEnumerator(): IEnumerator<T>;
}

interface IEnumerator<T> extends IDisposable {
    MoveNext(): boolean;
    Current: T;
}

class Array_Enumerator<T> extends NObject implements IEnumerator<T>, IDisposable {
    private array: T[];
    private index: number = -1;
    constructor(array: T[]) {
        super();
        this.array = array;
    }
    MoveNext(): boolean {
        this.index++;
        return this.index < this.array.length;
    }
    get Current(): T {
        return this.array[this.index];
    }
    Dispose(): void {
    }
}

class Array_Enumerable<T> extends NObject implements IEnumerable<T>
{
    private array: T[];
    constructor(array: T[]) {
        super();
        this.array = array;
    }
    GetEnumerator(): Array_Enumerator<T> {
        return new Array_Enumerator<T>(this.array);
    }
}

// NotImplementedException
class NArray
{
	static IndexOf<T> (values: T[], value: T): number
	{
		var i,
		    n = values.length;
		for (i = 0; i < n; i++) {
			if (values[i] === value)
				return i;
		}
		return -1;
	}
	static ToEnumerable<T> (array: T[]): IEnumerable<T>
	{
		return new Array_Enumerable<T> (array);
	}
	static Resize<T> (parray: T[][], newLength: number): void
	{
		if (parray[0] === null) {
			parray[0] = new Array<T> (newLength);
			return;
		}
		if (parray[0].length === newLength) {
			return;
		}
		throw new NotImplementedException ();
    }

    static ConvertAll<T, V>(array: T[], convertFunc: (T) => V): V[] {
        if (array == null) {
            return null;
        }
        return array.map(convertFunc);
    }
    static Reverse<T>(array: T[]): void {
        array.reverse();
    }
    static FindAll<T>(array: T[], predicate: (T) => boolean): T[] {
        return array.filter(predicate);
    }
}

enum NumberStyles {
    HexNumber
}

class Type extends NObject {
    // AssemblyないとAssemblyInfoで変換できないクソ仕様
    Assembly: string = "mscorlib";
    FullName: string;

    constructor(public Name: string) {
        super();

        this.FullName = Name;
    }
    Equals(obj: any): boolean {
        return (obj instanceof Type) && ((<Type>obj).Name === this.Name);
    }
}

// Kara
class ResourceManager extends NObject {
    Assembly: string;

    constructor(public className: string, asm: string) {
        super();

        this.Assembly = asm;
    }
}

// Kara
class SettingsBase extends NObject
{
    static Synchronized(settings: SettingsBase): SettingsBase
    {
        return settings;
    }
}

// Kara
class ApplicationSettingsBase extends SettingsBase
{
  
}

interface IFormatProvider {
    GetFormat(type: Type): any;
}

class NNumber
{
	static Parse(text: string): number
	static Parse(text: string, style: NumberStyles, provider: IFormatProvider): number
	static Parse(text: string, provider: IFormatProvider): number
	static Parse(text: string, styleOrProvider?: any, provider?: IFormatProvider): number
	{
		return parseFloat(text);
	}

	static ToString(num: number): string
	static ToString(num: number, provider: IFormatProvider): string
	static ToString(num: number, format: string, provider: IFormatProvider): string
	static ToString(num: number, providerOrFormat?: any, provider?: IFormatProvider): string
	{
		return num.toString();
	}
	static GetHashCode(num: number): number
	{
		return num;
	}
	static IsInfinity(num: number): boolean
	{
		return num === Infinity;
	}
	static TryParse(str: string, pvalue: number[]): boolean
	{
		try {
			pvalue[0] = parseFloat (str);
			return true;
		}
		catch (ex) {
			pvalue[0] = 0;
			return false;
		}
	}
	static IsNaN(num: number): boolean
	{
		return isNaN (num);
	}
}

class NBoolean
{
    static TryParse(str: string, pvalue: boolean[]): boolean {
        try {
            var result = parseInt(str);

            pvalue[0] = Boolean(result);

            return true;
        }
        catch (ex) {
            pvalue[0] = false;

            return false;
        }
    }

	static GetHashCode(bool: boolean): number
	{
		return bool ? 1 : 0;
	}
}

class NChar
{
	static IsWhiteSpace(ch: number): boolean
	{
		return ch === 32 || (ch >= 9 && ch <= 13) || ch === 133 || ch === 160;
	}
	static IsLetter(ch: number): boolean
	{
		return (65 <= ch && ch <=  90) || (97 <= ch && ch <= 122) || (ch >= 128 && ch !== 133 && ch !== 160);
	}
	static IsLetterOrDigit(ch: number): boolean
	{
		return (48 <= ch && ch <= 57) || (65 <= ch && ch <=  90) || (97 <= ch && ch <= 122) || (ch >= 128 && ch !== 133 && ch !== 160);
	}
	static IsDigit(ch: number): boolean
	static IsDigit(str: string, index: number): boolean
	static IsDigit(chOrStr: any, index?: number): boolean
	{
		if (arguments.length == 1) {
			return 48 <= chOrStr && chOrStr <= 57;
		}
		else {
			var ch = chOrStr.charCodeAt(index);
			return 48 <= ch && ch <= 57;
		}
	}
}

// 完成
class NMath extends NObject
{
    static PI(): number { return Math.PI; }

	static Truncate (value: number): number
	{
		return value >= 0 ? Math.floor(value) : Math.ceil(value);
	}
	static Log (a: number): number
	static Log (a: number, newBase: number): number
	static Log (a: number, newBase: number = Math.E): number
	{
		if (newBase === Math.E)
			return Math.log (a);
		return Math.log(a) / Math.log(newBase);
    }

    static Log10(a: number): number {
        return NMath.Log(a, 10);
    }

    static Exp(a: number): number
    {
        return Math.exp(a);
    }

    static Floor(a: number): number {
        return Math.floor(a);
    }

    static Pow(x: number, y: number): number {
        return Math.pow(x, y);
    }

	static Round (a: number): number
	static Round (a: number, decimals: number): number
	static Round (a: number, decimals: number = 0): number
	{
		if (decimals === 0)
			return Math.round(a);
		var s = Math.pow(10, decimals);
		return Math.round(a * s) / s;
    }

    static Abs(x: number): number {
        return Math.abs(x);
    }

    static Acos(x: number): number {
        return Math.acos(x);
    }

    static Asin(x: number): number {
        return Math.asin(x);
    }

    static Atan(x: number): number {
        return Math.atan(x);
    }

    static Atan2(y: number,x: number): number {
        return Math.atan2(y, x);
    }

    static Cos(x: number): number {
        return Math.cos(x);
    }

    static Sin(x: number): number {
        return Math.sin(x);
    }

    static Sqrt(x: number): number {
        return Math.sqrt(x);
    }

    static Tan(x: number): number {
        return Math.tan(x);
    }

	static Cosh (x: number): number
    {
        var ex = Math.exp(x) + Math.log(x);

        return ex / 2;
	}
	static Sinh (x: number): number
	{
        var ex = Math.exp(x) - Math.log(x);

        return ex / 2;
	}
	static Tanh (x: number): number
    {
        return NMath.Sinh(x) / NMath.Cosh(x);
	}
}
//#endregion Base

// #region System
class Nullable<T> extends NObject
{
	Value: T;
	get HasValue(): boolean { return this.Value != null; }
	constructor(value: T = null)
	{
		super();
		this.Value = value;
	}
}

enum DateTimeKind
{
	Local,
	Unspecified,
	Utc
}

enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

// 完成
class TimeSpan extends NObject {
    private baseJsTick: number = 10000;
    private baseTick: number = 621355968000000000;
    private ticks: number;

    // Millisecond-constants
    private msecPerSecond: number = 1000;
    private msecPerMinute: number = 60000;
    private msecPerHour: number = 3600000;
    private msecPerDay: number = 86400000;

    constructor(ticks: number);
    constructor(hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    constructor(days: any = -1, hours: any = -1, minutes: any = -1, seconds: any = -1, milliseconds: any = -1) {
        super();
        if (days > -1 && hours == -1 && minutes == -1 && seconds == -1 && milliseconds == -1)
            this.ticks = (days / this.baseJsTick) - this.baseTick;
        else {
            // Internally we store the TimeSpan as Milliseconds
            var msecs = 0,
                // Helper functions
                isNumeric = function (input) {
                    return !isNaN(parseFloat(input)) && isFinite(input);
                };

            // Constructor Logic
            if (days>-1 && isNumeric(days)) {
                msecs += (days * this.msecPerDay);
            }
            if (hours > -1 && isNumeric(hours)) {
                msecs += (hours * this.msecPerHour);
            }
            if (minutes > -1 && isNumeric(minutes)) {
                msecs += (minutes * this.msecPerMinute);
            }
            if (seconds > -1 && isNumeric(seconds)) {
                msecs += (seconds * this.msecPerSecond);
            }
            if (milliseconds > -1 && isNumeric(milliseconds)) {
                msecs += milliseconds;
            }

            this.ticks = msecs;
        }
    }

    static get Zero(): TimeSpan {
        return new TimeSpan(6213559680000000000000);
    }

    get TotalMilliseconds(): number {
        var result = this.ticks;
        result = Math.floor(result);

        return result;
    }

    get TotalSecond(): number {
        var result = this.ticks / this.msecPerSecond;

        return Math.floor(result);
    }

    get TotalMinutes(): number {
        var result = this.ticks / this.msecPerMinute;
        result = Math.floor(result);
        return result;
    }

    get TotalHours(): number {
        var result = this.ticks / this.msecPerHour;
        result = Math.floor(result);
        return result;
    }

    get TotalDays(): number {
        var result = this.ticks / this.msecPerDay;
        result = Math.floor(result);
        return result;
    }

    get Days(): number {
        return Math.floor(this.ticks / this.msecPerDay);
    }
    get Hours(): number {
        return Math.floor(this.ticks / this.msecPerHour) % 24;
    }
    get Minutes(): number {
        return Math.floor(this.ticks / this.msecPerMinute) % 60;
    }
    get Seconds(): number {
        return Math.floor(this.ticks / this.msecPerSecond) % 60;
    }

    get Milliseconds(): number
    {
        return this.ticks % 1000;
    }

    get Ticks(): number
    {
        var result = (this.ticks * this.baseJsTick) + this.baseTick;

        return result;
    }

    Add(ts: TimeSpan): TimeSpan
    {
        return new TimeSpan(this.ticks + ts.ticks);
    }

    Subtract(ts: TimeSpan): TimeSpan {
        return new TimeSpan(this.ticks - ts.ticks);
    }

    static Parse(s: string): TimeSpan
    {
        var num = Number(s);
        var time = new TimeSpan(num);

        return time;
    }

    static FromMilliseconds(milliseconds: number): TimeSpan {
        return new TimeSpan(-1, -1, -1, -1, milliseconds);
    }

    static FromSeconds(seconds: number): TimeSpan {
        return new TimeSpan(-1, -1, seconds);
    }

    static FromMinutes(minutes: number): TimeSpan {
        return new TimeSpan(-1, -1, minutes);
    }

    static FromHours(hours: number): TimeSpan
    {
        return new TimeSpan(hours, -1, -1);
    }

    static FromDays(days: number): TimeSpan {
        return new TimeSpan(days, 0, -1, -1);
    }

    static FromTicks(tick: number): TimeSpan
    {
        return new TimeSpan(tick, -1, -1, -1, -1);
    }

    // oparator
    static op_Addition(x: TimeSpan, y: TimeSpan): TimeSpan
    {
        return new TimeSpan(x.ticks + y.ticks);
    }

    static op_Subtraction(x: TimeSpan, y: TimeSpan): TimeSpan {
        return new TimeSpan(x.ticks - y.ticks);
    }

    static op_Equality(x: TimeSpan, y: TimeSpan): boolean {
        return x.ticks == y.ticks;
    }

    static op_GreaterThanOrEqual(x: TimeSpan, y: TimeSpan): boolean {
        return x.ticks >= y.ticks;
    }

    static op_LessThanOrEqual(x: TimeSpan, y: TimeSpan): boolean {
        return x.ticks <= y.ticks;
    }
}

// 完成
class DateTime extends NObject
{
	private dt: Date;
	private kind: DateTimeKind;
    get Kind(): DateTimeKind { return this.kind; }	

    get Millisecond(): number { return this.kind === DateTimeKind.Utc ? this.dt.getUTCMilliseconds() : this.dt.getMilliseconds(); }
    get Second(): number { return this.kind === DateTimeKind.Utc ? this.dt.getUTCSeconds() : this.dt.getSeconds(); }
    get Minute(): number { return this.kind === DateTimeKind.Utc ? this.dt.getUTCMinutes() : this.dt.getMinutes(); }
    get Hour(): number { return this.kind === DateTimeKind.Utc ? this.dt.getUTCHours() : this.dt.getHours(); }
    get Month(): number { return this.kind === DateTimeKind.Utc ? this.dt.getUTCMonth() + 1 : this.dt.getMonth() + 1; }
    get Year(): number { return this.kind === DateTimeKind.Utc ? this.dt.getUTCFullYear() : this.dt.getFullYear(); }
	get Day(): number { return this.kind === DateTimeKind.Utc ? this.dt.getUTCDate() : this.dt.getDate(); }
    get DayOfWeek(): DayOfWeek { return this.dt.getDay(); }
    // たぶん合ってる？
    get DayOfYear(): number { return this.dt.getFullYear(); }

    get Ticks(): number
    {
        var currentTime = new Date().getTime();

        // 10,000 ticks in 1 millisecond
        // jsTicks is number of ticks from midnight Jan 1, 1970
        var jsTicks = currentTime * 10000;

        // add 621355968000000000 to jsTicks
        // netTicks is number of ticks from midnight Jan 1, 01 CE
        var netTicks = jsTicks + 621355968000000000;

        return netTicks;
    }

	constructor()
	constructor(year: number, month: number, day: number)
	constructor(year: number = 1, month: number = 1, day: number = 1)
	{
		super();
		this.dt = new Date(year, month-1, day);
		this.kind = DateTimeKind.Unspecified;
	}	
	ToString(): string
	{
		return this.kind === DateTimeKind.Utc ? this.dt.toUTCString() : this.dt.toString();
	}
	static get UtcNow(): DateTime
	{
		var d = new DateTime();
		d.dt = new Date();
		d.kind = DateTimeKind.Utc;
		return d;
	}
	static get Now(): DateTime
	{
		var d = new DateTime();
		d.dt = new Date();
		d.kind = DateTimeKind.Local;
		return d;
	}
	static op_Subtraction(x: DateTime, y: DateTime): TimeSpan
	{
		return TimeSpan.FromSeconds ((x.dt.getTime() - y.dt.getTime()) / 1000);
	}
	static op_GreaterThanOrEqual(x: DateTime, y: DateTime): boolean
	{
		return x.dt >= y.dt;
	}
}

class Encoding extends NObject {
    static UTF8: Encoding = new Encoding();
}

class Environment {
    static NewLine: string = "\n";
}

// NotImplementedException 環境依存
class Stream extends NObject {
    private buffer: string[] = [];

    get Null(): Stream { return new Stream(); }

    get CanRead(): boolean { return null; }
    get CanSeek(): boolean { return null; }
    get CanTimeout(): boolean { return null; }
    get CanWrite(): boolean { return null; }

    get ReadTimeout(): number { return null; }
    set ReadTimeout(time: number) { }

    get WriteTimeout(): number { return null; }
    set WriteTimeout(time: number) { }

    get Position(): number { return null; }
    set Position(pos: number) {  }

    Write(str: string) {
        if (typeof str === 'undefined') {
            throw new Error('wrote undefined');
        }
        this.buffer.push(str);
    }

    get Length(): number {
        var size = 0;

        for (var n in this.buffer) {
            size += this.buffer[n].length;
        }

        return size;
    }

    ToString() {
        var str = "";

        for (var n in this.buffer) {
            str += this.buffer[n];
        }

        return str;
    }
}

// NotImplementedException
class MemoryStream extends Stream {
    ToArray(): number[] {
        //  return buffer;
        throw new NotImplementedException();
    }
}

// NotSupportedException
class TextWriter extends NObject implements IDisposable {
    Write(text: string): void {
        throw new NotSupportedException();
    }
    WriteLine(): void
    WriteLine(text: string): void
    WriteLine(text?: string): void {
        this.Write(text + Environment.NewLine);
    }
    Flush(): void {
        throw new NotSupportedException();
    }
    Dispose(): void {
    }
}

class StreamWriter extends TextWriter {
    constructor(path: string);
    constructor(stream: Stream, encoding: Encoding);
    constructor(streamOrPath: any, encoding?: Encoding) {
        super();
    }
}

// NotImplementedException
class BinaryWriter extends NObject {
    BaseStream: Stream;

    constructor(baseStream: Stream)
    constructor(baseStream: Stream, encoding: Encoding)
    constructor(baseStream: Stream, encoding?: Encoding) {
        super();
    }

    Write(n: number): void
    Write(n: number[]): void
    Write(n: any): void {
        throw new NotImplementedException();
    }

    Flush(): void {
        throw new NotImplementedException();
    }
}

// 完成
class StringBuilder extends NObject {
    private parts: string[] = new Array<string>();

    private get_Item(index: number): number {
        var o = 0;
        for (var i = 0; i < this.parts.length; ++i) {
            var p = this.parts[i];
            if (index < o + p.length) {
                return p.charCodeAt(index - o);
            }
            o += p.length;
        }
        return 0;
    }

    get Length(): number {
        var len = 0;
        for (var i = 0; i < this.parts.length; i++) {
            len += this.parts[i].length;
        }
        return len;
    }

    Append(text: string): void
    Append(char: number): void
    Append(textOrChar: any): void {
        var text: string = (textOrChar.constructor == Number) ? String.fromCharCode(textOrChar) : textOrChar;
        this.parts.push(text);
    }

    AppendLine(): void
    AppendLine(text: string): void
    AppendLine(text: string = null): void {
        if (text !== null) {
            this.parts.push(text);
        }
        this.parts.push(Environment.NewLine);
    }

    /*
    AppendFormat(text: string): void
    AppendFormat(format: string, arg0: any): void
    AppendFormat(format: string, arg0: any, arg1: any): void
    AppendFormat(format: string, arg0: any, arg1: any, arg2: any): void
    AppendFormat(textOrFormat: string, arg0?: any, arg1?: any, arg2?: any): void {
        throw new NotImplementedException();
    }
    */

    Insert(index: number, value: string): string
    {
        var o = 0;
        for (var i = 0; i < this.parts.length; ++i) {
            var p = this.parts[i];
            if (index - o < p.length) {
                var a = NString.Substring(p, o,(index - o));
                var b = NString.Substring(p, o, p.length - (index - o));

                return a + value + b;
            }
            o += p.length;
        }
    }

    ToString(): string {
        return this.parts.join("");
    }
}

// 抽象クラス
class TextReader extends NObject implements IDisposable {
    ReadLine(): string {
        throw new NotSupportedException();
    }
    ReadToEnd(): string {
        throw new NotSupportedException();
    }
    Dispose(): void {
    }
}

// 完成
class StringReader extends TextReader {
    private str: string;
    private pos: number;
    constructor(str: string) {
        super();
        this.str = str;
        this.pos = 0;
    }

    Peek(): number
    {
        var p = this.pos;
        if (p >= this.str.length)
            return -1;
        var end = p;
        while (end < this.str.length && this.str.charCodeAt(end) !== 10) {
            end++;
        }

        return end + 1;
    }

    ReadLine(): string {
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
    }

    Read(): string {
        var p = this.pos;
        if (p >= this.str.length)
            return null;

        p++;

        var r = this.str.substr(p, 1);
        this.pos = p;

        return r;
    }

    ReadToEnd(): string
    {
        var p = this.pos;
        var r = this.str.substr(p, this.str.length - p);
        this.pos = this.str.length;

        return r;
    }
}

// Kara
class StringWriter extends TextWriter {

}

class NConsole extends NObject
{
    static WriteLine(line: string)
    static WriteLine(format: string, arg0: any)
    static WriteLine(lineOrFormat: string, arg0?: any) {
        try {
            console.log(lineOrFormat);
        } finally { }
    }
    static Out: TextWriter;
}

class ArgumentException extends Exception
{
	constructor(name: string)
	constructor(message: string, name: string)
	constructor(nameOrMessage: string, name?: string)
	{
		super();
	}
}

class ArgumentNullException extends ArgumentException
{
	constructor(name: string)
	{
		super(name);
	}
}

class ArgumentOutOfRangeException extends ArgumentException
{
	constructor(name: string)
	{
		super(name);
	}
}

// Kara
class EventArgs extends NObject
{
	
}

// Kara
class EventHandler extends NObject
{
	Invoke (sender: any, e: EventArgs): void
	{		
	}
}

// Kara
class InvalidOperationException extends Exception
{

}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

//https://qiita.com/weal/items/1a2af81138cd8f49937d
var Base64a = {
    encode: (function (i, tbl) {
        for (i = 0, tbl = { 64: 61, 63: 47, 62: 43 }; i < 62; i++) { tbl[i] = i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4); } //A-Za-z0-9+/=
        return function (arr) {
            var len, str, buf;
            if (!arr || !arr.length) { return ""; }
            for (i = 0, len = arr.length, buf = [], str = ""; i < len; i += 3) { //6+2,4+4,2+6
                str += String.fromCharCode(
                    tbl[arr[i] >>> 2],
                    tbl[(arr[i] & 3) << 4 | arr[i + 1] >>> 4],
                    tbl[i + 1 < len ? (arr[i + 1] & 15) << 2 | arr[i + 2] >>> 6 : 64],
                    tbl[i + 2 < len ? (arr[i + 2] & 63) : 64]
                );
            }
            return str;
        };
    }()),
    decode: (function (i, tbl) {
        for (i = 0, tbl = { 61: 64, 47: 63, 43: 62 }; i < 62; i++) { tbl[i < 26 ? i + 65 : (i < 52 ? i + 71 : i - 4)] = i; } //A-Za-z0-9+/=
        return function (str) {
            var j, len, arr, buf;
            if (!str || !str.length) { return []; }
            for (i = 0, len = str.length, arr = [], buf = []; i < len; i += 4) { //6,2+4,4+2,6
                for (j = 0; j < 4; j++) { buf[j] = tbl[str.charCodeAt(i + j) || 0]; }
                arr.push(
                    buf[0] << 2 | (buf[1] & 63) >>> 4,
                    (buf[1] & 15) << 4 | (buf[2] & 63) >>> 2,
                    (buf[2] & 3) << 6 | buf[3] & 63
                );
            }
            if (buf[3] === 64) { arr.pop(); if (buf[2] === 64) { arr.pop(); } }
            return arr;
        };
    }())
};

// 完成
class Convert extends NObject
{
    static ToUInt16 (str: string) : number
    {
        var value = Number(str);
        if (value < 0) value = 0;
        if (value >= 0xFFFF) value = 0xFFFF;
        return value;
    }
    
    static ToUInt32 (str: string) : number
    {
        var value = Number(str);
        if (value < 0) value = 0;
        if (value >= 0xFFFFFFFF) value = 0xFFFFFFFF;
        return value;
    }

    static FromBase64String(str: string): string
    {
        var bit8Array: number[] = Base64a.decode(str);

        var target: string;
        for (var i: number; i < bit8Array.length; i++)
        {
            // ES6 String.fromCodePoint()
            //target+=String.fromCharCode(bit8Array[i]);
            target += stringFromCodePoint(bit8Array[i]);
        }

        return target;

        // 通常の文章のみ
        //return decodeURIComponent(this.escape(atob(str)));
    }

    static ToBase64String(bytes: number[])
    {
        return Base64a.encode(bytes);
    }

    /*
    private static escape(str: string): string
    {
        // エスケープ文字を変換
        // http://www.tamasoft.co.jp/lc/hlp/F017.html

        var xnnn = "\ xnnn".replace(" ","");

        var str2 = str.replace("\'", "27h").replace("\"", "22h").replace("\?", "3Fh").replace("\\", "5Ch").replace("\0", "00h").replace("\nnn", "").replace("\a", "07h").replace("\b", "08h").replace("\f", "0Ch").replace("\n", "0Ah").replace("\r", "0Dh").replace("\t", "09h").replace("\v", "0Bh").replace(xnnn, "");

        return str2;
    }
    */

	static ToString (num: number, radix: number): string
	static ToString (num: number, provider: IFormatProvider): string
	static ToString (num: number, radixOrProvider: any): string
	{
		throw new NotImplementedException ();
	}
}

class NumberFormatInfo extends NObject
{
	NumberDecimalSeparator: string = ".";
	NumberGroupSeparator: string = ",";
}

class CultureInfo extends NObject implements IFormatProvider
{
	static InvariantCulture: CultureInfo = new CultureInfo("Invariant");
	static CurrentCulture: CultureInfo = CultureInfo.InvariantCulture;

	Name: string = "Invariant";

	private nfi: NumberFormatInfo = new NumberFormatInfo ();

	GetFormat(type: Type): any
	{
		if (type.Name === "NumberFormatInfo") {
			return this.nfi;
		}
		return null;
	}

	constructor(name: string)
	{
		super();
	}
}

class NotSupportedException extends Exception
{
	constructor(message: string = "Not supported")
	{
		super(message);
	}
}

class OverflowException extends Exception
{
	constructor()
	{
		super("Overflow");
	}
}
// #endregion System

// 完成
// #region System.Collections.Generic
interface IList<T>
{
	Count: number;
	get_Item(index: number): T;
	set_Item(index: number, value: T): void;
}

// 完成
class List<T> extends NObject implements IList<T>, IEnumerable<T>
{
	array: T[] = new Array<T> (); // Public to help the enumerator

	constructor();
	constructor(capactiy: number);
	constructor(items: IEnumerable<T>);
	constructor(itemsOrCapacity?: any)
	{
		super();
		if (arguments.length == 1 && itemsOrCapacity.constructor !== Number) {
			this.AddRange (itemsOrCapacity);
		}
	}

	Add (item: T)
	{
		this.array.push(item);
	}

	AddRange (items: IEnumerable<T>)
	{
		var e = items.GetEnumerator ();
		while (e.MoveNext ()) {
			this.Add (e.Current);
		}
	}

	get Count(): number
	{
		return this.array.length;
	}

	get_Item(index: number): T
	{
		return this.array[index];
	}

	set_Item(index: number, value: T): void
	{
		this.array[index] = value;
	}

	GetEnumerator(): List_Enumerator<T>
	{
		return new List_Enumerator<T> (this);
	}

    /*
    Remove(item: T): void {
        var idx = this.IndexOf(item);
        this.RemoveAt(idx);
    }
    */
    Remove(item: T): boolean {
        var index = this.IndexOf(item);
        if (index >= 0) {
            this.RemoveAt(index);
            return true;
        }
        return false;
    }

	RemoveAt(index: number): void
	{
		this.array.splice(index, 1);
	}

	RemoveRange(index: number, count: number): void
	{
        this.array.splice(index, count);
	}

	Insert(index: number, item: T): void
	{
		this.array.splice(index, 0, item);
	}

	Clear(): void
	{
		this.array = new Array<T> ();
	}

    Sort(compare: (a: T, b: T) => number = null): void {
        // TODO:動作未確認
        this.array.sort(compare);
    }

	ToArray(): T[]
	{
		return this.array.slice(0);
	}

	RemoveAll(predicate: (item: T)=>boolean): void
	{
		var newArray: T[] = new Array<T> ();

		for (var i = 0; i < this.array.length; i++) {
			if (!predicate(this.array[i]))
				newArray.push(this.array[i]);
		}

		this.array = newArray;
	}

    FindAll(predicate: (item: T) => boolean): IEnumerable<T> {
        // TODO:動作未確認
        return new Array_Enumerable(this.array.filter(predicate));
    }

	Reverse(): void
    {
        this.array.reverse();
	}

    IndexOf(item: T): number {
        // TODO:動くのか？
        // return this.array.indexOf(item);

        var i,
            n = this.array.length;
        for (i = 0; i < n; i++) {
            if (this.array[i] === item)
                return i;
        }
        return -1;
    }

    ForEach(action: (T) => void): void {
        // TODO:動作未確認
        this.array.forEach(action);
    }
}

class List_Enumerator<T> extends Array_Enumerator<T>
{
	constructor (list: List<T>)
	{
		super(list.array);
	}
}

class Stack<T> extends List<T>
{
	Push(item: T): void
	{
		this.Add(item);
	}
	Pop(): T
	{
		throw new NotImplementedException ();	
	}
}

class HashSet_Enumerator<T> extends NObject implements IEnumerator<T>, IDisposable {
    MoveNext(): boolean {
        throw new NotImplementedException();
    }
    get Current(): T {
        throw new NotImplementedException();
    }
    Dispose(): void {
    }
}

class HashSet<T> extends NObject implements IEnumerable<T>
{
	private store = {};

	Add(item: T): void
	{
		throw new NotImplementedException ();	
	}

	GetEnumerator(): HashSet_Enumerator<T>
	{
		throw new NotImplementedException ();
	}

	Contains(item: T): boolean
	{
		throw new NotImplementedException ();
	}

	get Count(): number
	{
		throw new NotImplementedException ();
	}
}

class KeyValuePair<K, V> extends NObject
{
	Key: K;
	Value: V;

	constructor(key: K, value: V)
	{
		super();
		this.Key = key;
		this.Value = value;
	}
}

interface IDictionary<K, V>
{

}

class Dictionary_Enumerator<K, V> extends List_Enumerator<KeyValuePair<K,V>>
{
	constructor (list: List<KeyValuePair<K,V>>)
	{
		super(list);
	}
}

class Dictionary_KeyCollection<K, V> extends List<K>
{
}

class Dictionary_KeyCollection_Enumerator<K, V> extends List_Enumerator<K>
{
	constructor (list: List<K>)
	{
		super(list);
	}
}

class Dictionary_ValueCollection<K, V> extends List<V>
{
}

class Dictionary_ValueCollection_Enumerator<K, V> extends List_Enumerator<V>
{
	constructor (list: List<V>)
	{
		super(list);
	}
}

class Dictionary<K, V> extends NObject implements IDictionary<K, V>, IEnumerable<KeyValuePair<K, V>>
{
    private keys = {};
    private values = {};

    constructor();
    constructor(other: IDictionary<K, V>);
    constructor(other?: IDictionary<K, V>) {
        super();
    }

    get_Item(key: K): V {
        return <V>this.values[this.GetKeyString(key)];
    }

    set_Item(key: K, value: V) {
        var ks = this.GetKeyString(key);
        if (!this.values.hasOwnProperty(ks)) {
            this.keys[ks] = key;
        }
        this.values[ks] = value;
    }

    Add(key: K, value: V) {
        var ks = this.GetKeyString(key);
        if (this.values.hasOwnProperty(ks)) {
            throw new InvalidOperationException();
        }
        else {
            this.keys[ks] = key;
            this.values[ks] = value;
        }
    }

    private GetKeyString(key: K): string {
        if (key === null)
            return "null";
        if (typeof key === "undefined")
            return "undefined";
        return key + "";
    }

    ContainsKey(key: K): boolean {
        return this.values.hasOwnProperty(this.GetKeyString(key));
    }

    TryGetValue(key: K, pvalue: V[]): boolean {
        var ks = this.GetKeyString(key);
        if (this.values.hasOwnProperty(ks)) {
            pvalue[0] = this.values[ks];
            return true;
        }
        else {
            pvalue[0] = null;
            return false;
        }
    }

    Remove(key: K): void {
        var ks = this.GetKeyString(key);
        delete this.values[ks];
        delete this.keys[ks];
    }

    Clear(): void {
        this.values = {};
        this.keys = {};
    }

    get Count(): number {
        return Object.keys(this.values).length;
    }
    GetEnumerator(): Dictionary_Enumerator<K, V> {
        var kvs = new List<KeyValuePair<K, V>>();
        for (var ks in this.values) {
            kvs.Add(new KeyValuePair<K, V>(this.keys[ks], this.values[ks]));
        }
        return new Dictionary_Enumerator<K, V>(kvs);
    }
    get Keys(): Dictionary_KeyCollection<K, V> {
        var keys = new Dictionary_KeyCollection<K, V>();
        for (var ks in this.keys) {
            keys.Add(this.keys[ks]);
        }
        return keys;
    }
    get Values(): Dictionary_ValueCollection<K, V> {
        var vals = new Dictionary_ValueCollection<K, V>();
        for (var ks in this.values) {
            vals.Add(this.values[ks]);
        }
        return vals;
    }
}

class Group extends NObject
{
	Length: number = 0;
	Value: string = "";
	Index: number = 0;
	constructor(value: string, index: number)
	{
		super();
		this.Value = value||"";
		this.Length = this.Value.length;
		this.Index = index;
	}
}

class Match extends NObject {
    Groups: List<Group> = new List<Group>();
    Success: boolean = false;
}

class Regex extends NObject {
    private re: RegExp;
    constructor(pattern: string) {
        super();
        this.re = new RegExp(pattern, "g");
    }

    Match(input: string): Match {
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
    }

    Replace(input: string, repl: string): string {
        return input.replace(this.re, repl);
    }

    IsMatch(input: string): boolean {
        return this.re.test(input);
    }
}
// #endregion System.Collections.Generic

// #region System.Linq
// 未完成
class Enumerable extends NObject {
    static ToArray<T>(e: IEnumerable<T>): T[] {
        // TODO:動作未確認

        const result: T[] = [];
        const enumerator = e.GetEnumerator();
        while (enumerator.MoveNext()) {
            result.push(enumerator.Current);
        }
        return result;
    }

    static ToList<T>(e: IEnumerable<T>): List<T> {
        return new List<T>(e);
    }

    static Empty<T>(): IEnumerable<T> {
        return new List<T>();
    }

    static Range(start: number, count: number): IEnumerable<number> {
        var end = start + count;
        var r = new List<number>();
        for (var i = start; i < end; i++) {
            r.Add(i);
        }
        return r;
    }

    static Select<T, U>(e: IEnumerable<T>, selector: (T) => U): IEnumerable<U> {
        var r = new List<U>();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            r.Add(selector(i.Current));
        }
        return r;
    }

    static SelectMany<TSource, TResult>(e: IEnumerable<TSource>, selector: (TSource) => IEnumerable<TResult>): IEnumerable<TResult>
    static SelectMany<TSource, TResult>(e: IEnumerable<TSource>, selector: (TSource, number) => IEnumerable<TResult>): IEnumerable<TResult>
    static SelectMany<TSource, TCollection, TResult>(e: IEnumerable<TSource>, selector: (TSource) => IEnumerable<TCollection>, comb: (TSource, TCollection) => TResult): IEnumerable<TResult>
    static SelectMany<T, U>(e: any, selector: any, comb?: any): IEnumerable<U> {
        throw new NotImplementedException();
    }

    static Where<T>(e: IEnumerable<T>, p: (a: T) => boolean): IEnumerable<T> {
        var r = new List<T>();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p(i.Current))
                r.Add(i.Current);
        }
        return r;
    }

    static OrderBy<T, U>(e: IEnumerable<T>, s: (a: T) => U): IEnumerable<T> {
        var r = new List<T>();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            r.Add(i.Current);
        }
        r.array.sort(function (x, y) {
            var sx = s(x);
            var sy = s(y);
            if (sx === sy) return 0;
            if (sx < sy) return -1;
            return 1;
        });
        return r;
    }
    static OrderByDescending<T, U>(e: IEnumerable<T>, s: (a: T) => U): IEnumerable<T> {
        var r = new List<T>();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            r.Add(i.Current);
        }
        r.array.sort(function (x, y) {
            var sx = s(x);
            var sy = s(y);
            if (sx === sy) return 0;
            if (sx < sy) return 1;
            return -1;
        });
        return r;
    }
    static ThenBy<T, U>(e: IEnumerable<T>, s: (a: T) => U): IEnumerable<T> {
        return Enumerable.OrderBy<T, U>(e, s);
    }

    static Concat<T>(x: IEnumerable<T>, y: IEnumerable<T>): IEnumerable<T> {
        var r = new List<T>(x);
        r.AddRange(y);
        return r;
    }

    static Take<T>(e: IEnumerable<T>, count: number): IEnumerable<T> {
        var r = new List<T>();
        var i = e.GetEnumerator();
        while (r.Count < count && i.MoveNext()) {
            r.Add(i.Current);
        }
        return r;
    }

    static Skip<T>(e: IEnumerable<T>, count: number): IEnumerable<T> {
        var r = new List<T>();
        var i = e.GetEnumerator();
        var j = 0;
        while (i.MoveNext()) {
            if (j >= count)
                r.Add(i.Current);
            j++;
        }
        return r;
    }

    static Distinct<T>(e: IEnumerable<T>): IEnumerable<T> {
        var d = new Dictionary<T, T>();
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            d.set_Item(i.Current, null);
        }
        return d.Keys;
    }

    static Cast<T>(e: IEnumerable<T>): IEnumerable<T> {
        return e;
    }

    static OfType<U>(e: any): IEnumerable<U> {
        // Doesn't work. Stupid type erasure.
        // var i = e.GetEnumerator();
        // var r = new List<U>();
        // while (i.MoveNext()) {
        // 	if (i.Current instanceof U) r.Add (i.Current);
        // }
        // return r;
        throw new NotImplementedException();
    }

    static Contains<T>(e: IEnumerable<T>, val: T): boolean {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (i.Current === val)
                return true;
        }
        return false;
    }

    static FirstOrDefault<T>(e: IEnumerable<T>): T
    static FirstOrDefault<T>(e: IEnumerable<T>, p: (a: T) => boolean): T
    static FirstOrDefault<T>(e: any, p: (a: T) => boolean = null): T {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p === null || p(i.Current))
                return i.Current;
        }
        return null;
    }

    static LastOrDefault<T>(e: IEnumerable<T>): T
    static LastOrDefault<T>(e: IEnumerable<T>, p: (a: T) => boolean): T
    static LastOrDefault<T>(e: any, p: (a: T) => boolean = null): T {
        var i = e.GetEnumerator();
        var last: T = null;
        while (i.MoveNext()) {
            if (p === null || p(i.Current))
                last = i.Current;
        }
        return last;
    }

    static Last<T>(e: IEnumerable<T>): T
    static Last<T>(e: IEnumerable<T>, p: (a: T) => boolean): T
    static Last<T>(e: any, p: (a: T) => boolean = null): T {
        var i = e.GetEnumerator();
        var last: T = null;
        var gotLast = false;
        while (i.MoveNext()) {
            if (p === null || p(i.Current)) {
                last = i.Current;
                gotLast = true;
            }
        }
        if (gotLast) return last;
        throw new Exception("Not found");
    }

    static First<T>(e: IEnumerable<T>): T
    static First<T>(e: IEnumerable<T>, p: (a: T) => boolean): T
    static First<T>(e: any, p: (a: T) => boolean = null): T {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p === null || p(i.Current))
                return i.Current;
        }
        throw new Exception("Not found");
    }

    static Any<T>(e: IEnumerable<T>, p: (a: T) => boolean): boolean {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p(i.Current))
                return true;
        }
        return false;
    }

    static All<T>(e: IEnumerable<T>, p: (a: T) => boolean): boolean {
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (!p(i.Current))
                return false;
        }
        return true;
    }

    //static Count<T>(e: IEnumerable<T>): number {
    static Count<T>(e: IEnumerable<T>, p: (a: T) => boolean = null): number{
        // TODO:動作未確認
        var count = 0;
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            if (p == null || p(i.Current))
                ++count;
        }
        return count;
    }

    static Sum<T>(e: IEnumerable<T>, s: (a: T) => number): number {
        // TODO:動作未確認
        var sum = 0;
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            sum += s != null ? s(i.Current) : <number><any>i.Current;
        }
        return sum;
    }

    static Max<T>(e: IEnumerable<T>): number
    static Max<T>(e: IEnumerable<T>, s: (a: T) => number): number
    static Max<T>(e: IEnumerable<T>, s?: (a: T) => number): number {
        // TODO:動作未確認
        var result = Number.MIN_VALUE;
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            var value = s != null ? s(i.Current) : <number><any>i.Current;
            if (value > result)
                result = value;
        }
        return result;
    }

    static Min<T>(e: IEnumerable<T>): number
    static Min<T>(e: IEnumerable<T>, s: (a: T) => number): number
    static Min<T>(e: IEnumerable<T>, s?: (a: T) => number): number {
        //TODO:動作未確認

        var result = Number.MAX_VALUE;
        var i = e.GetEnumerator();
        while (i.MoveNext()) {
            var value = s != null ? s(i.Current) : <number><any>i.Current;
            if (value < result)
                result = value;
        }
        return result;
    }

    static ToDictionary<T, K, V>(e: IEnumerable<T>, keySelector: (T) => K, elementSelector: (T) => V): Dictionary<K, V>
	{
		//TODO:動作未確認
        var result = new Dictionary<K, V>();
        var enumerator = e.GetEnumerator();
        while (enumerator.MoveNext()) {
            var current = enumerator.Current;
            var key = keySelector(current);
            var value = elementSelector(current);
            result.Add(key, value);
        }
        return result;
	}
}

class PropertyChangedEventArgs extends EventArgs {
    constructor(name: string) {
        super();
    }
}

interface INotifyPropertyChanged
{
	PropertyChanged: NEvent<(sender: any, e: PropertyChangedEventArgs) => void>;
}

class Debug extends NObject
{
	static WriteLine (text: string): void
	{
		console.log(text);
	}
}

class Thread extends NObject
{
	private static nextId: number = 1;
	static CurrentThread: Thread = new Thread();	
	ManagedThreadId: number;
	constructor()
	{
		super();
		this.ManagedThreadId = Thread.nextId++;
	}
}
// #endregion System.Linq

//#region System.Diagnostics
class Stopwatch extends NObject {
    private _elapsed: number;
    private _startTimeStamp: number;
    private _isRunning: boolean;

    constructor() {
        super();

        this.Reset();
    }

    get IsRunning(): boolean {
        return this._isRunning;
    }

    static GetTimestamp(): number {
        var tim: DateTime;
        var ticks = tim.Ticks;

        return ticks;
    }

    private static getTimestampMilliseconds(): number {
        return (new Date()).getTime();
    }

    private get currentLapMilliseconds(): number {
        return this._isRunning
            ? (Stopwatch.getTimestampMilliseconds() - this._startTimeStamp)
            : 0;
    }

    private get currentLap(): TimeSpan {
        return this._isRunning
            ? new TimeSpan(this.currentLapMilliseconds)
            : TimeSpan.Zero;
    }

    get ElapsedMilliseconds(): number
    {
        const _ = this;
        let timeElapsed = _._elapsed;

        if (_._isRunning)
            timeElapsed += _.currentLapMilliseconds;

        return timeElapsed;
    }

    get Elapsed(): TimeSpan {
        return new TimeSpan(this.ElapsedMilliseconds);
    }

    get ElapsedTicks(): number {
        var span = this.Elapsed.Ticks;

        return span;
    }

    static StartNew(): Stopwatch {
        const s = new Stopwatch();
        s.Start();
        return s;
    }

    Reset()
    {
        const _ = this;
        _._elapsed = 0;
        _._isRunning = false;
        _._startTimeStamp = NaN;
    }

    Restart()
    {
        this.Reset();
        this.Start();
    }

    Start() {
        const _ = this;
        if (!_._isRunning) {
            _._startTimeStamp = Stopwatch.getTimestampMilliseconds();
            _._isRunning = true;
        }
    }

    Stop() {
        const _ = this;
        if (_._isRunning) {
            _._elapsed += _.currentLapMilliseconds;
            _._isRunning = false;
        }
    }
}
//#endregion System.Diagnostics

// 未完成
// #region  System.Net.WebSockets
class Uri extends NObject
{
    // https://dobon.net/vb/dotnet/internet/analyzeurl.html
    private _OriginalString: string = "";
    get OriginalString(): string { return this._OriginalString; }
    set OriginalString(uri: string) { this._OriginalString = uri;  }

    get UserEscaped(): boolean
    {
        var str = this._OriginalString;

        var xnnn = "\ xnnn".replace(" ", "");

        return NString.IndexOf(str, "\'") > -1 || NString.IndexOf(str, "\"") > -1 || NString.IndexOf(str, "\?") > -1 || NString.IndexOf(str, "\\") > -1 || NString.IndexOf(str, "\0") > -1 || NString.IndexOf(str, "\nnn") > -1 || NString.IndexOf(str, "\a") > -1 || NString.IndexOf(str, "\b") > -1 || NString.IndexOf(str, "\f") > -1 || NString.IndexOf(str, "\n") > -1 || NString.IndexOf(str, "\r") > -1 || NString.IndexOf(str, "\t") > -1 || NString.IndexOf(str, "\v") > -1 || NString.IndexOf(str, xnnn) > -1;
    }

    get Scheme(): string
    {
        if (NString.StartsWith(this._OriginalString,"file://"))
            return "file";
        if (NString.StartsWith(this._OriginalString, "ftp://") )
            return "ftp";
        if (NString.StartsWith(this._OriginalString, "gopher://") )
            return "gopher";
        if (NString.StartsWith(this._OriginalString, "http://") )
            return "http";
        if (NString.StartsWith(this._OriginalString, "https://") )
            return "https";
        if (NString.StartsWith(this._OriginalString, "ldap://") )
            return "ldap";
        if (NString.StartsWith(this._OriginalString, "mailto:") )
            return "mailto";
        if (NString.StartsWith(this._OriginalString, "net.pipe://") )
            return "net.pipe";
        if (NString.StartsWith(this._OriginalString, "net.tcp://") )
            return "net.tcp";
        if (NString.StartsWith(this._OriginalString, "news:") )
            return "news";
        if (NString.StartsWith(this._OriginalString, "nntp://") )
            return "nntp";
        if (NString.StartsWith(this._OriginalString, "telnet://") )
            return "telnet";
        if (NString.StartsWith(this._OriginalString, "uuid:") )
            return "uuid";

        return "";
    }

    get IsLoopback(): boolean
    {
        var idx = NString.IndexOf(this._OriginalString, "localhost/");

        return idx > -1;
    }

    get IsFile(): boolean
    {
        return NString.StartsWith(this._OriginalString, "file://");
    }

    get Fragment(): string
    {
        var idx = NString.IndexOf(this._OriginalString, "#");
        if (idx > -1) {
            return NString.Substring(this._OriginalString, idx, this._OriginalString.length - idx);
        } else
            return null;
    }

    get Host(): string
    {
        if (this.Scheme != null && this.Scheme.length > 0)
        {
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
                return "";
        }
    }

    get LocalPath(): string
    {
        var idx = NString.IndexOf(this._OriginalString, "#");
        if (idx > 0 && this.Host.length > 0) {
            // ホストで#topなどを含むUri
            var str = NString.Substring(this._OriginalString, this.Host.length, idx - 1);

            return Uri.UnescapeDataString(str);
        }
        else
        {
            if (this.IsFile) {
                // ファイル（localhostも含む
                var str2 = NString.Substring(this._OriginalString, "file://".length, this._OriginalString.length - "file://".length);

                if (this.UserEscaped)
                    return Uri.UnescapeDataString(str2);
                else
                    return str2;
            }
            else {
                // ファイルでもホストでもない
                if (this.Scheme == null) {
                    if (this.UserEscaped)
                        return Uri.UnescapeDataString(this._OriginalString);
                    else
                        return this._OriginalString;
                }
            }

            // 仕様上使わない
            /*
            if (this.IsLoopback) {
                var idx = NString.IndexOf(this._OriginalString, "localhost/");
            }
            */
        }
        return "";
    }

    static UnescapeDataString(stringToUnescape: string): string {       
        return decodeURIComponent(stringToUnescape);
    }

    get AbsoluteUri(): string
    {
        if (this.Scheme.length == 0)
        {
            var target = this._OriginalString.toLowerCase();
            if (NString.StartsWith(target, "c:/") || NString.StartsWith(target, "d:/") || NString.StartsWith(target, "e:/") || NString.StartsWith(target, "f:/") || NString.StartsWith(target, "g:/") || NString.StartsWith(target, "h:/") || NString.StartsWith(target, "i:/") || NString.StartsWith(target, "j:/") || NString.StartsWith(target, "k:/") || NString.StartsWith(target, "l:/") || NString.StartsWith(target, "m:/") || NString.StartsWith(target, "n:/") || NString.StartsWith(target, "0:/") || NString.StartsWith(target, "p:/") || NString.StartsWith(target, "q:/") || NString.StartsWith(target, "r:/"))
                return " file:///" + this._OriginalString;
        }

        if (this.UserEscaped == false)
            return encodeURIComponent(this._OriginalString);
        else
            return this._OriginalString;
    }

    get AbsolutePath(): string
    {
        var str = NString.Substring(this._OriginalString, this.Host.length, this._OriginalString.length - this.Host.length);

        if (this.UserEscaped == false)
            return encodeURIComponent(str);
        else
            return str;
    }

    get Query(): string
    {
        if (this.Host != null && this._OriginalString != null) {
            var str = NString.Substring(this._OriginalString, this.Host.length, this._OriginalString.length - this.Host.length);

            var question = NString.IndexOf(str, "?");

            if (question > -1)
                return str;
            else
                return "";
        } else
            return "";
    }

    constructor(uri: string = "") {
        super();

        this._OriginalString = uri;
    }
}

// 動かん
// データを取得するまでメッセージループする必要がある
// #region ClientWebSocket
class CancellationToken extends NObject {
    private _CanBeCanceled: boolean;

    _IsCancellationRequested: boolean;

    get CanBeCanceled(): boolean { return this._CanBeCanceled; }
    get IsCancellationRequested(): boolean { return false; }
    static get None(): CancellationToken { return new CancellationToken(false); }

    constructor(isToken: boolean) {
        super();

        this._CanBeCanceled = isToken;
    }
}

class ArraySegment<T> extends List<T>
{

}

enum WebSocketMessageType
{
    Binary,
    Close,
    Text
}

class Task<TResult> extends NObject
{
    Result: TResult;
} 

class WebSocketReceiveResult extends NObject
{
    Result: string;

    constructor(result: string) {
        super();

        this.Result = result;
    }
}

class ClientWebSocket extends NObject
{
    private originUri: Uri;
    private que: string;
    private socket: WebSocket;

    ConnectAsync(uri: Uri, cancellationToken: CancellationToken = CancellationToken.None) {
        var ws: string = null;

        if (ws != null)
        {
            // スキーマをws化
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
        }
    }

    SendAsync(buffer: ArraySegment<number>, messageType: WebSocketMessageType = WebSocketMessageType.Text, endOfMessage: boolean, cancellationToken: CancellationToken)
    {
        var connection = this.socket;
 
        connection.onopen = function () {
            connection.send(buffer);
        };
    }

    ReceiveAsync(buffer: ArraySegment<number>, messageType: WebSocketMessageType = WebSocketMessageType.Text): Task<WebSocketReceiveResult> 
    {
        var connection = this.socket;
        
        connection.onmessage = function (e) {
            console.log('Server: ' + e.data);

            var result: Task<WebSocketReceiveResult>;
            result.Result = e.data;

            return result;
        };

        return null;
    }
}
// #endregion ClientWebSocket

// NotImplementedException
class WebClient extends NObject {
    DownloadString(url: string): string {
        var ws: WebSocket;

        throw new NotImplementedException();
    }
}
// #endregion  System.Net.WebSockets

class Tuple<T1, T2>
{
	Item1: T1;
	Item2: T2;

    	constructor(p1: T1, p2: T2)
     {
		this.Item1 = p1;
		this.Item2 = p2;
	}

    	toString(): string
         {
		return this.Item1 + ',' + this.Item2;
	}

    	static Create<T1, T2>(p1: T1, p2: T2): Tuple < T1, T2 > {
		return new Tuple<T1, T2>(p1, p2);
	}
}