(function (p) {
    var G, H, I, J, K, L, r = {}, u = {}, v = {}, M = {treeId: "", treeObj: null, view: {addDiyDom: null, autoCancelSelected: !0, dblClickExpand: !0, expandSpeed: "fast", fontCss: {}, nameIsHTML: !1, selectedMulti: !0, showIcon: !0, showLine: !0, showTitle: !0, txtSelectedEnable: !1}, data: {key: {children: "children", name: "name", title: "", url: "url"}, simpleData: {enable: !1, idKey: "id", pIdKey: "pId", rootPId: null}, keep: {parent: !1, leaf: !1}}, async: {enable: !1, contentType: "application/x-www-form-urlencoded", type: "post", dataType: "text", url: "", autoParam: [],
            otherParam: [], dataFilter: null}, callback: {beforeAsync: null, beforeClick: null, beforeDblClick: null, beforeRightClick: null, beforeMouseDown: null, beforeMouseUp: null, beforeExpand: null, beforeCollapse: null, beforeRemove: null, onAsyncError: null, onAsyncSuccess: null, onNodeCreated: null, onClick: null, onDblClick: null, onRightClick: null, onMouseDown: null, onMouseUp: null, onExpand: null, onCollapse: null, onRemove: null}}, w = [function (b) {
            var a = b.treeObj, c = e.event;
            a.bind(c.NODECREATED, function (a, c, g) {
                j.apply(b.callback.onNodeCreated,
                    [a, c, g])
            });
            a.bind(c.CLICK, function (a, c, g, l, h) {
                j.apply(b.callback.onClick, [c, g, l, h])
            });
            a.bind(c.EXPAND, function (a, c, g) {
                j.apply(b.callback.onExpand, [a, c, g])
            });
            a.bind(c.COLLAPSE, function (a, c, g) {
                j.apply(b.callback.onCollapse, [a, c, g])
            });
            a.bind(c.ASYNC_SUCCESS, function (a, c, g, l) {
                j.apply(b.callback.onAsyncSuccess, [a, c, g, l])
            });
            a.bind(c.ASYNC_ERROR, function (a, c, g, l, h, e) {
                j.apply(b.callback.onAsyncError, [a, c, g, l, h, e])
            })
        }], x = [function (b) {
            var a = e.event;
            b.treeObj.unbind(a.NODECREATED).unbind(a.CLICK).unbind(a.EXPAND).unbind(a.COLLAPSE).unbind(a.ASYNC_SUCCESS).unbind(a.ASYNC_ERROR)
        }],
        y = [function (b) {
            var a = h.getCache(b);
            a || (a = {}, h.setCache(b, a));
            a.nodes = [];
            a.doms = []
        }], z = [function (b, a, c, d, f, g) {
            if (c) {
                var l = h.getRoot(b), e = b.data.key.children;
                c.level = a;
                c.tId = b.treeId + "_" + ++l.zId;
                c.parentTId = d ? d.tId : null;
                c.open = typeof c.open == "string" ? j.eqs(c.open, "true") : !!c.open;
                c[e] && c[e].length > 0 ? (c.isParent = !0, c.zAsync = !0) : (c.isParent = typeof c.isParent == "string" ? j.eqs(c.isParent, "true") : !!c.isParent, c.open = c.isParent && !b.async.enable ? c.open : !1, c.zAsync = !c.isParent);
                c.isFirstNode = f;
                c.isLastNode =
                    g;
                c.getParentNode = function () {
                    return h.getNodeCache(b, c.parentTId)
                };
                c.getPreNode = function () {
                    return h.getPreNode(b, c)
                };
                c.getNextNode = function () {
                    return h.getNextNode(b, c)
                };
                c.isAjaxing = !1;
                h.fixPIdKeyValue(b, c)
            }
        }], s = [function (b) {
            var a = b.target, c = h.getSetting(b.data.treeId), d = "", f = null, g = "", l = "", i = null, n = null, k = null;
            if (j.eqs(b.type, "mousedown"))l = "mousedown"; else if (j.eqs(b.type, "mouseup"))l = "mouseup"; else if (j.eqs(b.type, "contextmenu"))l = "contextmenu"; else if (j.eqs(b.type, "click"))if (j.eqs(a.tagName, "span") &&
                a.getAttribute("treeNode" + e.id.SWITCH) !== null)d = j.getNodeMainDom(a).id, g = "switchNode"; else {
                if (k = j.getMDom(c, a, [
                        {tagName: "a", attrName: "treeNode" + e.id.A}
                    ]))d = j.getNodeMainDom(k).id, g = "clickNode"
            } else if (j.eqs(b.type, "dblclick") && (l = "dblclick", k = j.getMDom(c, a, [
                    {tagName: "a", attrName: "treeNode" + e.id.A}
                ])))d = j.getNodeMainDom(k).id, g = "switchNode";
            if (l.length > 0 && d.length == 0 && (k = j.getMDom(c, a, [
                    {tagName: "a", attrName: "treeNode" + e.id.A}
                ])))d = j.getNodeMainDom(k).id;
            if (d.length > 0)switch (f = h.getNodeCache(c, d), g) {
                case "switchNode":
                    f.isParent ?
                        j.eqs(b.type, "click") || j.eqs(b.type, "dblclick") && j.apply(c.view.dblClickExpand, [c.treeId, f], c.view.dblClickExpand) ? i = G : g = "" : g = "";
                    break;
                case "clickNode":
                    i = H
            }
            switch (l) {
                case "mousedown":
                    n = I;
                    break;
                case "mouseup":
                    n = J;
                    break;
                case "dblclick":
                    n = K;
                    break;
                case "contextmenu":
                    n = L
            }
            return{stop: !1, node: f, nodeEventType: g, nodeEventCallback: i, treeEventType: l, treeEventCallback: n}
        }], A = [function (b) {
            var a = h.getRoot(b);
            a || (a = {}, h.setRoot(b, a));
            a[b.data.key.children] = [];
            a.expandTriggerFlag = !1;
            a.curSelectedList = [];
            a.noSelection = !0;
            a.createdNodes = [];
            a.zId = 0;
            a._ver = (new Date).getTime()
        }], B = [], C = [], D = [], E = [], F = [], h = {addNodeCache: function (b, a) {
            h.getCache(b).nodes[h.getNodeCacheId(a.tId)] = a
        }, getNodeCacheId: function (b) {
            return b.substring(b.lastIndexOf("_") + 1)
        }, addAfterA: function (b) {
            C.push(b)
        }, addBeforeA: function (b) {
            B.push(b)
        }, addInnerAfterA: function (b) {
            E.push(b)
        }, addInnerBeforeA: function (b) {
            D.push(b)
        }, addInitBind: function (b) {
            w.push(b)
        }, addInitUnBind: function (b) {
            x.push(b)
        }, addInitCache: function (b) {
            y.push(b)
        }, addInitNode: function (b) {
            z.push(b)
        },
            addInitProxy: function (b, a) {
                a ? s.splice(0, 0, b) : s.push(b)
            }, addInitRoot: function (b) {
                A.push(b)
            }, addNodesData: function (b, a, c) {
                var d = b.data.key.children;
                a[d] || (a[d] = []);
                if (a[d].length > 0)a[d][a[d].length - 1].isLastNode = !1, i.setNodeLineIcos(b, a[d][a[d].length - 1]);
                a.isParent = !0;
                a[d] = a[d].concat(c)
            }, addSelectedNode: function (b, a) {
                var c = h.getRoot(b);
                h.isSelectedNode(b, a) || c.curSelectedList.push(a)
            }, addCreatedNode: function (b, a) {
                (b.callback.onNodeCreated || b.view.addDiyDom) && h.getRoot(b).createdNodes.push(a)
            }, addZTreeTools: function (b) {
                F.push(b)
            },
            exSetting: function (b) {
                p.extend(!0, M, b)
            }, fixPIdKeyValue: function (b, a) {
                b.data.simpleData.enable && (a[b.data.simpleData.pIdKey] = a.parentTId ? a.getParentNode()[b.data.simpleData.idKey] : b.data.simpleData.rootPId)
            }, getAfterA: function (b, a, c) {
                for (var d = 0, f = C.length; d < f; d++)C[d].apply(this, arguments)
            }, getBeforeA: function (b, a, c) {
                for (var d = 0, f = B.length; d < f; d++)B[d].apply(this, arguments)
            }, getInnerAfterA: function (b, a, c) {
                for (var d = 0, f = E.length; d < f; d++)E[d].apply(this, arguments)
            }, getInnerBeforeA: function (b, a, c) {
                for (var d =
                    0, f = D.length; d < f; d++)D[d].apply(this, arguments)
            }, getCache: function (b) {
                return v[b.treeId]
            }, getNextNode: function (b, a) {
                if (!a)return null;
                for (var c = b.data.key.children, d = a.parentTId ? a.getParentNode() : h.getRoot(b), f = 0, g = d[c].length - 1; f <= g; f++)if (d[c][f] === a)return f == g ? null : d[c][f + 1];
                return null
            }, getNodeByParam: function (b, a, c, d) {
                if (!a || !c)return null;
                for (var f = b.data.key.children, g = 0, l = a.length; g < l; g++) {
                    if (a[g][c] == d)return a[g];
                    var e = h.getNodeByParam(b, a[g][f], c, d);
                    if (e)return e
                }
                return null
            }, getNodeCache: function (b, a) {
                if (!a)return null;
                var c = v[b.treeId].nodes[h.getNodeCacheId(a)];
                return c ? c : null
            }, getNodeName: function (b, a) {
                return "" + a[b.data.key.name]
            }, getNodeTitle: function (b, a) {
                return "" + a[b.data.key.title === "" ? b.data.key.name : b.data.key.title]
            }, getNodes: function (b) {
                return h.getRoot(b)[b.data.key.children]
            }, getNodesByParam: function (b, a, c, d) {
                if (!a || !c)return [];
                for (var f = b.data.key.children, g = [], l = 0, e = a.length; l < e; l++)a[l][c] == d && g.push(a[l]), g = g.concat(h.getNodesByParam(b, a[l][f], c, d));
                return g
            }, getNodesByParamFuzzy: function (b, a, c, d) {
                if (!a || !c)return [];
                for (var f = b.data.key.children, g = [], d = d.toLowerCase(), l = 0, e = a.length; l < e; l++)typeof a[l][c] == "string" && a[l][c].toLowerCase().indexOf(d) > -1 && g.push(a[l]), g = g.concat(h.getNodesByParamFuzzy(b, a[l][f], c, d));
                return g
            }, getNodesByFilter: function (b, a, c, d, f) {
                if (!a)return d ? null : [];
                for (var g = b.data.key.children, e = d ? null : [], i = 0, n = a.length; i < n; i++) {
                    if (j.apply(c, [a[i], f], !1)) {
                        if (d)return a[i];
                        e.push(a[i])
                    }
                    var k = h.getNodesByFilter(b, a[i][g], c, d, f);
                    if (d && k)return k;
                    e = d ? k : e.concat(k)
                }
                return e
            },
            getPreNode: function (b, a) {
                if (!a)return null;
                for (var c = b.data.key.children, d = a.parentTId ? a.getParentNode() : h.getRoot(b), f = 0, g = d[c].length; f < g; f++)if (d[c][f] === a)return f == 0 ? null : d[c][f - 1];
                return null
            }, getRoot: function (b) {
                return b ? u[b.treeId] : null
            }, getRoots: function () {
                return u
            }, getSetting: function (b) {
                return r[b]
            }, getSettings: function () {
                return r
            }, getZTreeTools: function (b) {
                return (b = this.getRoot(this.getSetting(b))) ? b.treeTools : null
            }, initCache: function (b) {
                for (var a = 0, c = y.length; a < c; a++)y[a].apply(this,
                    arguments)
            }, initNode: function (b, a, c, d, f, g) {
                for (var e = 0, h = z.length; e < h; e++)z[e].apply(this, arguments)
            }, initRoot: function (b) {
                for (var a = 0, c = A.length; a < c; a++)A[a].apply(this, arguments)
            }, isSelectedNode: function (b, a) {
                for (var c = h.getRoot(b), d = 0, f = c.curSelectedList.length; d < f; d++)if (a === c.curSelectedList[d])return !0;
                return !1
            }, removeNodeCache: function (b, a) {
                var c = b.data.key.children;
                if (a[c])for (var d = 0, f = a[c].length; d < f; d++)arguments.callee(b, a[c][d]);
                h.getCache(b).nodes[h.getNodeCacheId(a.tId)] = null
            }, removeSelectedNode: function (b, a) {
                for (var c = h.getRoot(b), d = 0, f = c.curSelectedList.length; d < f; d++)if (a === c.curSelectedList[d] || !h.getNodeCache(b, c.curSelectedList[d].tId))c.curSelectedList.splice(d, 1), d--, f--
            }, setCache: function (b, a) {
                v[b.treeId] = a
            }, setRoot: function (b, a) {
                u[b.treeId] = a
            }, setZTreeTools: function (b, a) {
                for (var c = 0, d = F.length; c < d; c++)F[c].apply(this, arguments)
            }, transformToArrayFormat: function (b, a) {
                if (!a)return [];
                var c = b.data.key.children, d = [];
                if (j.isArray(a))for (var f = 0, g = a.length; f < g; f++)d.push(a[f]), a[f][c] && (d = d.concat(h.transformToArrayFormat(b,
                    a[f][c]))); else d.push(a), a[c] && (d = d.concat(h.transformToArrayFormat(b, a[c])));
                return d
            }, transformTozTreeFormat: function (b, a) {
                var c, d, f = b.data.simpleData.idKey, g = b.data.simpleData.pIdKey, e = b.data.key.children;
                if (!f || f == "" || !a)return [];
                if (j.isArray(a)) {
                    var h = [], i = [];
                    for (c = 0, d = a.length; c < d; c++)i[a[c][f]] = a[c];
                    for (c = 0, d = a.length; c < d; c++)i[a[c][g]] && a[c][f] != a[c][g] ? (i[a[c][g]][e] || (i[a[c][g]][e] = []), i[a[c][g]][e].push(a[c])) : h.push(a[c]);
                    return h
                } else return [a]
            }
        }, m = {
            bindEvent: function (b) {
                for (var a = 0,
                         c = w.length; a < c; a++)w[a].apply(this, arguments)
            }, unbindEvent: function (b) {
                for (var a = 0, c = x.length; a < c; a++)x[a].apply(this, arguments)
            }, bindTree: function (b) {
                var a = {treeId: b.treeId}, c = b.treeObj;
                b.view.txtSelectedEnable || c.bind("selectstart", function (a) {
                    a = a.originalEvent.srcElement.nodeName.toLowerCase();
                    return a === "input" || a === "textarea"
                }).css({"-moz-user-select": "-moz-none"});
                c.bind("click", a, m.proxy);
                c.bind("dblclick", a, m.proxy);
                c.bind("mouseover", a, m.proxy);
                c.bind("mouseout", a, m.proxy);
                c.bind("mousedown",
                    a, m.proxy);
                c.bind("mouseup", a, m.proxy);
                c.bind("contextmenu", a, m.proxy)
            }, unbindTree: function (b) {
                b.treeObj.unbind("click", m.proxy).unbind("dblclick", m.proxy).unbind("mouseover", m.proxy).unbind("mouseout", m.proxy).unbind("mousedown", m.proxy).unbind("mouseup", m.proxy).unbind("contextmenu", m.proxy)
            }, doProxy: function (b) {
                for (var a = [], c = 0, d = s.length; c < d; c++) {
                    var f = s[c].apply(this, arguments);
                    a.push(f);
                    if (f.stop)break
                }
                return a
            }, proxy: function (b) {
                var a = h.getSetting(b.data.treeId);
                if (!j.uCanDo(a, b))return !0;
                for (var a = m.doProxy(b), c = !0, d = 0, f = a.length; d < f; d++) {
                    var g = a[d];
                    g.nodeEventCallback && (c = g.nodeEventCallback.apply(g, [b, g.node]) && c);
                    g.treeEventCallback && (c = g.treeEventCallback.apply(g, [b, g.node]) && c)
                }
                return c
            }
        };
    G = function (b, a) {
        var c = h.getSetting(b.data.treeId);
        if (a.open) {
            if (j.apply(c.callback.beforeCollapse, [c.treeId, a], !0) == !1)return !0
        } else if (j.apply(c.callback.beforeExpand, [c.treeId, a], !0) == !1)return !0;
        h.getRoot(c).expandTriggerFlag = !0;
        i.switchNode(c, a);
        return !0
    };
    H = function (b, a) {
        var c = h.getSetting(b.data.treeId),
            d = c.view.autoCancelSelected && b.ctrlKey && h.isSelectedNode(c, a) ? 0 : c.view.autoCancelSelected && b.ctrlKey && c.view.selectedMulti ? 2 : 1;
        if (j.apply(c.callback.beforeClick, [c.treeId, a, d], !0) == !1)return !0;
        d === 0 ? i.cancelPreSelectedNode(c, a) : i.selectNode(c, a, d === 2);
        c.treeObj.trigger(e.event.CLICK, [b, c.treeId, a, d]);
        return !0
    };
    I = function (b, a) {
        var c = h.getSetting(b.data.treeId);
        j.apply(c.callback.beforeMouseDown, [c.treeId, a], !0) && j.apply(c.callback.onMouseDown, [b, c.treeId, a]);
        return !0
    };
    J = function (b, a) {
        var c = h.getSetting(b.data.treeId);
        j.apply(c.callback.beforeMouseUp, [c.treeId, a], !0) && j.apply(c.callback.onMouseUp, [b, c.treeId, a]);
        return !0
    };
    K = function (b, a) {
        var c = h.getSetting(b.data.treeId);
        j.apply(c.callback.beforeDblClick, [c.treeId, a], !0) && j.apply(c.callback.onDblClick, [b, c.treeId, a]);
        return !0
    };
    L = function (b, a) {
        var c = h.getSetting(b.data.treeId);
        j.apply(c.callback.beforeRightClick, [c.treeId, a], !0) && j.apply(c.callback.onRightClick, [b, c.treeId, a]);
        return typeof c.callback.onRightClick != "function"
    };
    var j = {
        apply: function (b, a, c) {
            return typeof b ==
            "function" ? b.apply(N, a ? a : []) : c
        }, canAsync: function (b, a) {
            var c = b.data.key.children;
            return b.async.enable && a && a.isParent && !(a.zAsync || a[c] && a[c].length > 0)
        }, clone: function (b) {
            if (b === null)return null;
            var a = j.isArray(b) ? [] : {}, c;
            for (c in b)a[c] = b[c]instanceof Date ? new Date(b[c].getTime()) : typeof b[c] === "object" ? arguments.callee(b[c]) : b[c];
            return a
        }, eqs: function (b, a) {
            return b.toLowerCase() === a.toLowerCase()
        }, isArray: function (b) {
            return Object.prototype.toString.apply(b) === "[object Array]"
        }, $: function (b, a, c) {
            a && typeof a != "string" && (c = a, a = "");
            return typeof b == "string" ? p(b, c ? c.treeObj.get(0).ownerDocument : null) : p("#" + b.tId + a, c ? c.treeObj : null)
        }, getMDom: function (b, a, c) {
            if (!a)return null;
            for (; a && a.id !== b.treeId;) {
                for (var d = 0, f = c.length; a.tagName && d < f; d++)if (j.eqs(a.tagName, c[d].tagName) && a.getAttribute(c[d].attrName) !== null)return a;
                a = a.parentNode
            }
            return null
        }, getNodeMainDom: function (b) {
            return p(b).parent("li").get(0) || p(b).parentsUntil("li").parent().get(0)
        }, isChildOrSelf: function (b, a) {
            return p(b).closest("#" +
                a).length > 0
        }, uCanDo: function () {
            return !0
        }
    }, i = {
        addNodes: function (b, a, c, d) {
            if (!b.data.keep.leaf || !a || a.isParent)if (j.isArray(c) || (c = [c]), b.data.simpleData.enable && (c = h.transformTozTreeFormat(b, c)), a) {
                var f = k(a, e.id.SWITCH, b), g = k(a, e.id.ICON, b), l = k(a, e.id.UL, b);
                if (!a.open)i.replaceSwitchClass(a, f, e.folder.CLOSE), i.replaceIcoClass(a, g, e.folder.CLOSE), a.open = !1, l.css({display: "none"});
                h.addNodesData(b, a, c);
                i.createNodes(b, a.level + 1, c, a);
                d || i.expandCollapseParentNode(b, a, !0)
            } else h.addNodesData(b, h.getRoot(b),
                c), i.createNodes(b, 0, c, null)
        }, appendNodes: function (b, a, c, d, f, g) {
            if (!c)return [];
            for (var e = [], j = b.data.key.children, k = 0, m = c.length; k < m; k++) {
                var o = c[k];
                if (f) {
                    var t = (d ? d : h.getRoot(b))[j].length == c.length && k == 0;
                    h.initNode(b, a, o, d, t, k == c.length - 1, g);
                    h.addNodeCache(b, o)
                }
                t = [];
                o[j] && o[j].length > 0 && (t = i.appendNodes(b, a + 1, o[j], o, f, g && o.open));
                g && (i.makeDOMNodeMainBefore(e, b, o), i.makeDOMNodeLine(e, b, o), h.getBeforeA(b, o, e), i.makeDOMNodeNameBefore(e, b, o), h.getInnerBeforeA(b, o, e), i.makeDOMNodeIcon(e, b, o), h.getInnerAfterA(b,
                    o, e), i.makeDOMNodeNameAfter(e, b, o), h.getAfterA(b, o, e), o.isParent && o.open && i.makeUlHtml(b, o, e, t.join("")), i.makeDOMNodeMainAfter(e, b, o), h.addCreatedNode(b, o))
            }
            return e
        }, appendParentULDom: function (b, a) {
            var c = [], d = k(a, b);
            !d.get(0) && a.parentTId && (i.appendParentULDom(b, a.getParentNode()), d = k(a, b));
            var f = k(a, e.id.UL, b);
            f.get(0) && f.remove();
            f = i.appendNodes(b, a.level + 1, a[b.data.key.children], a, !1, !0);
            i.makeUlHtml(b, a, c, f.join(""));
            d.append(c.join(""))
        }, asyncNode: function (b, a, c, d) {
            var f, g;
            if (a && !a.isParent)return j.apply(d),
                !1; else if (a && a.isAjaxing)return !1; else if (j.apply(b.callback.beforeAsync, [b.treeId, a], !0) == !1)return j.apply(d), !1;
            if (a)a.isAjaxing = !0, k(a, e.id.ICON, b).attr({
                style: "",
                "class": e.className.BUTTON + " " + e.className.ICO_LOADING
            });
            var l = {};
            for (f = 0, g = b.async.autoParam.length; a && f < g; f++) {
                var q = b.async.autoParam[f].split("="), n = q;
                q.length > 1 && (n = q[1], q = q[0]);
                l[n] = a[q]
            }
            if (j.isArray(b.async.otherParam))for (f = 0, g = b.async.otherParam.length; f < g; f += 2)l[b.async.otherParam[f]] = b.async.otherParam[f + 1]; else for (var m in b.async.otherParam)l[m] =
                b.async.otherParam[m];
            var o = h.getRoot(b)._ver;
            p.ajax({
                contentType: b.async.contentType,
                type: b.async.type,
                url: j.apply(b.async.url, [b.treeId, a], b.async.url),
                data: l,
                dataType: b.async.dataType,
                success: function (f) {
                    if (o == h.getRoot(b)._ver) {
                        var g = [];
                        try {
                            g = !f || f.length == 0 ? [] : typeof f == "string" ? eval("(" + f + ")") : f
                        } catch (l) {
                            g = f
                        }
                        if (a)a.isAjaxing = null, a.zAsync = !0;
                        i.setNodeLineIcos(b, a);
                        g && g !== "" ? (g = j.apply(b.async.dataFilter, [b.treeId, a, g], g), i.addNodes(b, a, g ? j.clone(g) : [], !!c)) : i.addNodes(b, a, [], !!c);
                        b.treeObj.trigger(e.event.ASYNC_SUCCESS,
                            [b.treeId, a, f]);
                        j.apply(d)
                    }
                },
                error: function (c, d, f) {
                    if (o == h.getRoot(b)._ver) {
                        if (a)a.isAjaxing = null;
                        i.setNodeLineIcos(b, a);
                        b.treeObj.trigger(e.event.ASYNC_ERROR, [b.treeId, a, c, d, f])
                    }
                }
            });
            return !0
        }, cancelPreSelectedNode: function (b, a) {
            for (var c = h.getRoot(b).curSelectedList, d = c.length - 1; d >= 0; d--)if (!a || a === c[d])if (k(c[d], e.id.A, b).removeClass(e.node.CURSELECTED), a) {
                h.removeSelectedNode(b, a);
                break
            }
            if (!a)h.getRoot(b).curSelectedList = []
        }, createNodeCallback: function (b) {
            if (b.callback.onNodeCreated || b.view.addDiyDom)for (var a =
                h.getRoot(b); a.createdNodes.length > 0;) {
                var c = a.createdNodes.shift();
                j.apply(b.view.addDiyDom, [b.treeId, c]);
                b.callback.onNodeCreated && b.treeObj.trigger(e.event.NODECREATED, [b.treeId, c])
            }
        }, createNodes: function (b, a, c, d) {
            if (c && c.length != 0) {
                var f = h.getRoot(b), g = b.data.key.children, g = !d || d.open || !!k(d[g][0], b).get(0);
                f.createdNodes = [];
                a = i.appendNodes(b, a, c, d, !0, g);
                d ? (d = k(d, e.id.UL, b), d.get(0) && d.append(a.join(""))) : b.treeObj.append(a.join(""));
                i.createNodeCallback(b)
            }
        }, destroy: function (b) {
            b && (h.initCache(b),
                h.initRoot(b), m.unbindTree(b), m.unbindEvent(b), b.treeObj.empty())
        }, expandCollapseNode: function (b, a, c, d, f) {
            var g = h.getRoot(b), l = b.data.key.children;
            if (a) {
                if (g.expandTriggerFlag) {
                    var q = f, f = function () {
                        q && q();
                        a.open ? b.treeObj.trigger(e.event.EXPAND, [b.treeId, a]) : b.treeObj.trigger(e.event.COLLAPSE, [b.treeId, a])
                    };
                    g.expandTriggerFlag = !1
                }
                if (!a.open && a.isParent && (!k(a, e.id.UL, b).get(0) || a[l] && a[l].length > 0 && !k(a[l][0], b).get(0)))i.appendParentULDom(b, a), i.createNodeCallback(b);
                if (a.open == c)j.apply(f, []); else {
                    var c =
                        k(a, e.id.UL, b), g = k(a, e.id.SWITCH, b), n = k(a, e.id.ICON, b);
                    a.isParent ? (a.open = !a.open, a.iconOpen && a.iconClose && n.attr("style", i.makeNodeIcoStyle(b, a)), a.open ? (i.replaceSwitchClass(a, g, e.folder.OPEN), i.replaceIcoClass(a, n, e.folder.OPEN), d == !1 || b.view.expandSpeed == "" ? (c.show(), j.apply(f, [])) : a[l] && a[l].length > 0 ? c.slideDown(b.view.expandSpeed, f) : (c.show(), j.apply(f, []))) : (i.replaceSwitchClass(a, g, e.folder.CLOSE), i.replaceIcoClass(a, n, e.folder.CLOSE), d == !1 || b.view.expandSpeed == "" || !(a[l] && a[l].length > 0) ?
                        (c.hide(), j.apply(f, [])) : c.slideUp(b.view.expandSpeed, f))) : j.apply(f, [])
                }
            } else j.apply(f, [])
        }, expandCollapseParentNode: function (b, a, c, d, f) {
            a && (a.parentTId ? (i.expandCollapseNode(b, a, c, d), a.parentTId && i.expandCollapseParentNode(b, a.getParentNode(), c, d, f)) : i.expandCollapseNode(b, a, c, d, f))
        }, expandCollapseSonNode: function (b, a, c, d, f) {
            var g = h.getRoot(b), e = b.data.key.children, g = a ? a[e] : g[e], e = a ? !1 : d, j = h.getRoot(b).expandTriggerFlag;
            h.getRoot(b).expandTriggerFlag = !1;
            if (g)for (var k = 0, m = g.length; k < m; k++)g[k] &&
            i.expandCollapseSonNode(b, g[k], c, e);
            h.getRoot(b).expandTriggerFlag = j;
            i.expandCollapseNode(b, a, c, d, f)
        }, makeDOMNodeIcon: function (b, a, c) {
            var d = h.getNodeName(a, c), d = a.view.nameIsHTML ? d : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            b.push("<span id='", c.tId, e.id.ICON, "' title='' treeNode", e.id.ICON, " class='", i.makeNodeIcoClass(a, c), "' style='", i.makeNodeIcoStyle(a, c), "'></span><span id='", c.tId, e.id.SPAN, "'>", d, "</span>")
        }, makeDOMNodeLine: function (b, a, c) {
            b.push("<span id='", c.tId,
                e.id.SWITCH, "' title='' class='", i.makeNodeLineClass(a, c), "' treeNode", e.id.SWITCH, "></span>")
        }, makeDOMNodeMainAfter: function (b) {
            b.push("</li>")
        }, makeDOMNodeMainBefore: function (b, a, c) {
            b.push("<li id='", c.tId, "' class='", e.className.LEVEL, c.level, "' tabindex='0' hidefocus='true' treenode>")
        }, makeDOMNodeNameAfter: function (b) {
            b.push("</a>")
        }, makeDOMNodeNameBefore: function (b, a, c) {
            var d = h.getNodeTitle(a, c), f = i.makeNodeUrl(a, c), g = i.makeNodeFontCss(a, c), l = [], k;
            for (k in g)l.push(k, ":", g[k], ";");
            b.push("<a id='",
                c.tId, e.id.A, "' class='", e.className.LEVEL, c.level, "' treeNode", e.id.A, ' onclick="', c.click || "", '" ', f != null && f.length > 0 ? "href='" + f + "'" : "", " target='", i.makeNodeTarget(c), "' style='", l.join(""), "'");
            j.apply(a.view.showTitle, [a.treeId, c], a.view.showTitle) && d && b.push("title='", d.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'");
            b.push(">")
        }, makeNodeFontCss: function (b, a) {
            var c = j.apply(b.view.fontCss, [b.treeId, a], b.view.fontCss);
            return c && typeof c != "function" ? c : {}
        }, makeNodeIcoClass: function (b, a) {
            var c = ["ico"];
            a.isAjaxing || (c[0] = (a.iconSkin ? a.iconSkin + "_" : "") + c[0], a.isParent ? c.push(a.open ? e.folder.OPEN : e.folder.CLOSE) : c.push(e.folder.DOCU));
            return e.className.BUTTON + " " + c.join("_")
        }, makeNodeIcoStyle: function (b, a) {
            var c = [];
            if (!a.isAjaxing) {
                var d = a.isParent && a.iconOpen && a.iconClose ? a.open ? a.iconOpen : a.iconClose : a.icon;
                d && c.push("background:url(", d, ") 0 0 no-repeat;");
                (b.view.showIcon == !1 || !j.apply(b.view.showIcon, [b.treeId, a], !0)) && c.push("width:0px;height:0px;")
            }
            return c.join("")
        }, makeNodeLineClass: function (b, a) {
            var c = [];
            b.view.showLine ? a.level == 0 && a.isFirstNode && a.isLastNode ? c.push(e.line.ROOT) : a.level == 0 && a.isFirstNode ? c.push(e.line.ROOTS) : a.isLastNode ? c.push(e.line.BOTTOM) : c.push(e.line.CENTER) : c.push(e.line.NOLINE);
            a.isParent ? c.push(a.open ? e.folder.OPEN : e.folder.CLOSE) : c.push(e.folder.DOCU);
            return i.makeNodeLineClassEx(a) + c.join("_")
        }, makeNodeLineClassEx: function (b) {
            return e.className.BUTTON + " " + e.className.LEVEL + b.level + " " + e.className.SWITCH + " "
        }, makeNodeTarget: function (b) {
            return b.target || "_blank"
        },
        makeNodeUrl: function (b, a) {
            var c = b.data.key.url;
            return a[c] ? a[c] : null
        }, makeUlHtml: function (b, a, c, d) {
            c.push("<ul id='", a.tId, e.id.UL, "' class='", e.className.LEVEL, a.level, " ", i.makeUlLineClass(b, a), "' style='display:", a.open ? "block" : "none", "'>");
            c.push(d);
            c.push("</ul>")
        }, makeUlLineClass: function (b, a) {
            return b.view.showLine && !a.isLastNode ? e.line.LINE : ""
        }, removeChildNodes: function (b, a) {
            if (a) {
                var c = b.data.key.children, d = a[c];
                if (d) {
                    for (var f = 0, g = d.length; f < g; f++)h.removeNodeCache(b, d[f]);
                    h.removeSelectedNode(b);
                    delete a[c];
                    b.data.keep.parent ? k(a, e.id.UL, b).empty() : (a.isParent = !1, a.open = !1, c = k(a, e.id.SWITCH, b), d = k(a, e.id.ICON, b), i.replaceSwitchClass(a, c, e.folder.DOCU), i.replaceIcoClass(a, d, e.folder.DOCU), k(a, e.id.UL, b).remove())
                }
            }
        }, setFirstNode: function (b, a) {
            var c = b.data.key.children;
            if (a[c].length > 0)a[c][0].isFirstNode = !0
        }, setLastNode: function (b, a) {
            var c = b.data.key.children, d = a[c].length;
            if (d > 0)a[c][d - 1].isLastNode = !0
        }, removeNode: function (b, a) {
            var c = h.getRoot(b), d = b.data.key.children, f = a.parentTId ? a.getParentNode() :
                c;
            a.isFirstNode = !1;
            a.isLastNode = !1;
            a.getPreNode = function () {
                return null
            };
            a.getNextNode = function () {
                return null
            };
            if (h.getNodeCache(b, a.tId)) {
                k(a, b).remove();
                h.removeNodeCache(b, a);
                h.removeSelectedNode(b, a);
                for (var g = 0, l = f[d].length; g < l; g++)if (f[d][g].tId == a.tId) {
                    f[d].splice(g, 1);
                    break
                }
                i.setFirstNode(b, f);
                i.setLastNode(b, f);
                var j, g = f[d].length;
                if (!b.data.keep.parent && g == 0)f.isParent = !1, f.open = !1, g = k(f, e.id.UL, b), l = k(f, e.id.SWITCH, b), j = k(f, e.id.ICON, b), i.replaceSwitchClass(f, l, e.folder.DOCU), i.replaceIcoClass(f,
                    j, e.folder.DOCU), g.css("display", "none"); else if (b.view.showLine && g > 0) {
                    var n = f[d][g - 1], g = k(n, e.id.UL, b), l = k(n, e.id.SWITCH, b);
                    j = k(n, e.id.ICON, b);
                    f == c ? f[d].length == 1 ? i.replaceSwitchClass(n, l, e.line.ROOT) : (c = k(f[d][0], e.id.SWITCH, b), i.replaceSwitchClass(f[d][0], c, e.line.ROOTS), i.replaceSwitchClass(n, l, e.line.BOTTOM)) : i.replaceSwitchClass(n, l, e.line.BOTTOM);
                    g.removeClass(e.line.LINE)
                }
            }
        }, replaceIcoClass: function (b, a, c) {
            if (a && !b.isAjaxing && (b = a.attr("class"), b != void 0)) {
                b = b.split("_");
                switch (c) {
                    case e.folder.OPEN:
                    case e.folder.CLOSE:
                    case e.folder.DOCU:
                        b[b.length -
                        1] = c
                }
                a.attr("class", b.join("_"))
            }
        }, replaceSwitchClass: function (b, a, c) {
            if (a) {
                var d = a.attr("class");
                if (d != void 0) {
                    d = d.split("_");
                    switch (c) {
                        case e.line.ROOT:
                        case e.line.ROOTS:
                        case e.line.CENTER:
                        case e.line.BOTTOM:
                        case e.line.NOLINE:
                            d[0] = i.makeNodeLineClassEx(b) + c;
                            break;
                        case e.folder.OPEN:
                        case e.folder.CLOSE:
                        case e.folder.DOCU:
                            d[1] = c
                    }
                    a.attr("class", d.join("_"));
                    c !== e.folder.DOCU ? a.removeAttr("disabled") : a.attr("disabled", "disabled")
                }
            }
        }, selectNode: function (b, a, c) {
            c || i.cancelPreSelectedNode(b);
            k(a, e.id.A,
                b).addClass(e.node.CURSELECTED);
            h.addSelectedNode(b, a)
        }, setNodeFontCss: function (b, a) {
            var c = k(a, e.id.A, b), d = i.makeNodeFontCss(b, a);
            d && c.css(d)
        }, setNodeLineIcos: function (b, a) {
            if (a) {
                var c = k(a, e.id.SWITCH, b), d = k(a, e.id.UL, b), f = k(a, e.id.ICON, b), g = i.makeUlLineClass(b, a);
                g.length == 0 ? d.removeClass(e.line.LINE) : d.addClass(g);
                c.attr("class", i.makeNodeLineClass(b, a));
                a.isParent ? c.removeAttr("disabled") : c.attr("disabled", "disabled");
                f.removeAttr("style");
                f.attr("style", i.makeNodeIcoStyle(b, a));
                f.attr("class",
                    i.makeNodeIcoClass(b, a))
            }
        }, setNodeName: function (b, a) {
            var c = h.getNodeTitle(b, a), d = k(a, e.id.SPAN, b);
            d.empty();
            b.view.nameIsHTML ? d.html(h.getNodeName(b, a)) : d.text(h.getNodeName(b, a));
            j.apply(b.view.showTitle, [b.treeId, a], b.view.showTitle) && k(a, e.id.A, b).attr("title", !c ? "" : c)
        }, setNodeTarget: function (b, a) {
            k(a, e.id.A, b).attr("target", i.makeNodeTarget(a))
        }, setNodeUrl: function (b, a) {
            var c = k(a, e.id.A, b), d = i.makeNodeUrl(b, a);
            d == null || d.length == 0 ? c.removeAttr("href") : c.attr("href", d)
        }, switchNode: function (b, a) {
            a.open || !j.canAsync(b, a) ? i.expandCollapseNode(b, a, !a.open) : b.async.enable ? i.asyncNode(b, a) || i.expandCollapseNode(b, a, !a.open) : a && i.expandCollapseNode(b, a, !a.open)
        }};
    p.fn.zTree = {consts: {className: {BUTTON: "button", LEVEL: "level", ICO_LOADING: "ico_loading", SWITCH: "switch"}, event: {NODECREATED: "ztree_nodeCreated", CLICK: "ztree_click", EXPAND: "ztree_expand", COLLAPSE: "ztree_collapse", ASYNC_SUCCESS: "ztree_async_success", ASYNC_ERROR: "ztree_async_error"}, id: {A: "_a", ICON: "_ico", SPAN: "_span", SWITCH: "_switch", UL: "_ul"}, line: {ROOT: "root",
        ROOTS: "roots", CENTER: "center", BOTTOM: "bottom", NOLINE: "noline", LINE: "line"}, folder: {OPEN: "open", CLOSE: "close", DOCU: "docu"}, node: {CURSELECTED: "curSelectedNode"}}, _z: {tools: j, view: i, event: m, data: h}, getZTreeObj: function (b) {
        return(b = h.getZTreeTools(b)) ? b : null
    }, destroy: function (b) {
        if (b && b.length > 0)i.destroy(h.getSetting(b)); else for (var a in r)i.destroy(r[a])
    }, init: function (b, a, c) {
        var d = j.clone(M);
        p.extend(!0, d, a);
        d.treeId = b.attr("id");
        d.treeObj = b;
        d.treeObj.empty();
        r[d.treeId] = d;
        if (typeof document.body.style.maxHeight ===
            "undefined")d.view.expandSpeed = "";
        h.initRoot(d);
        b = h.getRoot(d);
        a = d.data.key.children;
        c = c ? j.clone(j.isArray(c) ? c : [c]) : [];
        b[a] = d.data.simpleData.enable ? h.transformTozTreeFormat(d, c) : c;
        h.initCache(d);
        m.unbindTree(d);
        m.bindTree(d);
        m.unbindEvent(d);
        m.bindEvent(d);
        c = {setting: d, addNodes: function (a, b, c) {
            function e() {
                i.addNodes(d, a, h, c == !0)
            }

            if (!b)return null;
            a || (a = null);
            if (a && !a.isParent && d.data.keep.leaf)return null;
            var h = j.clone(j.isArray(b) ? b : [b]);
            j.canAsync(d, a) ? i.asyncNode(d, a, c, e) : e();
            return h
        }, cancelSelectedNode: function (a) {
            i.cancelPreSelectedNode(d,
                a)
        }, destroy: function () {
            i.destroy(d)
        }, expandAll: function (a) {
            a = !!a;
            i.expandCollapseSonNode(d, null, a, !0);
            return a
        }, expandNode: function (a, b, c, e, n) {
            if (!a || !a.isParent)return null;
            b !== !0 && b !== !1 && (b = !a.open);
            if ((n = !!n) && b && j.apply(d.callback.beforeExpand, [d.treeId, a], !0) == !1)return null; else if (n && !b && j.apply(d.callback.beforeCollapse, [d.treeId, a], !0) == !1)return null;
            b && a.parentTId && i.expandCollapseParentNode(d, a.getParentNode(), b, !1);
            if (b === a.open && !c)return null;
            h.getRoot(d).expandTriggerFlag = n;
            if (!j.canAsync(d,
                    a) && c)i.expandCollapseSonNode(d, a, b, !0, function () {
                if (e !== !1)try {
                    k(a, d).focus().blur()
                } catch (b) {
                }
            }); else if (a.open = !b, i.switchNode(this.setting, a), e !== !1)try {
                k(a, d).focus().blur()
            } catch (m) {
            }
            return b
        }, getNodes: function () {
            return h.getNodes(d)
        }, getNodeByParam: function (a, b, c) {
            return!a ? null : h.getNodeByParam(d, c ? c[d.data.key.children] : h.getNodes(d), a, b)
        }, getNodeByTId: function (a) {
            return h.getNodeCache(d, a)
        }, getNodesByParam: function (a, b, c) {
            return !a ? null : h.getNodesByParam(d, c ? c[d.data.key.children] : h.getNodes(d),
                a, b)
        }, getNodesByParamFuzzy: function (a, b, c) {
            return !a ? null : h.getNodesByParamFuzzy(d, c ? c[d.data.key.children] : h.getNodes(d), a, b)
        }, getNodesByFilter: function (a, b, c, e) {
            b = !!b;
            return !a || typeof a != "function" ? b ? null : [] : h.getNodesByFilter(d, c ? c[d.data.key.children] : h.getNodes(d), a, b, e)
        }, getNodeIndex: function (a) {
            if (!a)return null;
            for (var b = d.data.key.children, c = a.parentTId ? a.getParentNode() : h.getRoot(d), e = 0, i = c[b].length; e < i; e++)if (c[b][e] == a)return e;
            return -1
        }, getSelectedNodes: function () {
            for (var a = [], b = h.getRoot(d).curSelectedList,
                     c = 0, e = b.length; c < e; c++)a.push(b[c]);
            return a
        }, isSelectedNode: function (a) {
            return h.isSelectedNode(d, a)
        }, reAsyncChildNodes: function (a, b, c) {
            if (this.setting.async.enable) {
                var j = !a;
                j && (a = h.getRoot(d));
                if (b == "refresh") {
                    for (var b = this.setting.data.key.children, m = 0, p = a[b] ? a[b].length : 0; m < p; m++)h.removeNodeCache(d, a[b][m]);
                    h.removeSelectedNode(d);
                    a[b] = [];
                    j ? this.setting.treeObj.empty() : k(a, e.id.UL, d).empty()
                }
                i.asyncNode(this.setting, j ? null : a, !!c)
            }
        }, refresh: function () {
            this.setting.treeObj.empty();
            var a = h.getRoot(d),
                b = a[d.data.key.children];
            h.initRoot(d);
            a[d.data.key.children] = b;
            h.initCache(d);
            i.createNodes(d, 0, a[d.data.key.children])
        }, removeChildNodes: function (a) {
            if (!a)return null;
            var b = a[d.data.key.children];
            i.removeChildNodes(d, a);
            return b ? b : null
        }, removeNode: function (a, b) {
            a && (b = !!b, b && j.apply(d.callback.beforeRemove, [d.treeId, a], !0) == !1 || (i.removeNode(d, a), b && this.setting.treeObj.trigger(e.event.REMOVE, [d.treeId, a])))
        }, selectNode: function (a, b) {
            if (a && j.uCanDo(d)) {
                b = d.view.selectedMulti && b;
                if (a.parentTId)i.expandCollapseParentNode(d,
                    a.getParentNode(), !0, !1, function () {
                        try {
                            k(a, d).focus().blur()
                        } catch (b) {
                        }
                    }); else try {
                    k(a, d).focus().blur()
                } catch (c) {
                }
                i.selectNode(d, a, b)
            }
        }, transformTozTreeNodes: function (a) {
            return h.transformTozTreeFormat(d, a)
        }, transformToArray: function (a) {
            return h.transformToArrayFormat(d, a)
        }, updateNode: function (a) {
            a && k(a, d).get(0) && j.uCanDo(d) && (i.setNodeName(d, a), i.setNodeTarget(d, a), i.setNodeUrl(d, a), i.setNodeLineIcos(d, a), i.setNodeFontCss(d, a))
        }
        };
        b.treeTools = c;
        h.setZTreeTools(d, c);
        b[a] && b[a].length > 0 ? i.createNodes(d,
            0, b[a]) : d.async.enable && d.async.url && d.async.url !== "" && i.asyncNode(d);
        return c
    }
    };
    var N = p.fn.zTree, k = j.$, e = N.consts
})(jQuery);

// ztree-excheck.min.js
(function (m) {
    var p, q, r, o = {event: {CHECK: "ztree_check"}, id: {CHECK: "_check"}, checkbox: {STYLE: "checkbox", DEFAULT: "chk", DISABLED: "disable", FALSE: "false", TRUE: "true", FULL: "full", PART: "part", FOCUS: "focus"}, radio: {STYLE: "radio", TYPE_ALL: "all", TYPE_LEVEL: "level"}}, v = {check: {enable: !1, autoCheckTrigger: !1, chkStyle: o.checkbox.STYLE, nocheckInherit: !1, chkDisabledInherit: !1, radioType: o.radio.TYPE_LEVEL, chkboxType: {Y: "ps", N: "ps"}}, data: {key: {checked: "checked"}}, callback: {beforeCheck: null, onCheck: null}};
    p = function (b, a) {
        if (a.chkDisabled === !0)return!1;
        var c = f.getSetting(b.data.treeId), d = c.data.key.checked;
        if (k.apply(c.callback.beforeCheck, [c.treeId, a], !0) == !1)return!0;
        a[d] = !a[d];
        e.checkNodeRelation(c, a);
        d = n(a, j.id.CHECK, c);
        e.setChkClass(c, d, a);
        e.repairParentChkClassWithSelf(c, a);
        c.treeObj.trigger(j.event.CHECK, [b, c.treeId, a]);
        return !0
    };
    q = function (b, a) {
        if (a.chkDisabled === !0)return !1;
        var c = f.getSetting(b.data.treeId), d = n(a, j.id.CHECK, c);
        a.check_Focus = !0;
        e.setChkClass(c, d, a);
        return !0
    };
    r = function (b, a) {
        if (a.chkDisabled === !0)return !1;
        var c = f.getSetting(b.data.treeId), d = n(a, j.id.CHECK, c);
        a.check_Focus = !1;
        e.setChkClass(c, d, a);
        return!0
    };
    m.extend(!0, m.fn.zTree.consts, o);
    m.extend(!0, m.fn.zTree._z, {tools: {}, view: {checkNodeRelation: function (b, a) {
        var c, d, h, i = b.data.key.children, l = b.data.key.checked;
        c = j.radio;
        if (b.check.chkStyle == c.STYLE) {
            var g = f.getRadioCheckedList(b);
            if (a[l])if (b.check.radioType == c.TYPE_ALL) {
                for (d = g.length - 1; d >= 0; d--)c = g[d], c[l] = !1, g.splice(d, 1), e.setChkClass(b, n(c, j.id.CHECK, b), c), c.parentTId != a.parentTId &&
                e.repairParentChkClassWithSelf(b, c);
                g.push(a)
            } else {
                g = a.parentTId ? a.getParentNode() : f.getRoot(b);
                for (d = 0, h = g[i].length; d < h; d++)c = g[i][d], c[l] && c != a && (c[l] = !1, e.setChkClass(b, n(c, j.id.CHECK, b), c))
            } else if (b.check.radioType == c.TYPE_ALL)for (d = 0, h = g.length; d < h; d++)if (a == g[d]) {
                g.splice(d, 1);
                break
            }
        } else a[l] && (!a[i] || a[i].length == 0 || b.check.chkboxType.Y.indexOf("s") > -1) && e.setSonNodeCheckBox(b, a, !0), !a[l] && (!a[i] || a[i].length == 0 || b.check.chkboxType.N.indexOf("s") > -1) && e.setSonNodeCheckBox(b, a, !1), a[l] &&
        b.check.chkboxType.Y.indexOf("p") > -1 && e.setParentNodeCheckBox(b, a, !0), !a[l] && b.check.chkboxType.N.indexOf("p") > -1 && e.setParentNodeCheckBox(b, a, !1)
    }, makeChkClass: function (b, a) {
        var c = b.data.key.checked, d = j.checkbox, h = j.radio, i = "", i = a.chkDisabled === !0 ? d.DISABLED : a.halfCheck ? d.PART : b.check.chkStyle == h.STYLE ? a.check_Child_State < 1 ? d.FULL : d.PART : a[c] ? a.check_Child_State === 2 || a.check_Child_State === -1 ? d.FULL : d.PART : a.check_Child_State < 1 ? d.FULL : d.PART, c = b.check.chkStyle + "_" + (a[c] ? d.TRUE : d.FALSE) + "_" + i, c = a.check_Focus &&
        a.chkDisabled !== !0 ? c + "_" + d.FOCUS : c;
        return j.className.BUTTON + " " + d.DEFAULT + " " + c
    }, repairAllChk: function (b, a) {
        if (b.check.enable && b.check.chkStyle === j.checkbox.STYLE)for (var c = b.data.key.checked, d = b.data.key.children, h = f.getRoot(b), i = 0, l = h[d].length; i < l; i++) {
            var g = h[d][i];
            g.nocheck !== !0 && g.chkDisabled !== !0 && (g[c] = a);
            e.setSonNodeCheckBox(b, g, a)
        }
    }, repairChkClass: function (b, a) {
        if (a && (f.makeChkFlag(b, a), a.nocheck !== !0)) {
            var c = n(a, j.id.CHECK, b);
            e.setChkClass(b, c, a)
        }
    }, repairParentChkClass: function (b, a) {
        if (a &&
            a.parentTId) {
            var c = a.getParentNode();
            e.repairChkClass(b, c);
            e.repairParentChkClass(b, c)
        }
    }, repairParentChkClassWithSelf: function (b, a) {
        if (a) {
            var c = b.data.key.children;
            a[c] && a[c].length > 0 ? e.repairParentChkClass(b, a[c][0]) : e.repairParentChkClass(b, a)
        }
    }, repairSonChkDisabled: function (b, a, c, d) {
        if (a) {
            var h = b.data.key.children;
            if (a.chkDisabled != c)a.chkDisabled = c;
            e.repairChkClass(b, a);
            if (a[h] && d)for (var i = 0, l = a[h].length; i < l; i++)e.repairSonChkDisabled(b, a[h][i], c, d)
        }
    }, repairParentChkDisabled: function (b, a, c, d) {
        if (a) {
            if (a.chkDisabled != c && d)a.chkDisabled = c;
            e.repairChkClass(b, a);
            e.repairParentChkDisabled(b, a.getParentNode(), c, d)
        }
    }, setChkClass: function (b, a, c) {
        a && (c.nocheck === !0 ? a.hide() : a.show(), a.removeClass(), a.addClass(e.makeChkClass(b, c)))
    }, setParentNodeCheckBox: function (b, a, c, d) {
        var h = b.data.key.children, i = b.data.key.checked, l = n(a, j.id.CHECK, b);
        d || (d = a);
        f.makeChkFlag(b, a);
        a.nocheck !== !0 && a.chkDisabled !== !0 && (a[i] = c, e.setChkClass(b, l, a), b.check.autoCheckTrigger && a != d && b.treeObj.trigger(j.event.CHECK,
            [null, b.treeId, a]));
        if (a.parentTId) {
            l = !0;
            if (!c)for (var h = a.getParentNode()[h], g = 0, k = h.length; g < k; g++)if (h[g].nocheck !== !0 && h[g].chkDisabled !== !0 && h[g][i] || (h[g].nocheck === !0 || h[g].chkDisabled === !0) && h[g].check_Child_State > 0) {
                l = !1;
                break
            }
            l && e.setParentNodeCheckBox(b, a.getParentNode(), c, d)
        }
    }, setSonNodeCheckBox: function (b, a, c, d) {
        if (a) {
            var h = b.data.key.children, i = b.data.key.checked, l = n(a, j.id.CHECK, b);
            d || (d = a);
            var g = !1;
            if (a[h])for (var k = 0, m = a[h].length; k < m && a.chkDisabled !== !0; k++) {
                var o = a[h][k];
                e.setSonNodeCheckBox(b,
                    o, c, d);
                o.chkDisabled === !0 && (g = !0)
            }
            if (a != f.getRoot(b) && a.chkDisabled !== !0) {
                g && a.nocheck !== !0 && f.makeChkFlag(b, a);
                if (a.nocheck !== !0 && a.chkDisabled !== !0) {
                    if (a[i] = c, !g)a.check_Child_State = a[h] && a[h].length > 0 ? c ? 2 : 0 : -1
                } else a.check_Child_State = -1;
                e.setChkClass(b, l, a);
                b.check.autoCheckTrigger && a != d && a.nocheck !== !0 && a.chkDisabled !== !0 && b.treeObj.trigger(j.event.CHECK, [null, b.treeId, a])
            }
        }
    }}, event: {}, data: {getRadioCheckedList: function (b) {
        for (var a = f.getRoot(b).radioCheckedList, c = 0, d = a.length; c < d; c++)f.getNodeCache(b,
            a[c].tId) || (a.splice(c, 1), c--, d--);
        return a
    }, getCheckStatus: function (b, a) {
        if (!b.check.enable || a.nocheck || a.chkDisabled)return null;
        var c = b.data.key.checked;
        return{checked: a[c], half: a.halfCheck ? a.halfCheck : b.check.chkStyle == j.radio.STYLE ? a.check_Child_State === 2 : a[c] ? a.check_Child_State > -1 && a.check_Child_State < 2 : a.check_Child_State > 0}
    }, getTreeCheckedNodes: function (b, a, c, d) {
        if (!a)return[];
        for (var h = b.data.key.children, i = b.data.key.checked, e = c && b.check.chkStyle == j.radio.STYLE && b.check.radioType == j.radio.TYPE_ALL,
                 d = !d ? [] : d, g = 0, k = a.length; g < k; g++) {
            if (a[g].nocheck !== !0 && a[g].chkDisabled !== !0 && a[g][i] == c && (d.push(a[g]), e))break;
            f.getTreeCheckedNodes(b, a[g][h], c, d);
            if (e && d.length > 0)break
        }
        return d
    }, getTreeChangeCheckedNodes: function (b, a, c) {
        if (!a)return[];
        for (var d = b.data.key.children, h = b.data.key.checked, c = !c ? [] : c, i = 0, e = a.length; i < e; i++)a[i].nocheck !== !0 && a[i].chkDisabled !== !0 && a[i][h] != a[i].checkedOld && c.push(a[i]), f.getTreeChangeCheckedNodes(b, a[i][d], c);
        return c
    }, makeChkFlag: function (b, a) {
        if (a) {
            var c = b.data.key.children,
                d = b.data.key.checked, h = -1;
            if (a[c])for (var i = 0, e = a[c].length; i < e; i++) {
                var g = a[c][i], f = -1;
                if (b.check.chkStyle == j.radio.STYLE)if (f = g.nocheck === !0 || g.chkDisabled === !0 ? g.check_Child_State : g.halfCheck === !0 ? 2 : g[d] ? 2 : g.check_Child_State > 0 ? 2 : 0, f == 2) {
                    h = 2;
                    break
                } else f == 0 && (h = 0); else if (b.check.chkStyle == j.checkbox.STYLE)if (f = g.nocheck === !0 || g.chkDisabled === !0 ? g.check_Child_State : g.halfCheck === !0 ? 1 : g[d] ? g.check_Child_State === -1 || g.check_Child_State === 2 ? 2 : 1 : g.check_Child_State > 0 ? 1 : 0, f === 1) {
                    h = 1;
                    break
                } else if (f ===
                    2 && h > -1 && i > 0 && f !== h) {
                    h = 1;
                    break
                } else if (h === 2 && f > -1 && f < 2) {
                    h = 1;
                    break
                } else f > -1 && (h = f)
            }
            a.check_Child_State = h
        }
    }
    }
    });
    var m = m.fn.zTree, k = m._z.tools, j = m.consts, e = m._z.view, f = m._z.data, n = k.$;
    f.exSetting(v);
    f.addInitBind(function (b) {
        b.treeObj.bind(j.event.CHECK, function (a, c, d, h) {
            k.apply(b.callback.onCheck, [c ? c : a, d, h])
        })
    });
    f.addInitUnBind(function (b) {
        b.treeObj.unbind(j.event.CHECK)
    });
    f.addInitCache(function () {
    });
    f.addInitNode(function (b, a, c, d) {
        if (c) {
            a = b.data.key.checked;
            typeof c[a] == "string" && (c[a] = k.eqs(c[a],
                "true"));
            c[a] = !!c[a];
            c.checkedOld = c[a];
            if (typeof c.nocheck == "string")c.nocheck = k.eqs(c.nocheck, "true");
            c.nocheck = !!c.nocheck || b.check.nocheckInherit && d && !!d.nocheck;
            if (typeof c.chkDisabled == "string")c.chkDisabled = k.eqs(c.chkDisabled, "true");
            c.chkDisabled = !!c.chkDisabled || b.check.chkDisabledInherit && d && !!d.chkDisabled;
            if (typeof c.halfCheck == "string")c.halfCheck = k.eqs(c.halfCheck, "true");
            c.halfCheck = !!c.halfCheck;
            c.check_Child_State = -1;
            c.check_Focus = !1;
            c.getCheckStatus = function () {
                return f.getCheckStatus(b,
                    c)
            };
            b.check.chkStyle == j.radio.STYLE && b.check.radioType == j.radio.TYPE_ALL && c[a] && f.getRoot(b).radioCheckedList.push(c)
        }
    });
    f.addInitProxy(function (b) {
        var a = b.target, c = f.getSetting(b.data.treeId), d = "", h = null, e = "", l = null;
        if (k.eqs(b.type, "mouseover")) {
            if (c.check.enable && k.eqs(a.tagName, "span") && a.getAttribute("treeNode" + j.id.CHECK) !== null)d = k.getNodeMainDom(a).id, e = "mouseoverCheck"
        } else if (k.eqs(b.type, "mouseout")) {
            if (c.check.enable && k.eqs(a.tagName, "span") && a.getAttribute("treeNode" + j.id.CHECK) !== null)d =
                k.getNodeMainDom(a).id, e = "mouseoutCheck"
        } else if (k.eqs(b.type, "click") && c.check.enable && k.eqs(a.tagName, "span") && a.getAttribute("treeNode" + j.id.CHECK) !== null)d = k.getNodeMainDom(a).id, e = "checkNode";
        if (d.length > 0)switch (h = f.getNodeCache(c, d), e) {
            case "checkNode":
                l = p;
                break;
            case "mouseoverCheck":
                l = q;
                break;
            case "mouseoutCheck":
                l = r
        }
        return{stop: e === "checkNode", node: h, nodeEventType: e, nodeEventCallback: l, treeEventType: "", treeEventCallback: null}
    }, !0);
    f.addInitRoot(function (b) {
        f.getRoot(b).radioCheckedList = []
    });
    f.addBeforeA(function (b, a, c) {
        b.check.enable && (f.makeChkFlag(b, a), c.push("<span ID='", a.tId, j.id.CHECK, "' class='", e.makeChkClass(b, a), "' treeNode", j.id.CHECK, a.nocheck === !0 ? " style='display:none;'" : "", "></span>"))
    });
    f.addZTreeTools(function (b, a) {
        a.checkNode = function (a, c, i, f) {
            var g = b.data.key.checked;
            if (a.chkDisabled !== !0 && (c !== !0 && c !== !1 && (c = !a[g]), f = !!f, (a[g] !== c || i) && !(f && k.apply(this.setting.callback.beforeCheck, [b.treeId, a], !0) == !1) && k.uCanDo(this.setting) && b.check.enable && a.nocheck !== !0))a[g] =
                c, c = n(a, j.id.CHECK, b), (i || b.check.chkStyle === j.radio.STYLE) && e.checkNodeRelation(b, a), e.setChkClass(b, c, a), e.repairParentChkClassWithSelf(b, a), f && b.treeObj.trigger(j.event.CHECK, [null, b.treeId, a])
        };
        a.checkAllNodes = function (a) {
            e.repairAllChk(b, !!a)
        };
        a.getCheckedNodes = function (a) {
            var c = b.data.key.children;
            return f.getTreeCheckedNodes(b, f.getRoot(b)[c], a !== !1)
        };
        a.getChangeCheckedNodes = function () {
            var a = b.data.key.children;
            return f.getTreeChangeCheckedNodes(b, f.getRoot(b)[a])
        };
        a.setChkDisabled = function (a, c, f, j) {
            c = !!c;
            f = !!f;
            e.repairSonChkDisabled(b, a, c, !!j);
            e.repairParentChkDisabled(b, a.getParentNode(), c, f)
        };
        var c = a.updateNode;
        a.updateNode = function (d, f) {
            c && c.apply(a, arguments);
            if (d && b.check.enable && n(d, b).get(0) && k.uCanDo(b)) {
                var i = n(d, j.id.CHECK, b);
                (f == !0 || b.check.chkStyle === j.radio.STYLE) && e.checkNodeRelation(b, d);
                e.setChkClass(b, i, d);
                e.repairParentChkClassWithSelf(b, d)
            }
        }
    });
    var s = e.createNodes;
    e.createNodes = function (b, a, c, d) {
        s && s.apply(e, arguments);
        c && e.repairParentChkClassWithSelf(b, d)
    };
    var t = e.removeNode;
    e.removeNode = function (b, a) {
        var c = a.getParentNode();
        t && t.apply(e, arguments);
        a && c && (e.repairChkClass(b, c), e.repairParentChkClass(b, c))
    };
    var u = e.appendNodes;
    e.appendNodes = function (b, a, c, d, h, i) {
        var j = "";
        u && (j = u.apply(e, arguments));
        d && f.makeChkFlag(b, d);
        return j
    }
})(jQuery);

// angular-ztree-directive.js
(function (angular, $) {
    var app = angular.module("eccrm.directive.ztree", [
        'eccrm.angular'
    ]);
    var defaults = {
        data: undefined,// （必须）树的数据：支持[]，函数，未来对象（必须返回[]）
        treeId: null,// 树的id
        multi: false,// （已废弃）是否多棵树：如果一个页面中会出现多棵树，则设置该属性为true，表示每次都加载
        zindex: 99,// 树的css层级：z-index的值
        speed: 500,// 展开或折叠的速度：单位为毫秒,
        click: angular.noop,// 点击事件
        disableClick: null,// 是否禁用某次点击操作，返回true表示禁用
        reload: false, // （已废弃）是否重新刷新树：当该值为true时，会重新刷新树
        async: angular.noop,// 异步函数,异步函数参数（选中的节点，数据返回后的回调函数）
        maxHeight: 300, // 树的最大高度：值为数字
        treeSetting: null,// 树的展示方式（一般使用默认值即可）
        position: 'fixed',// 定位方式，默认使用悬浮定位
        backgroundColor: '#F0F6E4'// 树的背景色
    };
    //单选树
    //<input ztree-single="ztreeOptions"/>
    app.directive('ztreeSingle', function (CommonUtils, $q) {
        // ztree 的默认初始化参数
        var treeCount = 0;
        return {
            scope: {
                options: '=ztreeSingle'
            },
            link: function (scope, element, attrs, ctrl) {
                treeCount++;
                var scrollTop = 0;  // 有滚动条时的偏移量
                var ztreeObj, // ztree对象
                    tree, // tree
                    ztreeSetting, // ztree设置
                    treeContainer;  // ztree容器
                var promise = CommonUtils.parseToPromise(scope.options);
                var init = function (o) {
                    // 初始化参数
                    var options = angular.extend({}, defaults, o);
                    var treeId = options.treeId || CommonUtils.randomID(6);

                    // 给原对象新增一个reload方法，用于重新加载树
                    if (o.reload === undefined) {
                        scope.options.reload = function (p) {
                            element.unbind('click');    // 取消click绑定
                            ztreeObj.destroy();         // 销毁树
                            ztreeObj=null;
                            treeContainer.remove();     // 销毁树容器
                            tree=null;
                            init(p || o);               // 重新加载树
                        };
                    }
                    // 只有当树没有被初始化时才会初始化，该方法保证树只被初始化一次
                    var initTree = function (data) {
                        if (!ztreeObj && tree) {
                            ztreeObj = $.fn.zTree.init(tree, ztreeSetting, data);
                            tree.parent().slideDown();
                        }
                    };
                    // 初始化树的数据
                    var loadTreeData = function (data) {
                        if (!data) return;
                        // 数据来源：结果数组
                        if (angular.isArray(data)) {
                            initTree(data);
                            return;
                        }

                        // 数据来源：未来对象
                        if (angular.isObject(data)) {
                            var promise = data.$promise || data.promise || $q.when(data);
                            promise.then(function (value) {
                                initTree(value);
                            });
                            return;
                        }
                        // 数据来源：函数
                        if (angular.isFunction(data)) {
                            var result = data.call(scope);
                            loadTreeData(result);
                            return;
                        }
                        alert('不支持的数据类型!');
                    };

                    // 事件绑定,点击时判断树是否被初始化，如果没有则初始化，否则直接显示
                    element.on('click', function (e) {
                        if (!ztreeObj) {
                            var ztreeDefaultSetting = {
                                view: {showIcon: false},
                                data: {
                                    simpleData: {
                                        enable: true,
                                        idKey: "id",
                                        pIdKey: "parentId"
                                    }
                                }
                            };
                            treeContainer = $('<span style="position: absolute;z-index: ' + options.zindex + ';top:0;right:0"></span>');
                            var treeDiv = $('<div style="display: none;border: 1px solid #9fb5ac;padding-bottom: 5px;position: ' + options.position + ';background-color: ' + options.backgroundColor + ';" >' + '</div >');
                            tree = $('<ul class="ztree" style="max-height:' + options.maxHeight + 'px;overflow:auto;padding-right: 20px;" id="' + treeId + '"></ul >');
                            treeContainer.insertAfter(element);
                            treeContainer.append(treeDiv);
                            treeDiv.append(tree);
                            var speed = options.speed;
                            if (options.position == 'fixed' && scrollTop) {
                                treeDiv.css('top', (scrollTop - element.offset().top - 10) + 'px');
                            }

                            // 获得树的初始化参数
                            // 设置树的点击事件
                            ztreeSetting = angular.extend({}, ztreeDefaultSetting, options.treeSetting);
                            ztreeSetting.callback = ztreeSetting.callback || {};
                            ztreeSetting.callback.onClick = function (event, tid, treeNode) {
                                event.preventDefault();
                                // 是否禁用当前点击操作
                                if (angular.isFunction(options.disableClick) && options.disableClick(treeNode) == true) {
                                    return false;
                                }
                                tree.parent().slideUp(speed);
                                scope.$apply(function () {
                                    var clickCallBack = options.click;
                                    if (clickCallBack && angular.isFunction(clickCallBack)) {
                                        clickCallBack.call(scope, treeNode);
                                    }
                                });
                            };
                            // 如果配置了异步函数：则在点击展开时加载数据
                            if (options.async && angular.isFunction(options.async)) {
                                ztreeSetting.callback.onExpand = function (event, treeId, treeNode) {
                                    var obj = this.getZTreeObj(treeId);
                                    // 如果没有孩子节点，则加载数据
                                    if (!(treeNode.children && treeNode.children.length > 0)) {
                                        options.async.call(scope, treeNode, function (asyncData) {
                                            treeNode.children = asyncData || [];
                                            obj.refresh();
                                        });
                                    }
                                }
                            }
                            loadTreeData(options.data);
                        } else {
                            // 在fixed定位下重置树的位置
                            if (options.position == 'fixed') {
                                if (scrollTop > 0) {
                                    tree.parent().css('top', (scrollTop - element.offset().top - 10) + 'px');
                                } else {
                                    tree.parent().css('top', 'auto');
                                }
                            }
                            // 切换显示/隐藏树
                            tree.parent().slideToggle(speed);
                        }
                    });

                };
                promise.then(init);

                // 有滚动元素时，设置偏移量
                element.parents().find('div').bind('scroll', function (event) {
                    scrollTop = $(event.currentTarget).scrollTop();
                    event.preventDefault();
                });

                // 销毁时接触绑定
                scope.$on('destroy', function () {
                    element.parents().unbind('scroll');
                    element.unbind('click');
                });
            }
        }
    });

//多选树
    app.directive('ztreeMulti', function () {
        return {
            scope: {
                options: '=ztreeMulti'
            },
            link: function (scope, element, attrs, ctrl) {
                var setting, tree;
                var options = scope.options = angular.extend({
                    checkedData: []
                }, defaults, scope.options);
                tree = $('' +
                    '<ul class="ztree" style="max-height:' + options.maxHeight + 'px;overflow:auto;padding-right: 20px;"></ul >'
                );
                var treeDiv = $('<div style="display: none;border: 1px solid #9fb5ac;padding-bottom: 5px;position: absolute;background-color: ' + options.backgroundColor + ';" >' + '</div >')
                    .append(tree);
                var treeSpan = $('<span style="position: fixed;z-index: ' + options.zindex + ';"></span>')
                    .append(treeDiv);
                treeSpan.insertAfter(element);
                var speed = options.speed;
                setting = {
                    treeId: new Date().getTime(),
                    view: {showIcon: false},
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {enable: true}
                    },
                    callback: {}
                };
                if (options.async && angular.isFunction(options.async)) {
                    setting.callback.onExpand = function (event, treeId, treeNode) {
                        var obj = this.getZTreeObj(treeId);
                        if (!(treeNode.children && treeNode.children.length > 0)) {
                            options.async.call(scope, treeNode, function (asyncData) {
                                treeNode.children = asyncData || [];
                                obj.refresh();
                            });
                        }
                    }
                }
                var treeObj;
                var initTree = function (data) {
                    if (!data) return;
                    if (data && angular.isArray(data)) {
                        treeObj = $.fn.zTree.init(tree, setting, data);
                    } else if (angular.isFunction(data)) {
                        data.call(scope, function (result) {
                            treeObj = $.fn.zTree.init(tree, setting, result);
                        });
                    }
                };
                if (!options.multi) {
                    initTree(options.data);
                }

                element.on('click', function () {
                    //如果同一个页面包含多棵树，则每次点击都会加载一次数据
                    if (treeDiv.is(':hidden')) {
                        if (options.multi) {
                            initTree(options.data);
                        }

                        //回显数据
                        if (options.checkedData && options.checkedData.length > 0) {
                            var nodes = treeObj.getNodes();
                            console.dir(nodes);
                        }
                    }
                    if (treeDiv.is(':visible')) {
                        if (angular.isFunction(options.confirm)) {
                            options.confirm(treeObj.getCheckedNodes());
                        }
                    }
                    treeDiv.slideToggle(speed);
                });
            }
        }
    });
})
(angular, jQuery);


// angular-ztree-modal.js
(function () {
    var app = angular.module('eccrm.ztree.modal', [
        'eccrm.angular',
        'eccrm.angularstrap'
    ]);
    // ztree modal
    app.service('ZtreeModal', function ($modal, $q, CommonUtils, ModalFactory) {
        var defaults = {
            // 模态对话框的宽度
            modalWidth: '800px',
            // 至少要选择的个数
            min: 0,
            // 最大允许选择的个数
            max: undefined,
            // 模态对话框的标题
            title: '',
            // 模态对话框中内容的高度
            bodyHeight: '400px',

            // 初始化左侧树的函数（必须）
            // 接收一个数组
            initLeft: function () {
                return [
                    {id: '1', name: '测试数据'}
                ]
            },

            // 初始化右侧树的函数（可选）
            // 接收一个数组
            initRight: null,

            // 默认左侧树被选中的元素，目前仅仅支持id数组
            // 返回一个数组的函数，支持promise对象
            //
            defaultChecked: function () {
                return [];
            },

            // 是否显示全选按钮
            showSelectAllButton: true,

            // 当点击菜单时触发的事件
            // 接收一个函数，函数参数分别为:事件对象、treeId、当前节点对象、节点的选中状态
            click: null,
            // 当展开菜单时触发的事件
            // 接收一个函数，函数参数分别为:事件对象、treeId、当前节点对象
            expand: null,
            // 数据过滤器
            // 接收一个或多个函数，用于过滤左侧被选中的数据
            // 函数接收一个数组，包含所有被选中的数据，返回一个过滤后的数据
            dataFilter: [],

            // 获取右侧树的结果时，对结果数据进行过滤器
            // 该函数将会接收一个节点数据，然会true/false，true表示通过，false将会被过滤
            resultFilter: null,

            // ztree的配置
            ztree: {
                view: {
                    showIcon: false
                },
                check: {
                    enable: true
                },
                data: {
                    key: {
                        url: '_url'// 防止url跳转
                    },
                    simpleData: {
                        pIdKey: 'parentId',
                        enable: true
                    }
                }
            },

            // 点击确定后的事件
            // 将会返回右侧树中的所有数据（孩子节点将会以平级的方式返回）
            callback: function () {
            }
        };
        var common = function (options) {
            var modal = $modal({
                template: CommonUtils.contextPathURL('/static/ycrl/javascript/template/ztree-modal-double.tpl.html'),
                static: true
            });
            ModalFactory.afterShown(modal, options.afterShown);
            return modal.$scope;
        };

        var doLazy = function (data, callback) {
            if (angular.isArray(data)) {
                callback(data);
            } else if (angular.isObject(data)) {
                var promise = data.promise || data.$promise || $q.when(data);
                promise.then(function (promiseValue) {
                    callback(promiseValue);
                });
            } else {
                throw '错误的数据类型，仅支持[]或者promise对象!';
            }
        };
        return {
            doubleTree: function (options) {
                options = angular.extend({}, defaults, options);
                // 配置合法性验证
                if (!angular.isFunction(options.initLeft)) {
                    throw '缺少初始化左侧树的函数!';
                }

                options.ztree.callback = options.ztree.callback || {};
                // 初始化ztree配置
                if (typeof options.click === 'function') {
                    options.ztree.callback.onClick = options.click;
                }
                if (typeof options.expand === 'function') {
                    options.ztree.callback.onExpand = options.expand;
                }


                var leftTree;
                var rightTree;
                var $leftTree;
                var $rightTree;
                // 加载左侧树（所有的树）
                var initLeftTree = function (data) {
                    $leftTree = ($leftTree && $leftTree.length > 0) ? $leftTree : $(".modal-dialog #tree_left");
                    leftTree = $.fn.zTree.init($leftTree, options.ztree, data || []);
                };

                // 初始化右侧树
                var initRightTree = function (items) {
                    $rightTree = ($rightTree && $rightTree.length > 0) ? $rightTree : $(".modal-dialog #tree_right");
                    rightTree = $.fn.zTree.init($rightTree, options.ztree, items || []);
                    rightTree.checkAllNodes(false);
                };
                options.afterShown = function () {
                    // 初始化左侧树
                    doLazy(options.initLeft(), function (data) {
                        initLeftTree(data);

                        // 初始化回显左侧树
                        if (angular.isFunction(options.defaultChecked)) {
                            doLazy(options.defaultChecked(), function (ids) {
                                var nodes = leftTree.getNodesByFilter(function (node) {
                                    return $.inArray(node.id, ids) != -1;
                                });
                                angular.forEach(nodes, function (node) {
                                    leftTree.checkNode(node, true, false);
                                });
                                $scope.addToRight();
                            });
                        }
                    });

                    // 初始化右侧树
                    if (angular.isFunction(options.initRight)) {
                        doLazy(options.initRight(), initRightTree);
                    }

                };
                var $scope = common(options);
                $scope.options = options;

                $scope.showSelectAllButton = options.showSelectAllButton;

                var getFilterData = function (data) {
                    var filterData = (data || []).slice(0);
                    var filters = options.dataFilter || [];
                    if (typeof filters === 'function') {
                        filters = [filters];
                    }
                    // 没有过滤器
                    if (!(angular.isArray(filters) && filters.length > 0)) {
                        return data;
                    }
                    angular.forEach(filters, function (func) {
                        if (typeof func === 'function') {
                            filterData = func(filterData);
                        }
                    });
                    return filterData;
                };
                // 左（选择） --> 右
                $scope.addToRight = function () {
                    var leftCheckedItems = leftTree.getCheckedNodes(true);
                    var items = [];
                    angular.forEach(leftCheckedItems, function (item) {
                        items.push(angular.extend({}, item, {children: []}));
                    });
                    var filterData = getFilterData(items);
                    initRightTree(filterData);
                };

                // 将左侧全部加到右侧
                $scope.addAllToRight = function () {
                    leftTree.checkAllNodes(true);
                    $scope.addToRight();
                };

                // 删除右边选中元素
                $scope.removeFromRight = function () {
                    var items = rightTree.getCheckedNodes(true);
                    angular.forEach(items, function (item) {
                        var status = item.getCheckStatus();
                        // 半选中状态的元素不删除
                        if (status.checked && status.half) return;
                        rightTree.removeNode(item);
                    });
                };

                // 清空右侧的元素
                $scope.removeAllRight = function () {
                    initRightTree([]);
                };

                // 确定
                // 将右侧选中的数据传递给回调函数
                $scope.confirm = function () {
                    var min = options.min;
                    var max = options.max;
                    var items = rightTree && rightTree.getNodes() || [];
                    if (min > 0 && items.length < min) {
                        CommonUtils.errorDialog('至少选择[ ' + min + ' ]个元素!');
                        return false;
                    } else if (max && max < items.length) {
                        CommonUtils.errorDialog('最多选择[ ' + min + ' ]个元素!');
                        return false;
                    }
                    if (angular.isFunction(options.callback)) {
                        var foo = [];
                        rightTree && angular.forEach(rightTree.transformToArray(items), function (item) {
                            if (angular.isFunction(options.resultFilter)) {
                                if (options.resultFilter(item) == true) {
                                    foo.push(angular.extend({}, item, {children: []}));
                                }
                            } else {
                                foo.push(angular.extend({}, item, {children: []}));
                            }
                        });
                        options.callback.call($scope, foo);
                    }
                    $scope.$hide();
                };
            }
        }
    });

})();


// 合并ztree的所有功能
(function () {
    angular.module('eccrm.angular.ztree', [
        'eccrm.directive.ztree',
        'eccrm.ztree.modal'
    ]);
})();