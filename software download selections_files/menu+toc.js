/***********************************************************************
*                                                                      *
*               This software is part of the ast package               *
*          Copyright (c) 1985-2011 AT&T Intellectual Property          *
*                      and is licensed under the                       *
*                  Common Public License, Version 1.0                  *
*                    by AT&T Intellectual Property                     *
*                                                                      *
*                A copy of the License is available at                 *
*            http://www.opensource.org/licenses/cpl1.0.txt             *
*         (with md5 checksum 059e8cd6165cb4c31e351f2b69388fd9)         *
*                                                                      *
*              Information and Software Systems Research               *
*                            AT&T Research                             *
*                           Florham Park NJ                            *
*                                                                      *
*                 Glenn Fowler <glenn.s.fowler@gmail.com>                  *
*                                                                      *
***********************************************************************/

/*
 * @(#)$Id: menu+toc.js (AT&T Research) 2011-09-11 $
 *
 * simple nested menu with generated main frame table of contents
 * active item highlighted, active branches visible
 * requires companion menu.css
 * css handles nesting depth 5 -- pretty ugly after 4
 * see it in action at http://www.research.att.com/sw/download/
 *
 *	<DIV id="menu">
 *		<UL>
 *			<LI><A href=...>level 0 item label</A></LI>
 *			<LI><A href="#">level 1 submenu root label</A>
 *				<UL>
 *					<LI><A href=...>level 1 item label</A></LI>
 *				</UL>
 *			</LI>
 *		</UL>
 *	</DIV>
 *
 * 2 or more <Hn><A ...>...</A></Hn> in main frame inserts toc up to depth 5
 */

var menu_SHOW = 'auto';
var menu_HIDE = '0px';
var menu_WAIT = 200;
var menu_LOOP = 5;

var menu_toc_mark = [ '\u2022', '\u2666', '\u2665', '\u2663', '\u2660' ];

var menu_DIV = 'menu_div_';
var menu_ITEM = 'menu_item_';
var menu_LEVEL = 'menu_level_';
var menu_SELECTED = ' menu_selected';

var menu_selected = null;
var menu_toc = null;

var menu_div = [];
var menu_divs = 0;
var menu_tocs = 0;

function menu_main_toc()
{
	if (menu_toc && menu_toc.nextSibling) {
		menu_toc.parentNode.removeChild(menu_toc.parentNode.lastChild);
		menu_toc = null;
	}
	menu_tocs = menu_divs;
	for (var offset = 3; offset <= 6; offset++) {
		var head = top.main.document.getElementsByTagName('H' + offset);
		if (head.length > 1) {
			var A;
			var LI;
			var UL;
			var ULS = [];
			var tocs = [ menu_divs ];
			var prev = -1;
			var items = 0;
			var label = top.main.document.getElementsByTagName('A');
			var level = Number(menu_selected.className.substring(menu_LEVEL.length, menu_LEVEL.length + 1));
			var ref = top.main.location.pathname + '#';
			for (var i = 0; i < label.length; i++) {
				if (!label[i].href && label[i].name && label[i].parentNode.tagName.indexOf('H') == 0) {
					var sublevel = Number(label[i].parentNode.tagName.substring(1));
					if (sublevel >= offset) {
						sublevel -= offset;
						if (sublevel < menu_toc_mark.length) {
							A = document.createElement('A');
							A.href = ref + label[i].name;
							A.target = "main";
							A.innerHTML = menu_toc_mark[sublevel] + (label[i].innerHTML ? label[i].innerHTML : label[i].name);
							if (sublevel > prev) {
								menu_tocs++;
								menu_div[menu_tocs] = document.createElement('DIV');
								menu_div[menu_tocs].style.overflow = 'hidden';
								menu_div[menu_tocs].style.position = 'relative';
								menu_div[menu_tocs].style.height = sublevel ? menu_HIDE : menu_SHOW;
								menu_div[menu_tocs].className = menu_DIV + (level + sublevel + 1);
								menu_div[menu_tocs].id = menu_DIV + menu_tocs;
								ULS[sublevel] = UL = document.createElement('UL');
								menu_div[menu_tocs].appendChild(UL);
								if (LI)
									LI.appendChild(menu_div[menu_tocs]);
								tocs[sublevel] = menu_tocs;
							}
							else if (sublevel < prev)
								UL = ULS[sublevel];
							A.className = menu_LEVEL + (level + sublevel + 1);
							A.id = menu_ITEM + tocs[sublevel];
							A.onclick = menu_select;
							LI = document.createElement('LI');
							UL.appendChild(LI);
							LI.appendChild(A);
							prev = sublevel;
							items++;
						}
					}
				}
			}
			if (items > 1) {
				menu_selected.parentNode.appendChild(menu_div[menu_divs+1]);
				menu_toc = menu_selected;
			}
			break;
		}
	}
	top.main.onbeforeunload = menu_main_changing;
}

var menu_main = '';
var menu_main_check = 0;

function menu_main_load()
{
	if (!--menu_main_check || menu_main_check > 0 && menu_main != top.main.location) {
		menu_main_check = 0;
		menu_main = top.main.location;
		setTimeout("menu_main_toc();", menu_WAIT);
	}
	else if (menu_main_check > 0)
		setTimeout("menu_main_load();", menu_WAIT * (menu_LOOP - menu_main_check));
}

function menu_main_changing()
{
	if (menu_selected) {
		menu_main = top.main.location;
		menu_main_check = menu_LOOP;
		setTimeout("menu_main_load();", menu_WAIT);
	}
}

function menu_hide(item)
{
	item.className = item.className.replace(menu_SELECTED, '');
	if (item.parentNode.lastChild.tagName == 'DIV' && item.parentNode.lastChild.id.indexOf(menu_DIV) >= 0) {
		var n = Number(item.parentNode.lastChild.id.substring(menu_DIV.length));
		if (n <= menu_divs) {
			for (var i = n; i <= menu_divs && menu_div[i].className >= menu_div[n].className; i++)
				menu_div[i].style.height = menu_HIDE;
			for (var i = n; i <= menu_tocs; i++)
				menu_div[i].style.height = menu_HIDE;
		}
		else
			for (var i = n; i <= menu_tocs && menu_div[i].className >= menu_div[n].className; i++)
				menu_div[i].style.height = menu_HIDE;
	}
}

function menu_show(item)
{
	var i;
	var m;
	var n;
	item.className += menu_SELECTED;
	if (item.id.indexOf(menu_ITEM) < 0)
		n = -1;
	else if (item.parentNode.lastChild.tagName == 'DIV' && item.parentNode.lastChild.id.indexOf(menu_DIV) >= 0)
		n = Number(item.parentNode.lastChild.id.substring(menu_DIV.length));
	else
		n = Number(item.id.substring(menu_ITEM.length));
	if (n > menu_divs) {
		for (i = menu_divs + 1; i <= menu_tocs; i++)
			menu_div[i].style.height = menu_HIDE;
		menu_div[n].style.height = menu_SHOW;
		for (i = n - 1; i > menu_divs; i--)
			if (menu_div[i].className < menu_div[n].className)
				menu_div[n = i].style.height = menu_SHOW;
	}
	else {
		for (i = 1; i <= menu_tocs; i++)
			menu_div[i].style.height = menu_HIDE;
		if (n >= 1) {
			menu_div[n].style.height = menu_SHOW;
			for (i = n - 1; i >= 1; i--)
				if (menu_div[i].className < menu_div[n].className)
					menu_div[n = i].style.height = menu_SHOW;
		}
	}
}

function menu_select(unused, item)
{
	top.main.onbeforeunload = menu_main_changing;
	if (item || (item = this)) {
		if (menu_selected)
			menu_hide(menu_selected);
		if (menu_selected == item)
			menu_selected = null;
		else if (item.parentNode.lastChild.style && item.parentNode.lastChild.style.height == menu_SHOW) {
			menu_hide(item);
			menu_selected = null;
		}
		else {
			menu_show(item);
			menu_selected = item;
		}
	}
}

var menu_init_select_A = null;
var menu_init_select_level = 99;

function menu_init_part(UL, level, base)
{
	var LI = UL.getElementsByTagName('LI')[0];
	var next = level + 1;
	var divs = menu_divs;
	while (LI) {
		if (LI.tagName == 'LI') {
			var A = LI.getElementsByTagName('A')[0];
			A.className = menu_LEVEL + level;
			UL = LI.getElementsByTagName('UL');
			if (UL.length > 0) {
				menu_divs++;
				menu_div[menu_divs] = document.createElement('DIV');
				menu_div[menu_divs].style.overflow = 'hidden';
				menu_div[menu_divs].style.position = 'relative';
				menu_div[menu_divs].style.height = menu_HIDE;
				menu_div[menu_divs].className = menu_DIV + next;
				menu_div[menu_divs].id = menu_DIV + menu_divs;
				A.id = menu_ITEM + menu_divs;
				UL[0].parentNode.appendChild(menu_div[menu_divs]);
				menu_div[menu_divs].appendChild(UL[0]);
				menu_init_part(UL[0], next, base);
			}
			else if (level)
				A.id = menu_ITEM + divs;
			if (menu_init_select_level > level && A.innerHTML == base) {
				menu_init_select_level = level;
				menu_init_select_A = A.href.indexOf('#') >= 0 && UL.length > 0 ? UL[0].getElementsByTagName('A')[0] : A;
			}
			A.onclick = menu_select;
		}
		LI = LI.nextSibling;
	}
	top.main.onbeforeunload = menu_main_changing;
}

function menu_init()
{
	var menu = document.getElementById('menu');
	menu.style.visibility = 'visible';
	var UL = menu.getElementsByTagName('UL')[0];
	if (UL) {
		var base = null;
		var specific = false;
		if (parent.document.location.search) {
			var options = parent.document.location.search.substring(1).split('&');
			for (var i = 0; i < options.length; i++)
				if (options[i].indexOf('select=') == 0) {
					base = options[i].substring(7);
					specific = true;
					break;
				}
		}
		if (!base) {
			var path = parent.document.location.pathname.split('/');
			base = path[path.length - 2];
			base = base.replace('.html', '');
		}
		if (base == 'download')
			base = 'official';
		menu_init_part(UL, 0, base);
		if (menu_init_select_A) {
			menu_select(false, menu_init_select_A);
			if (specific)
				top.main.location.assign(menu_init_select_A.href);
		}
	}
}

window.onload = menu_init;
