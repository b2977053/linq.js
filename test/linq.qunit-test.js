﻿/// <reference path="qunit.js"/>
/// <reference path="../linq.js" />
/// <reference path="../extensions/linq.qunit.js" />

module("linq.qunit");

test("primitive.is", function () {
    Math.pow(10, 2).is(100, "100!!!");
    var x = 1000;
    x.is(1000);
    "hoge".is("hoge");
    (10).is(10);

    (true).is(true);
    (false).is(false);

    // example

    Math.pow(10, 2).is(100); // strictEqual(Math.pow(10, 2), 100)

    Enumerable.rangeTo(10, 15, 2).is(10, 12, 14); // deepEqual(Enumerable.rangeTo(10, 15, 2).toArray(), [10, 12, 14])

    [1, 5, 10].all("$<12").isTrue(); // collection assertion with linq.js!
});

test("collection.is", function () {
    [1, 2, 3, 4, 5].is(1, 2, 3, 4, 5);
    [1, 2, 3, 4, 5].is([1, 2, 3, 4, 5]);
    [1, 2, 3, 4, 5].is([1, 2, 3, 4, 5], "Collection OK?");
    Enumerable.range(1, 10).is(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    Enumerable.range(5, 10).is(Enumerable.rangeTo(5, 14));
    Enumerable.range(5, 10).is(Enumerable.rangeTo(5, 14), "Enumerable OK?");
});

test("function.is", function () {
    var o = { a: "a", b: 100, c: true };
    o.is(function (x) { return x.a == "a" && x.b == 100 && x.c == true; });

    "foobar".is(function (x) { return x.toUpperCase() == "FOOBAR" });
});

test("function.expression", function () {

    Math.abs(-100).is(function (x) { return x < 200; });

    Math.abs(-100).isExpr("$ < 200");
});

test("primitive.isNot", function () {
    Math.pow(10, 2).isNot(1000, "must not be 100!!!");
    var x = 1000;
    x.isNot(10000);
    "hoge".isNot("hage", "hage is not!");
    (10).isNot(100);

    var o = { a: "a", b: 100, c: true };
    o.isNot({ a: "a", b: 100, c: true });

    (true).isNot(false);
    (false).isNot(true);
});

test("collection.isNot", function () {
    [1, 2, 3, 4, 5].isNot(1, 2, 3, 4);
    [1, 2, 3, 4, 5].isNot([1, 2, 3, 4]);
    [1, 2, 3, 4, 5].isNot([1, 2, 3, 5], "Collection OK?");
    Enumerable.range(1, 10).isNot(1, 2, 3, 4, 5, 6, 8, 9, 10);
    Enumerable.range(5, 10).isNot(Enumerable.rangeTo(5, 12));
    Enumerable.range(5, 10).isNot(Enumerable.rangeTo(5, 15), "Enumerable OK?");
});

test("function.isNot", function () {
    var o = { a: "a", b: 100, c: true };
    o.isNot(function (x) { return x.a == "a" && x.b == 1300 && x.c == true; });
    "foobar".isNot(function (x) { return x.toUpperCase() == "FOoBAR" });
});

test("isTrue", function () {
    (true).isTrue();
});

test("isFalse", function () {
    (false).isFalse();
});

test("catch", function () {
    Enumerable.Assert.expectError(function () {
        throw new Error("ERROOOOOR");
    });

    Enumerable.Assert.expectError(function () {
        throw new Error("ERROOOOOR");
    }, "error throw");


    Enumerable.Assert.doesNotThrow(function () {
        //
    });

    Enumerable.Assert.doesNotThrow(function () {
        //
    }, "does not");
});