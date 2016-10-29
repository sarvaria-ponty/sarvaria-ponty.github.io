/*
Copyright (C) 2016 Application Development and Delivery <adnd@hpe.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

/**
 * General Polymer 1.x utility functions.
 */

/*globals U Util sprintf*/

var P = {};

/**
 * Sort function for the specified Vaadin grid.
 *
 * @param  {Object}     grid        Vaadin grid
 * @return {Number}     result      result of the item comparing
 */
 
P.sortTable = function(grid) {

    // Getting sorting informations

    var sortOrder = grid.sortOrder[0];
    var sortProperty = grid.columns[sortOrder.column].name;
    var sortDirection = sortOrder.direction;
    
    // Sorting the items of the grid
    
    grid.items.sort(function(a, b) {
        
        // Preparing
        
        var res;
        var path = sortProperty.split('.');
      
        // Getting the a and b items
        
        for (var i = 0; i < path.length; i++) {
            a = a[path[i]];
            b = b[path[i]];
        }
        
        // Comparing items
        
        if (!isNaN(a)) {
            res = parseInt(a, 10) - parseInt(b, 10);
        } else {
            res = a.localeCompare(b);
        }

        // Descending order
        
        if ('desc' === sortDirection) {
            res *= -1;
        }
      
        // Returns the result
        
        return res;
    });
};

/**
 * Filters the specified Vaadin grid by using the specified filter criteria.
 * The filter criteria will be searched in the specified attribute names.
 *
 * @param  {Object}     grid        Vaadin grid
 * @param  {Array}      items       all items that can be shown in the grid
 * @param  {String}     filter      filter criteria
 * @param  {Array}      attr        attribute names
 */
 
P.filterTable = function(grid, items, filter, attr) {
    
    // Checking filter
    
    if (filter && filter != '') {
        
        // Preparing
        
        var f = filter.toLowerCase();
        var fitems = [];
        
        // Filtering
        
        for (var i = 0; i < items.length; i++) {
            for (var j = 0; j < attr.length; j++) {
                var value = U.getAttr(items[i], attr[j]);
        
                // Does the item match the filter criteria?
                
                if (value && value.toLowerCase().indexOf(f) >= 0) {
                    fitems.push(items[i]);
                    break;
                }
            }
        }
        
        // Assigning the filtered items to the grid
        
        grid.items = fitems;
        
    // There is no filter specified
    
    } else {
        grid.items = items;
    }
};

/**
 * Sets the focus to the specified element.
 *
 * @param  {Object}    element      element that has to receive the focus
 * @param  {Number}    timeout      timeout in milliseconds. Default: 1
 */
 
P.setFocus = function(element, timeout) {
    
    // Setting the focus by using some latency
    
    setTimeout(function() {
        element.focus();
    }, timeout || 1);
};

/**
 * Clears the value of the paper-input field.
 *
 * @param  {Object}     event       event object
 */
             
P.clearInput = function(event) {
                
    // Getting the paper-input control
    
    var node = event.target;
    
    while (node.tagName != 'PAPER-INPUT') {
        node = node.parentElement;
    }
    
    // Clearing the value
    
    node.value = '';
    
    // Setting the focus to the field
    
    P.setFocus(node);
};

/**
 * Event that fires when the user press a key on an input field.
 * It checks that the pressed key was the ENTER key or not.
 *
 * @param   {Object}    event           event object
 */            

P.tabToEnter = function(event) {

    // Checking the pressed key
    
    if (Util.isENTER(event)) {

        // Getting the paper-input control
    
        var node = event.target;
        
        while (node.tagName != 'PAPER-INPUT') {
            node = node.parentElement;
        }

        // Getting the next field
        
        var nextField = node.getAttribute('next-field');
        
        // Setting the focus the next field if it is specified
        
        if (nextField) {
            P.setFocus(document.getElementById(nextField), 10);
        }

        // This is the ENTER key

        return true;
    } else {
        
        // This is not the ENTER key
        
        return false;
    }
};

/**
 * Validating the fields by checking these that are filled or not.
 *
 * @param   {Object}    self    reference to the Polymer object
 * @param   {String}    message error message in case of empty field
 * @param   {String}    field   id of the field
 * @return  {Boolean}   valid   fields are valid or not
 */

P.validate = function() {
    
    // Preparing
    
    var valid = true;
    var self = arguments[0];

    var message = arguments[1];

    for (var i = 2; i < arguments.length; i++) {

        // Getting the paper-input or vaadin-combo-box control and its value

        var node = self.$$('#' + arguments[i]);

        while (['PAPER-INPUT', 'VAADIN-COMBO-BOX'].indexOf(node.tagName) < 0) {
            node = node.parentElement;
        }

        var value = node.value;

        // Validating the field

        if (!value || value == '') {
            node.setAttribute('error-message', message);
            node.invalid = true;
            valid = false;
        } else {
            node.setAttribute('error-message', null);
            node.invalid = false;
        }
    }
    
    // Fields validity status

    return valid;
};

/**
 * Clears the error messages for the specified paper-input or vaadin-combo-box
 * controls.
 *
 * @param   {Object}    self    reference to the Polymer object
 * @param   {String}    field   id of the field
 */

P.clearError = function() {
    
    // Preparing

    var self = arguments[0];

    // Clearing error messages
    
    for (var i = 1; i < arguments.length; i++) {

        // Getting the paper-input or vaadin-combo-box control

        var node = self.$$('#' + arguments[i]);

        while (['PAPER-INPUT', 'VAADIN-COMBO-BOX'].indexOf(node.tagName) < 0) {
            node = node.parentElement;
        }
        
        node.setAttribute('error-message', null);
        node.invalid = false;
    }
};

/**
 * Assigning the XML attributes to the specified XML and returns it.
 *
 * @param   {String}    xml     XML that has to format
 * @param   {String}    attr    XML attribute. If it is null or undefined, it
 *                              will be an empty string
 * @return  {String}    result  formatted XML with the attributes
 */

P.setXML = function(xml) {
    
    // Preparing
    
    var args = [ xml ];
    
    // Getting the arguments and escaping it
    
    for (var i = 1; i < arguments.length; i++) {
        args.push(Util.escapeXML('' + (arguments[i] || '')));
    }

    // Assigning XML attributes to the XML
    
    return sprintf.apply(undefined, args);
};

/**
 * Is the current locale hungarian?
 * 
 * @param   {String}    locale      current locale
 * @return  {Boolean}   hungarian   current locale is hungarian or
 *                                  not
 */
 
P.isHungarian = function(locale) {
    return locale == 'hu';
};

/**
 * Is the current locale english?
 * 
 * @param   {String}    locale      current locale
 * @return  {Boolean}   english     current locale is english or
 *                                  not
 */

P.isEnglish = function(locale) {
    return locale == 'en';
};