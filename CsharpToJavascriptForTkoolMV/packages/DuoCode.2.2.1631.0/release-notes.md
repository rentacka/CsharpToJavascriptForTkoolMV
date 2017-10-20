#### DuoCode 2.2 &ndash; 3-Nov-2016

 * TypeScript 2.0 support

**Compiler**:
 * [Added] Embed JavaScript block inside C# code using `/*@ ... */`, like:
   ```c#
   int x = 1;
   /*@
     var y = 2;
     console.log(x + y);
   */
   ```
 * [Added] Embed JavaScript block inside C# code using `Js.block($@"...");`, like:
   ```c#
   int x = 1;
   Js.block($@"
     var y = 2;
     console.log({x} + y);
   ");
   ```
 * [Added] C# class can inherit from JS extern class
 * [Added] Union types upto `Union<T1, T2, .., T8>`
 * [Added] `[Js(EnumAsString = true)]` attribute, emits enum value as a string with full TypeScript support
 * [Added] `Dom.TagName` enum with all tag-names for `document.createElement()`
 * [Added] `Dom.Globals` many JS functions added and documented (`eval`, `decodeURI`, `parseInt`, ...)
 * [Added] `System.Runtime.CompilerServices.RuntimeHelpers` and `RunClassConstructor()` added
 * [Fixed] Type passed in attribute corrected
 * [Fixed] TypeScript public delegate emitted typename fixed
 * [Fixed] TypeScript public enum type emitted typename changed to `TypeFunction`
 * [Fixed] Number of referenced assemblies check fixed
 * [Fixed] Trivias (multi-line comments and line-breaks) handling improved
 * [Fixed] `dcc.exe.config` fixed to better support code analyzers (such as RefactoringEssentials 4.4)
 * [Fixed] Reregister DuoCode license improved with auto-backup in `Tools > About DuoCode`

#### DuoCode 2.1 &ndash; 4-Aug-2016

 * Microsoft Visual Studio 2015 Update 3 support!
 * Microsoft Roslyn 1.3 (1.3.1.60621)
 * TypeScript 1.8 support

**Compiler**:
 * [Added] Support for multiple generic interface per class chain, see `[Js(MultipleInterface = true)]` attribute
 * [Added] `[Js(DefineProperty = "")]` can be specified at class level too
 * [Added] Specify static ctor to export as a module, see `[assembly: CompilerOptions(Export = typeof(ExportClass))]`
 * [Added] `List<T>.AsReadOnly()` added
 * [Added] Cast to `uint` improved using `>>> 0`
 * [Added] XML documentation to JsDoc very improved (@namespace, @memberof, @example, etc.)
 * [Added] `Js.clone(struct)` added
 * [Added] `List<T>.AddRange(JsArray)` support
 * [Added] `dcc.exe` runs on build server optimized
 * [Added] `IndexOutOfRangeException` is thrown if any index in a multidimensional array access is out of range
 * [Added] Assign ctors prototype in `define()`, JS code is clean and more optimized
 * [Added] `DateTime` all operators implemented
 * [Added] Support for `UMD` (Universal Module Definition) option in module system options
 * [Added] Added assembly attribute for declaring external dependencies (`JsDependency(Module = "jQuery", Parameter = "$")`)
 * [Added] `BYTES_PER_ELEMENT` static property added to all typed-arrays
 * [Added] Redundant parenthetical `()` optimization
 * [Added] `String.IsNullOrWhiteSpace()` added
 * [Added] `String.EndsWith(string value, StringComparison comparisonType)` added
 * [Added] `String.Remove()` added
 * [Added] `Element.innerHtml` added
 * [Added] TypeScript optional parameters in methods
 * [Added] TypeScript optional fields
 * [Added] `DivideByZeroException` added
 * [Fixed] TypeScript properties with `[Js(DefineProperty = "")]` attribute emitted as fields
 * [Fixed] Badly formed XML comments handled gracefully
 * [Fixed] `Array.Copy()`, `Array.Clone()` clones mutable structures
 * [Fixed] `array = new[] { ms1, ms2 }` clones mutable structures
 * [Fixed] Use shift-right zero-fill operators (`>>>` and `>>>=`) on unsigned types
 * [Fixed] TypeScript translation of `T? field` as `field?: T`
 * [Fixed] `dcc.exe` supports code analyzers targeted old Roslyn < 1.2 (such as RefactoringEssentials 3.2)
 * [Fixed] Conditional member access for dynamic variables
 * [Fixed] Shorthands for nullable constructors (for example `new int?(1)`)
 * [Fixed] Fixed bug with coalescing operator (`??`)
 * [Fixed] Rare issue with Number.Equals()
 * [Fixed] `HTMLSelectElement.options` type to `NodeListOf<HTMLSelectElement>`
 * [Fixed] `new bool()`, `new int()`, `new SomeEnum()` initialization fixed
 * [Fixed] TypeScript export constructors simplified
 * [Fixed] TypeScript interface inheritance fixed
 * [Fixed] TypeScript mscorlib number types fixed
 * [Fixed] `HTMLSelectElement.add()`, `remove()` methods renamed
 * [Fixed] `TimeSpan.Hours` bug fixed
 * [Fixed] `TimeSpan` implements `IComparable, IComparable<TimeSpan>, IEquatable<TimeSpan>`
 * [Fixed] `ClassLibrary` template fixed

#### DuoCode 2.0 &ndash; 16-Feb-2016

 * Microsoft Visual Studio 2015 Update 1 support!
 * Microsoft Roslyn 1.1 (1.1.0.51202 - 51204)
 * TypeScript 1.7 support
 * [New] Debug Engine for Visual Studio
   - Experience C# like debugging
   - Class members evaluator and quickwatch
   - Class properties evaluator and quickwatch
   - C# like callstack including namespace, class name and arguments
   - `Array` and `String` evaluator

**Compiler**:
 * [Added] Support for mutable structures, cloned by the compiler, see `[Js(StructIsImmutable = false)]` attribute
 * [Added] `new type()` usage support, marshal it to the first ctor, `new type.ctor()` is also supported
 * [Added] Inherit from `JsInterface` or `JsDictionary<,>` in order to declare "bag" or interface like classes
 * [Added] Union types `Union<T1, T2>` similar to `T1 | T2` in TypeScript
 * [Added] Specify static ctor to call on script load, see `[assembly: CompilerOptions(Startup = typeof(StartupClass))]`
 * [Added] `Js.typeFunction<T>()` and `Js.typeFunction(Type type)`
 * [Added] `[Js(DefineProperty = "...")]` attribute, generates JS property using `Object.defineProperty`
 * [Added] NumberStyles enum and advanced number parsing
 * [Added] `Dom.String.fromCharCode()` added
 * [Added] `DateTime.ToLocalTime()`, `DateTime.ToUniveralTime()` added
 * [Added] `Array.Copy()` optimized for typed-arrays
 * [Added] `Array.Slice()` added and optimized for typed-arrays
 * [Added] `Array.Sort()` with subrange optimized for typed-arrays
 * [Added] `JsArray.reverse()` added
 * [Added] `else if ...` emitted in one line
 * [Added] `Array.AsReadOnly<T>()` added
 * [Added] `Interlocked.Increment()`, `Interlocked.Decrement()` added
 * [Added] `ICloneable` added
 * [Fixed] Support for fast "nothing changed" rebuilds
 * [Fixed] Robust and improved partial classes and methods support
 * [Fixed] Multidimensional array initialization bug fixed
 * [Fixed] `array[index]++` bug fixed
 * [Fixed] TypeScript `System.Int32` to `Number` cast fix
 * [Fixed] `DateTime.AddTicks()` and ctors with `DateTimeKind.Utc` specified fixed
 * [Fixed] `byte[] is Array` and any `typed-array is Array` fixed
 * [Fixed] `default(Nullable<T>)` is `undefined` instead of `null`

#### DuoCode 1.3 &ndash; 9-Nov-2015

**Compiler**:
 * [Added] Web Workers support with sample code, see `WebWorkerTests.cs` in `UnitTest` template
 * [Added] Generic type memoize cache (x10 performance boost)
 * [Added] type-function is fully JIT optimized by V8 engine (x4 performance boost)
 * [Added] `List<T>` optimized (x4 performance boost), supports `Capacity`, more overloads, comply to CLR
 * [Added] Support for cyclic by interface or by generic argument classes (including cross assemblies)
 * [Added] Linq `Enumerable.Min`, `Enumerable.Max` improvements and more overloads
 * [Added] `UnitTest` uses `QUnit.Assert` interface
 * [Added] Improved `extern` types to sub-types propagation
 * [Fixed] Fix dependency between two classes (base and super) from two assemblies during topology sorting 
 * [Fixed] JS reserved keywords list improved
 * [Fixed] `break` mismatch between `foreach` and `switch` in Linq closure bug fixed
 * [Fixed] Named argument called positionally bug fixed
 * [Fixed] `DateTime.DayOfYear` fix
 * [Fixed] 'Unable to read program settings' error fixed

#### DuoCode 1.2 &ndash; 29-Sep-2015

**Visual Studio Extension**
 * [Added] Improved license information and status

**Compiler**:
 * [Added] Support for jagged arrays
 * [Added] Copy .min.js version of copy-local referenced assembly
 * [Added] dynamic late bounded method error handling
 * [Added] `dcc.exe` improved error handling and fusion log
 * [Added] `Dom.HTMLTemplateElement` added
 * [Fixed] `Dom.Event` many ctors fixed
 * [Fixed] `DateTime.CompareTo` bug fixed
 * [Fixed] `Math.Round with MidpointRounding.AwayFromZero` bug fixed

#### DuoCode 1.1 &ndash; 27-Jul-2015

 * Microsoft Visual Studio 2015 support!
 * Microsoft Roslyn 1.0 release
 * TypeScript 1.5 support
 * Pricing model introduced (http://duoco.de/buy)

**Visual Studio Extension**
 * [Added] TypeScript project template enhanced

**Compiler**:
 * [Added] `mscorlib.min.js` is auto-deployed (50% smaller)
 * [Added] TypeScript: generic classes are strongly typed
 * [Added] TypeScript: delegates are strongly typed
 * [Added] TypeScript: `interface TypeArg<T>` added
 * [Added] TypeScript: emit `ref/out` params
 * [Added] `System.IO.BinaryReader`
 * [Fixed] global declarations fixed in JS and TS
 * [Fixed] `decimal` syntax support like `0.1m`
 * [Fixed] Nested anonymous types bug fixed
 * [Fixed] `TimeSpan.Total` bugs fixed
 * [Fixed] Many small bugfixes (char casting, immutable structs, double round-tripping)

#### DuoCode 1.0 &ndash; 23-Jun-2015

 * DuoCode is released! No longer BETA!

**Visual Studio Extension**
 * [Added] Hybrid C#/TypeScript application support!
 * [Added] TypeScript declaration file (`.d.ts`) generation (ECMAScript 3/5/6 support)
 * [Added] New TypeScript project template

**Compiler**:
 * [Added] <LogicalName> embedded resource renaming support
 * [Added] `Js.function(nameof(some_method))` added
 * [Added] Mono/XBuild embedded resource support
 * [Added] `SortedList` implemented in `mscorlib`
 * [Fixed] Overload methods optimization
 * [Fixed] Many small bugfixes

#### DuoCode 0.6 (BETA) &ndash; 14-May-2015

**Visual Studio Extension**:
 * [Added] Visual Studio 2015 RC support

**Compiler**:
 * [Added] Mono / XBuild support
 * [Added] Added an option to generate inline source-maps within the .js file
 * [Added] DOM bindings, `addEventListener` improvements
 * [Added] `Array.FindAll()`, `Array.ForEach()`
 * [Fixed] Better support for reflection types (`PropertyInfo`, `EventInfo`)
 * [Fixed] Support `this = other` for structs
 * [Fixed] Pre/postfix unary operators

#### DuoCode 0.5 (BETA) &ndash; 17-Apr-2015

**Visual Studio Extension**:
 * [Added] DuoCode project property page
 * [Added] Visual Studio 2013 debugging support
 * [Added] Web project publishing support

**Compiler**:
 * [Added] Additional binding definitions for Node.js v0.12.2
 * [Added] Incremental compilation, cleaning and parallel build support
 * [Added] Optimizations and inlining in the generated JavaScript
 * [Added] Advanced compilation options: `<DuoCodeSourceMapsRoot>` and `<DuoCodeSourceCodeRoot>`
 * [Added] The following types were added (or improved/optimized):
  * `IComparer<T>` and its derivatives (`List<T>`, `Array<T>`, `Dictionary<T,K>`)
  * `Comparer<T>` and `EqualityComparer<T>`
  * `System.IO.Path`
  * `System.Array`
  * `System.Guid`
  * `System.Text.StringBuilder`
 * [Added] Structs support improved, ValueType.Equals() and GetHashCode() implemented
 * [Added] Optimization of static methods invocation
 * [Added] C# call-stack in Chrome (V8) support
 * [Added] #region/#endregion support (use with Web Essentials)
 * [Fixed] Improved runtime reflection support (`Activator.CreateInstance`, `ConstructorInfo.Invoke`)
 * [Fixed] Fixed an issue where Anonymous types were generated incorrectly
 * [Fixed] ToString() improved in many classes
 * [Fixed] Improved ReSharper support in DuoCode projects

<hr>

#### DuoCode 0.4 (BETA) &ndash; 25-Mar-2015

* First public release
