/*
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * Copyright (C) 2016 Application Development & Delivery <adnd@hpe.com>
 */

describe('Util package', function() {

    // *************************************************************************
    // * Availibility
    // *************************************************************************

    it('available', function() {
        expect(Util).toBeDefined();
        expect(U).toBeDefined();
    });
    
    // *********************************************************************
    // * String functions
    // *********************************************************************

    describe('String functions', function() {
        describe('endsWith', function() {
            it('available', function() {
                expect(String.prototype.endsWith).toBeDefined();
            });
            it('without parameters on empty string', function() {
                expect(''.endsWith()).toBe(false);
            });
            it('with null parameter on "apple" string', function() {
                expect('apple'.endsWith(null)).toBe(false);
            });
            it('with undefined parameter on "apple" string', function() {
                expect('apple'.endsWith(undefined)).toBe(false);
            });
            it('with empty string parameter on "apple" string', function() {
                expect('apple'.endsWith('')).toBe(false);
            });
            it('with "le" parameter on "apple" string', function() {
                expect('apple'.endsWith('le')).toBe(true);
            });
            it('with "lo" parameter on "apple" string', function() {
                expect('apple'.endsWith('lo')).toBe(false);
            });
            it('with "apple" parameter on "apple" string', function() {
                expect('apple'.endsWith('apple')).toBe(true);
            });
            it('with "appl" parameter on "apple" string', function() {
                expect('apple'.endsWith('appl')).toBe(false);
            });
        });
        describe('replaceAll', function() {
            it('available', function() {
                expect(String.prototype.replaceAll).toBeDefined();
            });
            it('without parameters on empty string', function() {
                expect(''.replaceAll()).toEqual('');
            });
            it('with "pl" find parameter on empty string', function() {
                expect(''.replaceAll('pl')).toEqual('');
            });
            it('with "pl" find and "re" replace parameters on empty string', function() {
                expect(''.replaceAll('pl', 're')).toEqual('');
            });
            it('with "pl" find parameter on "apple" string', function() {
                expect('apple'.replaceAll('pl')).toEqual('apple');
            });
            it('with "pl" find and "re" replace parameters on "apple" string', function() {
                expect('apple'.replaceAll('pl', 're')).toEqual('apree');
            });
            it('with "pl" find parameter on "appleapple" string', function() {
                expect('appleapple'.replaceAll('pl')).toEqual('appleapple');
            });
            it('with "pl" find and "re" replace parameters on "appleapple" string', function() {
                expect('appleapple'.replaceAll('pl', 're')).toEqual('apreeapree');
            });
        });
        describe('isDigit', function() {
            it('available', function() {
                expect(String.prototype.isDigit).toBeDefined();
            });
            it('on empty string', function() {
                expect(''.isDigit()).toBe(false);
            });
            it('on "a" string', function() {
                expect('a'.isDigit()).toBe(false);
            });
            it('on "a9" string', function() {
                expect('a9'.isDigit()).toBe(false);
            });
            it('on "PI" string', function() {
                expect('PI'.isDigit()).toBe(false);
            });
            it('on "8" string', function() {
                expect('8'.isDigit()).toBe(true);
            });
            it('on ".8" string', function() {
                expect('.8'.isDigit()).toBe(false);
            });
        });
        describe('isAlpha', function() {
            it('available', function() {
                expect(String.prototype.isAlpha).toBeDefined();
            });
            it('on empty string', function() {
                expect(''.isAlpha()).toBe(false);
            });
            it('on "a" string', function() {
                expect('a'.isAlpha()).toBe(true);
            });
            it('on "A" string', function() {
                expect('a'.isAlpha()).toBe(true);
            });
            it('on "Az" string', function() {
                expect('Az'.isAlpha()).toBe(true);
            });  
            it('on "a9" string', function() {
                expect('a9'.isAlpha()).toBe(false);
            });
            it('on "8" string', function() {
                expect('8'.isAlpha()).toBe(false);
            });
            it('on "PI" string', function() {
                expect('PI'.isAlpha()).toBe(true);
            });
        });
    });
    
    // *********************************************************************
    // * Array functions
    // *********************************************************************
    
    describe('Array functions', function() {
        describe('indexOf', function() {
            it('available', function() {
                expect(Array.prototype.indexOf).toBeDefined();
            });
            it('on empty array without parameters', function() {
                expect([].indexOf()).toBe(-1);
            });
            it('on empty array with undefined parameter', function() {
                expect([].indexOf(undefined)).toBe(-1);
            });
            it('on empty array with null parameter', function() {
                expect([].indexOf(null)).toBe(-1);
            });
            it('on empty array with 1 parameter', function() {
                expect([].indexOf(1)).toBe(-1);
            });
            it('on [9,4,7] array with 4 parameter', function() {
                expect([9, 4, 7].indexOf(4)).toBe(1);
            });
            it('on [9,4,7] array with 5 parameter', function() {
                expect([9, 4, 7].indexOf(5)).toBe(-1);
            });
            it('on [9, 4, "a", 7] array with "a" parameter', function() {
                expect([9, 4, 'a', 7].indexOf('a')).toBe(2);
            });
            it('on [9, null, "a", 7] array with null parameter', function() {
                expect([9, null, 'a', 7].indexOf(null)).toBe(1);
            });
            it('on [9, undefined, "a", 7] array with undefined parameter', function() {
                expect([9, undefined, 'a', 7].indexOf(undefined)).toBe(1);
            });
        });
    });

    // *********************************************************************
    // * General functions
    // *********************************************************************
    
    describe('General functions', function() {
        describe('callback', function() {
            it('available', function() {
                expect(Util.callback).toBeDefined();
            });
            it('invoke without parameters', function() {
                expect(function() {Util.callback();}).not.toThrow();
            });
            it('invoke with undefined parameter', function() {
                expect(function() {Util.callback(undefined);}).not.toThrow();
            });
            it('invoke with null parameter', function() {
                expect(function() {Util.callback(null);}).not.toThrow();
            });
            it('invoke with string "" (empty string) parameter', function() {
                expect(function() {Util.callback('');}).not.toThrow();
            });
            describe('invoke with function parameter', function() {
                var invoked = false;

                var callback = function(done) {
                    setTimeout(function() {
                        invoked = true;
                        done();
                    }, 10);
                };

                beforeEach(function(done) {
                    Util.callback(callback, done);
                });

                it('invoking', function(done) {
                    expect(invoked).toBe(true);
                    done();
                });
            });
            describe('invoke with function and "apple" parameters', function() {
                var invoked = false;

                var callback = function(fruit, done) {
                    setTimeout(function() {
                        if (fruit == 'apple') {
                            invoked = true;
                        }

                        done();
                    }, 10);
                };

                beforeEach(function(done) {
                    Util.callback(callback, 'apple', done);
                });

                it('invoking', function(done) {
                    expect(invoked).toBe(true);
                    done();
                });
            });
        });
        describe('merge', function() {
            it('available', function() {
                expect(Util.merge).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.merge()).toEqual({});
            });
            it('with undefined target parameter', function() {
                expect(Util.merge(undefined)).toEqual({});
            });
            it('with undefined target and source parameters', function() {
                expect(Util.merge(undefined, undefined)).toEqual({});
            });
            it('with null target parameter', function() {
                expect(Util.merge(undefined)).toEqual({});
            });
            it('with null target and source parameters', function() {
                expect(Util.merge(undefined, undefined)).toEqual({});
            });
            it('with empty string "" parameter', function() {
                expect(Util.merge('')).toEqual({});
            });
            it('with empty object {} parameter', function() {
                expect(Util.merge({})).toEqual({});
            });
            it('with empty object {} target and source parameters', function() {
                expect(Util.merge({}, {})).toEqual({});
            });
            it('with custom source object and empty object {} target parameters', function() {
                var target = {};
                var source = {a: 'b'};
                var result = Util.merge(target, source);

                expect(result).toEqual(source);
                expect(result).toBe(target);
            });
            it('with custom source and target object parameters', function() {
                var target = {a: 'b'};
                var source = {c: 'd', d: { e: 'f'}};
                var result = Util.merge(target, source);

                expect(result).toEqual({a: 'b', c: 'd', d: { e: 'f'}});
                expect(result).toBe(target);
            });
        });
        describe('getAttr', function() {
            it('available', function() {
                expect(Util.getAttr).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.getAttr()).toEqual(undefined);
            });
            it('with undefined parameter only', function() {
                expect(Util.getAttr(undefined)).toEqual(undefined);
            });
            it('with null parameter only', function() {
                expect(Util.getAttr(null)).toEqual(undefined);
            });
            it('with empty string "" parameter only', function() {
                expect(Util.getAttr('')).toEqual(undefined);
            });
            it('with empty object {} parameter only', function() {
                expect(Util.getAttr({})).toEqual(undefined);
            });
            it('with empty object {} and undefined parameters', function() {
                expect(Util.getAttr({}, undefined)).toEqual(undefined);
            });
            it('with empty object {} and null parameters', function() {
                expect(Util.getAttr({}, null)).toEqual(undefined);
            });
            it('with empty object {} and empty string "" parameters', function() {
                expect(Util.getAttr({}, '')).toEqual(undefined);
            });
            it('with empty object {} and "pname" parameters', function() {
                expect(Util.getAttr({}, 'pname')).toEqual(undefined);
            });
            it('with custom object and "pname" parameters', function() {
                expect(Util.getAttr({ pname: 'b' }, 'pname')).toEqual('b');
            });
            it('with custom object and ".pname" parameters', function() {
                expect(Util.getAttr({ pname: 'b' }, '.pname')).toEqual(undefined);
            });
            it('with custom object and "a.pnam" parameters', function() {
                expect(Util.getAttr({ a: {pname: 'b' }}, 'a.pnam')).toEqual(undefined);
            });
            it('with custom object and "c.pname" parameters', function() {
                expect(Util.getAttr({ a: {pname: 'b' }}, 'c.pname')).toEqual(undefined);
            });
            it('with custom object and "a.pname" parameters that is undefined', function() {
                expect(Util.getAttr({ a: {pname: undefined }}, 'a.pname')).toEqual(undefined);
            });
            it('with custom object and "a.pname" parameters that is null', function() {
                expect(Util.getAttr({ a: {pname: null }}, 'a.pname')).toEqual(null);
            });
            it('with custom object and "a..pname" parameters', function() {
                expect(Util.getAttr({ a: {pname: 'b' }}, 'pname')).toEqual(undefined);
            });
        });
        describe('isString', function() {
            it('available', function() {
                expect(Util.isString).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isString()).toBe(false);
            });
            it('with undefined parameter', function() {
                expect(Util.isString(undefined)).toBe(false);
            });
            it('with null parameter', function() {
                expect(Util.isString(null)).toBe(false);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isString('')).toBe(true);
            });
            it('with "apple" parameter', function() {
                expect(Util.isString('apple')).toBe(true);
            });
            it('with 1 parameter', function() {
                expect(Util.isString(1)).toBe(false);
            });
            it('with object parameter', function() {
                expect(Util.isString({})).toBe(false);
            });
            it('with function parameter', function() {
                expect(Util.isString(function(){})).toBe(false);
            });
        });
        describe('isFunction', function() {
            it('available', function() {
                expect(Util.isFunction).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isFunction()).toBe(false);
            });
            it('with undefined parameter', function() {
                expect(Util.isFunction(undefined)).toBe(false);
            });
            it('with null parameter', function() {
                expect(Util.isFunction(null)).toBe(false);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isFunction('')).toBe(false);
            });
            it('with 1 parameter', function() {
                expect(Util.isFunction(1)).toBe(false);
            });
            it('with object parameter', function() {
                expect(Util.isFunction({})).toBe(false);
            });
            it('with function parameter', function() {
                expect(Util.isFunction(function(){})).toBe(true);
            });
        });
        describe('isArray', function() {
            it('available', function() {
                expect(Util.isArray).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isArray()).toBe(false);
            });
            it('with undefined parameter', function() {
                expect(Util.isArray(undefined)).toBe(false);
            });
            it('with null parameter', function() {
                expect(Util.isArray(null)).toBe(false);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isArray('')).toBe(false);
            });
            it('with 1 parameter', function() {
                expect(Util.isArray(1)).toBe(false);
            });
            it('with object parameter', function() {
                expect(Util.isArray({})).toBe(false);
            });
            it('with empty array [] parameter', function() {
                expect(Util.isArray([])).toBe(true);
            });
            it('with array [1, 2, 3] parameter', function() {
                expect(Util.isArray([1, 2, 3])).toBe(true);
            });
        });
        describe('isPrimitive', function() {
            it('available', function() {
                expect(Util.isPrimitive).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isPrimitive()).toBe(false);
            });
            it('with undefined parameter', function() {
                expect(Util.isPrimitive(undefined)).toBe(false);
            });
            it('with null parameter', function() {
                expect(Util.isPrimitive(null)).toBe(false);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isPrimitive('')).toBe(true);
            });
            it('with 0 parameter', function() {
                expect(Util.isPrimitive(0)).toBe(true);
            });
            it('with object parameter', function() {
                expect(Util.isPrimitive({})).toBe(false);
            });
            it('with array [1, 2] parameter', function() {
                expect(Util.isPrimitive([1, 2])).toBe(false);
            });
            it('with date parameter', function() {
                expect(Util.isPrimitive(new Date())).toBe(false);
            });
        });
        describe('browser', function() {
            it('available', function() {
                expect(Util.browser).toBeDefined();
            });
            it('check browser type and version', function() {
                expect(Util.browser()).toEqual({ type: 'Chrome', version: '49' });
            });
        });
        describe('isEmpty', function() {
            it('available', function() {
                expect(Util.isEmpty).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isEmpty()).toBe(true);
            });
            it('with undefined parameter', function() {
                expect(Util.isEmpty(undefined)).toBe(true);
            });
            it('with null parameter', function() {
                expect(Util.isEmpty(null)).toBe(true);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isEmpty('')).toBe(true);
            });
            it('with string "apple" parameter', function() {
                expect(Util.isEmpty('apple')).toBe(false);
            });
            it('with 0 parameter', function() {
                expect(Util.isEmpty(0)).toBe(false);
            });
            it('with object parameter', function() {
                expect(Util.isEmpty({})).toBe(false);
            });
            it('with array [1, 2] parameter', function() {
                expect(Util.isEmpty([1, 2])).toBe(false);
            });
            it('with date parameter', function() {
                expect(Util.isEmpty(new Date())).toBe(false);
            });
        });
        describe('getArray', function() {
            it('available', function() {
                expect(Util.getArray).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.getArray()).toEqual([]);
            });
            it('with undefined object parameter', function() {
                expect(Util.getArray(undefined)).toEqual([]);
            });
            it('with null object parameter', function() {
                expect(Util.getArray(null)).toEqual([]);
            });
            it('with null object and "b" attribute parameters', function() {
                expect(Util.getArray(null, 'b')).toEqual([]);
            });
            it('with empty array [] object parameter', function() {
                expect(Util.getArray([])).toEqual([]);
            });
            it('with array [1, 2] object parameter', function() {
                expect(Util.getArray([1, 2])).toEqual([1, 2]);
            });
            it('with { a: 1, b: "apple" } object and "b" attribute parameters', function() {
                expect(Util.getArray({ a: 1, b: "apple" }, 'b')).toEqual(['apple']);
            });
            it('with { a: 1, b: { c: "apple" }} object and "b.c" attribute parameters', function() {
                expect(Util.getArray({ a: 1, b: { c: "apple" }}, 'b.c')).toEqual(['apple']);
            });
            it('with { a: 1, b: { c: "apple" }} object and "b" attribute parameters', function() {
                expect(Util.getArray({ a: 1, b: { c: "apple" }}, 'b')).toEqual([{ c: 'apple' }]);
            });
        });
        describe('isENTER', function() {
            it('available', function() {
                expect(Util.isENTER).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isENTER()).toBe(false);
            });
            it('with undefined parameter', function() {
                expect(Util.isENTER(undefined)).toBe(false);
            });
            it('with null parameter', function() {
                expect(Util.isENTER(null)).toBe(false);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isENTER('')).toBe(false);
            });
            it('with empty object {} parameter', function() {
                expect(Util.isENTER({})).toBe(false);
            });
            it('with object { keyCode: 65 } parameter', function() {
                expect(Util.isENTER({ keyCode: 65 })).toBe(false);
            });
            it('with object { which: 65 } parameter', function() {
                expect(Util.isENTER({ which: 65 })).toBe(false);
            });
            it('with object { keyCode: 13 } parameter', function() {
                expect(Util.isENTER({ keyCode: 13 })).toBe(true);
            });
            it('with object { which: 13 } parameter', function() {
                expect(Util.isENTER({ which: 13 })).toBe(true);
            });
            it('with object { keyCode: 13, which: 13 } parameter', function() {
                expect(Util.isENTER({ keyCode: 13, which: 13 })).toBe(true);
            });
            it('with object { keyCode: 65, which: 13 } parameter', function() {
                expect(Util.isENTER({ keyCode: 65, which: 13 })).toBe(false);
            });
            it('with object { keyCode: 13, which: 65 } parameter', function() {
                expect(Util.isENTER({ keyCode: 13, which: 65 })).toBe(true);
            });
            it('with object { keyCode: null, which: 65 } parameter', function() {
                expect(Util.isENTER({ keyCode: null, which: 65 })).toBe(false);
            });
            it('with object { keyCode: null, which: 13 } parameter', function() {
                expect(Util.isENTER({ keyCode: null, which: 13 })).toBe(true);
            });
        });
        describe('isESC', function() {
            it('available', function() {
                expect(Util.isESC).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isESC()).toBe(false);
            });
            it('with undefined parameter', function() {
                expect(Util.isESC(undefined)).toBe(false);
            });
            it('with null parameter', function() {
                expect(Util.isESC(null)).toBe(false);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isESC('')).toBe(false);
            });
            it('with empty object {} parameter', function() {
                expect(Util.isESC({})).toBe(false);
            });
            it('with object { keyCode: 65 } parameter', function() {
                expect(Util.isESC({ keyCode: 65 })).toBe(false);
            });
            it('with object { which: 65 } parameter', function() {
                expect(Util.isESC({ which: 65 })).toBe(false);
            });
            it('with object { keyCode: 27 } parameter', function() {
                expect(Util.isESC({ keyCode: 27 })).toBe(true);
            });
            it('with object { which: 27 } parameter', function() {
                expect(Util.isESC({ which: 27 })).toBe(true);
            });
            it('with object { keyCode: 27, which: 27 } parameter', function() {
                expect(Util.isESC({ keyCode: 27, which: 27 })).toBe(true);
            });
            it('with object { keyCode: 65, which: 27 } parameter', function() {
                expect(Util.isESC({ keyCode: 65, which: 27 })).toBe(false);
            });
            it('with object { keyCode: 27, which: 65 } parameter', function() {
                expect(Util.isESC({ keyCode: 27, which: 65 })).toBe(true);
            });
            it('with object { keyCode: null, which: 65 } parameter', function() {
                expect(Util.isESC({ keyCode: null, which: 65 })).toBe(false);
            });
            it('with object { keyCode: null, which: 27 } parameter', function() {
                expect(Util.isESC({ keyCode: null, which: 27 })).toBe(true);
            });
        });
        describe('preventDefault', function() {
            it('available', function() {
                expect(Util.preventDefault).toBeDefined();
            });
            it('without parameters', function() {
                expect(function() {Util.preventDefault();}).not.toThrow();
            });
            it('with undefined parameter', function() {
                expect(function() {Util.preventDefault(undefined);}).not.toThrow();
            });
            it('with null parameter', function() {
                expect(function() {Util.preventDefault(null);}).not.toThrow();
            });
            it('with empty string "" parameter', function() {
                expect(function() {Util.preventDefault('');}).not.toThrow();
            });
            it('with string "apple" parameter', function() {
                expect(function() {Util.preventDefault('apple');}).not.toThrow();
            });
            it('with empty object {} parameter', function() {
                var e = {};
                expect(function() {Util.preventDefault(e);}).not.toThrow();
                expect(e).toEqual({ returnValue: false });
            });
            it('with object {preventDefault: null} parameter', function() {
                expect(function() {Util.preventDefault({ preventDefault: null });}).not.toThrow();
            });
            it('with object {preventDefault: "apple"} parameter', function() {
                expect(function() {Util.preventDefault({ preventDefault: 'apple' });}).not.toThrow();
            });
            it('with object {preventDefault: function() {}} parameter', function() {
                expect(function() {Util.preventDefault({ preventDefault: function() {} });}).not.toThrow();
            });
        });
        describe('isCTRLS', function() {
            it('available', function() {
                expect(Util.isCTRLS).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.isCTRLS()).toBe(false);
            });
            it('with undefined parameter', function() {
                expect(Util.isCTRLS(undefined)).toBe(false);
            });
            it('with null parameter', function() {
                expect(Util.isCTRLS(null)).toBe(false);
            });
            it('with empty string "" parameter', function() {
                expect(Util.isCTRLS('')).toBe(false);
            });
            it('with empty object {} parameter', function() {
                expect(Util.isCTRLS({})).toBe(false);
            });
            it('with object { keyCode: 65 } parameter', function() {
                expect(Util.isCTRLS({ keyCode: 65 })).toBe(false);
            });
            it('with object { which: 65 } parameter', function() {
                expect(Util.isCTRLS({ which: 65 })).toBe(false);
            });
            it('with object { keyCode: 83 } parameter', function() {
                expect(Util.isCTRLS({ ctrlKey: true, keyCode: 83 })).toBe(true);
            });
            it('with object { keyCode: 83 } parameter', function() {
                expect(Util.isCTRLS({ metaKey: true, keyCode: 83 })).toBe(true);
            });
            it('with object { which: 83 } parameter', function() {
                expect(Util.isCTRLS({ which: 83 })).toBe(false);
            });
            it('with object { ctrlKey: true, keyCode: 27, which: 27 } parameter', function() {
                expect(Util.isCTRLS({ ctrlKey: true, keyCode: 83, which: 83 })).toBe(true);
            });
            it('with object { ctrlKey: true, keyCode: 65, which: 83 } parameter', function() {
                expect(Util.isCTRLS({ ctrlKey: true, keyCode: 65, which: 83 })).toBe(false);
            });
            it('with object { ctrlKey: true, keyCode: 83, which: 65 } parameter', function() {
                expect(Util.isCTRLS({ ctrlKey: true, keyCode: 83, which: 65 })).toBe(true);
            });
            it('with object { ctrlKey: true, keyCode: null, which: 65 } parameter', function() {
                expect(Util.isCTRLS({ ctrlKey: true, keyCode: null, which: 65 })).toBe(false);
            });
            it('with object { ctrlKey: true, keyCode: null, which: 83 } parameter', function() {
                expect(Util.isCTRLS({ ctrlKey: true, keyCode: null, which: 83 })).toBe(true);
            });
        });
        describe('noCache', function() {
            it('available', function() {
                expect(Util.noCache).toBeDefined();
            });
            it('invoke', function() {
                var t = new Date().getTime();
                expect(Util.noCache() >= t).toBeTruthy();
            });
        });
        describe('getURLParameters', function() {
            it('available', function() {
                expect(Util.getURLParameters).toBeDefined();
            });
            it('without parameters', function() {
                var p = JSON.stringify(Util.getURLParameters());

                if (p == JSON.stringify({}) || p == JSON.stringify({ util: 'undefined' })) {
                    expect(true).toBeTruthy();
                } else {
                    expect(false).toBeTruthy();
                }
            });
            it('with undefined parameter', function() {
                var p = JSON.stringify(Util.getURLParameters(undefined));

                if (p == JSON.stringify({}) || p == JSON.stringify({ util: 'undefined' })) {
                    expect(true).toBeTruthy();
                } else {
                    expect(false).toBeTruthy();
                }
            });
            it('with null parameter', function() {
                var p = JSON.stringify(Util.getURLParameters(null));

                if (p == JSON.stringify({}) || p == JSON.stringify({ util: 'undefined' })) {
                    expect(true).toBeTruthy();
                } else {
                    expect(false).toBeTruthy();
                }
            });
            it('with empty object {} parameter', function() {
                var p = JSON.stringify(Util.getURLParameters({}));

                if (p == JSON.stringify({}) || p == JSON.stringify({ util: 'undefined' })) {
                    expect(true).toBeTruthy();
                } else {
                    expect(false).toBeTruthy();
                }
            });
            it('with empty string "" parameter', function() {
                var p = JSON.stringify(Util.getURLParameters(''));

                if (p == JSON.stringify({}) || p == JSON.stringify({ util: 'undefined' })) {
                    expect(true).toBeTruthy();
                } else {
                    expect(false).toBeTruthy();
                }
            });
            it('with string "?a=b" parameter', function() {
                expect(Util.getURLParameters('?a=b')).toEqual({ a: 'b'});
            });
            it('with string "a=b" parameter', function() {
                expect(Util.getURLParameters('a=b')).toEqual({ a: 'b'});
            });
            it('with string "?a=b&d=e" parameter', function() {
                expect(Util.getURLParameters('?a=b&d=e')).toEqual({ a: 'b', d: 'e'});
            });
            it('with string "?a=b&d=e#bookmark" parameter', function() {
                expect(Util.getURLParameters('?a=b&d=e#bookmark')).toEqual({ a: 'b', d: 'e'});
            });
        });
        describe('getURLAnchor', function() {
            it('available', function() {
                expect(Util.getURLAnchor).toBeDefined();
            });
            it('invoke', function() {
                expect(Util.getURLAnchor()).toBe(null);
            });
        });
        describe('escapeHTML', function() {
            it('available', function() {
                expect(Util.escapeHTML).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.escapeHTML()).toEqual(undefined);
            });
            it('with undefined parameter', function() {
                expect(Util.escapeHTML(undefined)).toEqual(undefined);
            });
            it('with null parameter', function() {
                expect(Util.escapeHTML(null)).toEqual(null);
            });
            it('with empty string "" parameter', function() {
                expect(Util.escapeHTML('')).toEqual('');
            });
            it('with string "<a>apple</a>" parameter', function() {
                expect(Util.escapeHTML('<a>apple</a>')).toEqual('&lt;a>apple&lt;/a>');
            });
            it('with string "<a>apple "orange"</a>" parameter', function() {
                expect(Util.escapeHTML('<a>apple "orange"</a>')).toEqual('&lt;a>apple &quot;orange&quot;&lt;/a>');
            });
            it('with string "<a>apple&orange</a>" parameter', function() {
                expect(Util.escapeHTML('<a>apple&orange</a>')).toEqual('&lt;a>apple&amp;orange&lt;/a>');
            });
        });
        describe('escapeXML', function() {
            it('available', function() {
                expect(Util.escapeXML).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.escapeXML()).toEqual(undefined);
            });
            it('with undefined parameter', function() {
                expect(Util.escapeXML(undefined)).toEqual(undefined);
            });
            it('with null parameter', function() {
                expect(Util.escapeXML(null)).toEqual(null);
            });
            it('with empty string "" parameter', function() {
                expect(Util.escapeXML('')).toEqual('');
            });
            it('with string "<a>apple</a>" parameter', function() {
                expect(Util.escapeXML('<a>apple</a>')).toEqual('&lt;a>apple&lt;/a>');
            });
            it('with string "<a>apple "orange"</a>" parameter', function() {
                expect(Util.escapeXML('<a>apple "orange"</a>')).toEqual('&lt;a>apple &quot;orange&quot;&lt;/a>');
            });
            it('with string "<a>apple&orange</a>" parameter', function() {
                expect(Util.escapeXML('<a>apple&orange</a>')).toEqual('&lt;a>apple&amp;orange&lt;/a>');
            });
        });
        describe('qualifyURL', function() {
            it('available', function() {
                expect(Util.qualifyURL).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.qualifyURL()).toEqual(undefined);
            });
            it('with undefined parameter', function() {
                expect(Util.qualifyURL(undefined)).toEqual(undefined);
            });
            it('with null parameter', function() {
                expect(Util.qualifyURL(null)).toEqual(null);
            });
            it('with empty string "" parameter', function() {
                expect(Util.qualifyURL('')).toEqual('');
            });
            it('with string "http://apple.com/orange.html" parameter', function() {
                expect(Util.qualifyURL('http://apple.com/orange.html')).toEqual('http://apple.com/orange.html');
            });
            it('with string "http://apple.com/a/../orange.html" parameter', function() {
                expect(Util.qualifyURL('http://apple.com/a/../orange.html')).toEqual('http://apple.com/orange.html');
            });
            it('with string "http://apple.com/a/b/../b/./orange.html" parameter', function() {
                expect(Util.qualifyURL('http://apple.com/a/b/../b/./orange.html')).toEqual('http://apple.com/a/b/orange.html');
            });
        });
        describe('removeLastSlash', function() {
            it('available', function() {
                expect(Util.removeLastSlash).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.removeLastSlash()).toEqual(undefined);
            });
            it('with undefined parameter', function() {
                expect(Util.removeLastSlash(undefined)).toEqual(undefined);
            });
            it('with null parameter', function() {
                expect(Util.removeLastSlash(null)).toEqual(null);
            });
            it('with empty string "" parameter', function() {
                expect(Util.removeLastSlash('')).toEqual('');
            });
            it('with string "http://apple.com/" parameter', function() {
                expect(Util.removeLastSlash('http://apple.com/')).toEqual('http://apple.com');
            });
            it('with string "http://apple.com" parameter', function() {
                expect(Util.removeLastSlash('http://apple.com')).toEqual('http://apple.com');
            });
        });
        describe('getOffset', function() {
            it('available', function() {
                expect(Util.getOffset).toBeDefined();
            });
            it('without parameters', function() {
                expect(Util.getOffset()).toEqual({ x: 0, y: 0 });
            });
            it('with undefined parameter', function() {
                expect(Util.getOffset(undefined)).toEqual({ x: 0, y: 0 });
            });
            it('with null parameter', function() {
                expect(Util.getOffset(null)).toEqual({ x: 0, y: 0 });
            });
        });
        describe('sortData', function() {
            it('available', function() {
                expect(Util.sortData).toBeDefined();
            });
            it('sorting numeric data', function() {
                var a = [2, 3, 1];
                var sorter = Util.sortData();
                a.sort(sorter);

                expect(a).toEqual([1, 2, 3]);
            });
            it('sorting numeric data ascending', function() {
                var a = [2, 3, 1];
                var sorter = Util.sortData(undefined, 'asc');
                a.sort(sorter);

                expect(a).toEqual([1, 2, 3]);
            });
            it('sorting numeric data descending', function() {
                var a = [2, 3, 1];
                var sorter = Util.sortData(undefined, 'desc');
                a.sort(sorter);

                expect(a).toEqual([3, 2, 1]);
            });
            it('sorting string data', function() {
                var a = ['B', 'c', 'A'];
                var sorter = Util.sortData();
                a.sort(sorter);

                expect(a).toEqual(['A', 'B', 'c']);
            });
            it('sorting string data ascending', function() {
                var a = ['B', 'c', 'A'];
                var sorter = Util.sortData(undefined, 'asc');
                a.sort(sorter);

                expect(a).toEqual(['A', 'B', 'c']);
            });
            it('sorting string data descending', function() {
                var a = ['B', 'c', 'A'];
                var sorter = Util.sortData(undefined, 'desc');
                a.sort(sorter);

                expect(a).toEqual(['c', 'B', 'A']);
            });
            it('sorting objects', function() {
                var a = [{a: 'B'}, {a: 'c'}, {a: 'A'}];
                var sorter = Util.sortData('a');
                a.sort(sorter);

                expect(a).toEqual([{a:'A'}, {a:'B'}, {a:'c'}]);
            });
            it('sorting objects ascending', function() {
                var a = [{a: 'B'}, {a: 'c'}, {a: 'A'}];
                var sorter = Util.sortData('a', 'asc');
                a.sort(sorter);

                expect(a).toEqual([{a:'A'}, {a:'B'}, {a:'c'}]);
            });
            it('sorting objects descending', function() {
                var a = [{a: 'B'}, {a: 'c'}, {a: 'A'}];
                var sorter = Util.sortData('a', 'desc');
                a.sort(sorter);

                expect(a).toEqual([{a:'c'}, {a:'B'}, {a:'A'}]);
            });
        });
        describe('addTemplateToShadowDOM', function() {
            it('available', function() {
                expect(Util.addTemplateToShadowDOM).toBeDefined();
            });
            it('without parameters', function() {
                expect(function() {Util.addTemplateToShadowDOM();}).not.toThrow();
            });
        });
    });
    
    // *********************************************************************
    // * Class functions
    // *********************************************************************
    
    describe('Class functions', function() {
        describe('extending', function() {
            it('available', function() {
                expect(Util.extending).toBeDefined();
            });
            it('extending unknown class', function() {
                var B = function(options) {
                    this.fruit = 'banana';
                    this.size = 'big';
                };

                expect(function() {Util.extending(B, undefined);}).not.toThrow();
            });
            it('extending where the subclass is undefined class', function() {
                var A = function(options) {
                    this.fruit = 'apple';
                    this.color = 'red';
                    this.fine = options.fine;
                };

                expect(function() {Util.extending(undefined, A);}).not.toThrow();
            });
            it('extending A class', function() {
                var A = function(options) {
                    this.fruit = 'apple';
                    this.color = 'red';
                    this.fine = options.fine;
                };

                var B = function(options) {
                    A.call(this, options);
                    this.fruit = 'banana';
                    this.size = 'big';
                };

                Util.extending(B, A);    

                var a = new A({fine: true});
                var b = new B({fine: false});

                expect(A).toBeDefined();
                expect(B).toBeDefined();
                expect(a).toBeDefined();
                expect(b).toBeDefined();
                expect(a.fruit).toBe('apple');
                expect(a.color).toBe('red');
                expect(a.fine).toBe(true);
                expect(a.size).toBe(undefined);
                expect(b.fruit).toBe('banana');
                expect(b.color).toBe('red');
                expect(b.fine).toBe(false);
                expect(b.size).toBe('big');
            });
        });
    });    
});
