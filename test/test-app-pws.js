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

// Define helper constanses

var SERVICE_URL = 'http://localhost:8010/service';
var LOGONID = 'sarvari';
var COMPONENT = 'app-pws';
var DIV_ID = 'divid_' + COMPONENT;
var COMPONENT_ID = 'id_' + COMPONENT;
var LINK_ID = COMPONENT + '_id';
var componentLoaded = false;
var jasmineTimeout;

// Define cleaner that runs after the last test has been finished

var cleaner = function() {
    document.body.removeChild(document.getElementById(LINK_ID));
};

var createComponent = function(attributes) {
    var comp = document.createElement('div');
    comp.setAttribute('id', DIV_ID);
    comp.setAttribute('style', 'display: none');

    comp.innerHTML = '<' + COMPONENT + ' id="' + COMPONENT_ID + '"' + (attributes ? (' ' + attributes) : '') + '></' + COMPONENT + '>';
    document.body.appendChild(comp);

    return document.getElementById(COMPONENT_ID);
};

var removeComponent = function() {
    if (document.getElementById(DIV_ID)) {
        document.body.removeChild(document.getElementById(DIV_ID));
    }
};

// Testing component

describe(COMPONENT + ' web component', function() {
    
    /**
     * Loads the web component.
     *
     * @param   noname  {Function}  function that has to execute before every
     *                              tests
     */
    
    beforeEach(function(done) {

        // Backuping the original and setting the timeout for async
        // communication.

        jasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

        // Creating import link if it does not exists yet
        
        if (componentLoaded) {
            done();
        } else {
            var link = document.createElement('link');
            link.setAttribute('id', LINK_ID);
            link.setAttribute('rel', 'import');
            link.setAttribute('href', '../app/' + COMPONENT + '/' + COMPONENT + '.html?' + new Date().getTime());
            
            link.onload = function() {
                
                // Loading finished
                
                componentLoaded = true;
                done();
            };
    
            // Adding the import link to the body
    
            document.body.appendChild(link);
        }
    });
    
    /**
     * Removes the web component.
     *
     * @param   noname  {Function}  function that has to execute after every
     *                              tests
     */
     
    afterEach(function() {
        
        // Removing the component and the import link from the body
        
        removeComponent();

        // Restoring jasmine timeout

        jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmineTimeout;
    });
    
    // *************************************************************************
    // * Availibility
    // *************************************************************************

    it('available', function() {
        expect(createComponent()).not.toBeNull();
    });

    // *************************************************************************
    // * Default attributes
    // *************************************************************************

    describe('Default attributes', function() {
        it('url', function() {
            expect(createComponent().url).toBeUndefined();
        });

        it('logonid', function() {
            expect(createComponent().uid).toBeUndefined();
        });

        it('service', function() {
            expect(createComponent().service).toBeUndefined();
        });

        it('busy', function() {
            expect(createComponent().busy).toBeFalsy();
        });

        it('params', function() {
            expect(createComponent().params).toBeUndefined();
        });

        it('data', function() {
            expect(createComponent().data).toBeUndefined();
        });
    });

    // *************************************************************************
    // * Missing parameters during the execute
    // *************************************************************************

    describe('Missing parameters at execute', function() {
        it('url', function() {
            var comp = createComponent();

            expect(comp.execute).toThrowError('Missing "url" parameter');
        });

        it('logonid', function() {
            var comp = createComponent(sprintf('url="%s"', SERVICE_URL));

            expect(function() {
                comp.execute();
            }).toThrowError('Missing "logonid" parameter');
        });

        it('service', function() {
            var comp = createComponent(sprintf('url="%s" logonid="%s"', SERVICE_URL, LOGONID));

            expect(function() {
                comp.execute();
            }).toThrowError('Missing "service" parameter');
        });

    });

    // *************************************************************************
    // * Execute HTTP call
    // *************************************************************************

    describe('Execute HTTP call', function() {
        it('invoking before-pws-call', function(done) {
            eventtest.init();

            var comp = createComponent(sprintf('url="%s" logonid="%s" service="ping"', SERVICE_URL, LOGONID));
            comp.addEventListener('before-pws-call', function() {
                eventtest.call();
            });

            comp.execute();

            eventtest.test(function(result) {
                expect(result).toBeTruthy();
                done();
            });          
        });

        it('invoking after-pws-call', function(done) {
            eventtest.init();

            var comp = createComponent(sprintf('url="%s" logonid="%s" service="ping"', SERVICE_URL, LOGONID));
            comp.addEventListener('after-pws-call', function() {
                eventtest.call();
            });

            comp.execute();

            eventtest.test(function(result) {
                expect(result).toBeTruthy();
                done();
            });          
        });

        describe('HTTP POST call content', function() {
            it('checking URL', function(done) {
                eventtest.init();

                var comp = createComponent(sprintf('url="%s" logonid="%s" service="ping"', SERVICE_URL, LOGONID));
                comp.addEventListener('after-pws-call', function(event) {
                    var xhr = event.detail.event.detail.xhr || event.detail.event.detail.request.xhr;
                    var url = xhr.responseURL;
                    var timestamp = url.split('?')[1];
                    var key = comp.getKey(timestamp);
                    var encryptedService = url.substring(comp.url.length + 1).split('?')[0];
                    var decryptedService = atob(Util.decrypter(atob(encryptedService), key));
                    var service = decryptedService.split('?')[0];
                    var ts = decryptedService.split('?')[1];

                    eventtest.data = {
                        service:        decryptedService.split('?')[0],
                        urltimestamp:   timestamp,
                        timestamp:      decryptedService.split('?')[1],
                        responsedata:   event.detail.data,
                        failed:         event.detail.failed
                    };

                    eventtest.call();
                });

                comp.execute();

                eventtest.test(function(result) {
                    expect(eventtest.data.service).toEqual(comp.service);
                    expect(eventtest.data.timestamp).toEqual(eventtest.data.urltimestamp);
                    expect(eventtest.data.responsedata.response).toEqual('pong');
                    expect(eventtest.data.failed).toBeFalsy();

                    done();
                });          
            });

            it('checking PSVF', function(done) {
                eventtest.init();

                var comp = createComponent(sprintf('url="%s" logonid="%s" service="ping"', SERVICE_URL, LOGONID));
                comp.addEventListener('after-pws-call', function(event) {
                    var psvf = document.cookie.split('psvf=')[1];
                    var xhr = event.detail.event.detail.xhr || event.detail.event.detail.request.xhr;
                    var url = xhr.responseURL;
                    var timestamp = url.split('?')[1];
                    var key = comp.getKey(timestamp);
                    var decryptedPSVF = atob(Util.decrypter(atob(psvf), key));

                    eventtest.data = {
                        urltimestamp:   timestamp,
                        timestamp:      decryptedPSVF.split('#')[0],
                        logonID:        decryptedPSVF.split('#')[1],
                        navigator:      decryptedPSVF.split('#')[2],
                        responsedata:   event.detail.data,
                        failed:         event.detail.failed
                    };

                    eventtest.call();
                });

                comp.execute();

                eventtest.test(function(result) {
                    expect(eventtest.data.timestamp).toEqual(eventtest.data.urltimestamp);
                    expect(eventtest.data.logonID).toEqual(LOGONID);
                    expect(eventtest.data.navigator).toEqual(navigator.userAgent);
                    expect(eventtest.data.responsedata.response).toEqual('pong');
                    expect(eventtest.data.failed).toBeFalsy();

                    done();
                });          
            });
        });

        describe('Sending special characters', function() {
           it('Sending &#!@#$%*() characters using HTTP POST', function(done) {
                eventtest.init();

                var comp = createComponent(sprintf('url="%s" logonid="%s" service="ping"', SERVICE_URL, LOGONID));
                comp.params = { a: 'hello&#!@#$%*()hi', b: 1, c: true, d: 2.3 };
                comp.addEventListener('after-pws-call', function(event) {
                    var xhr = event.detail.event.detail.xhr || event.detail.event.detail.request.xhr;
                    var url = xhr.responseURL;
                    var timestamp = url.split('?')[1];
                    var key = comp.getKey(timestamp);
                    var encryptedService = url.substring(comp.url.length + 1).split('?')[0];
                    var decryptedService = atob(Util.decrypter(atob(encryptedService), key));
                    var service = decryptedService.split('?')[0];
                    var ts = decryptedService.split('?')[1];
                    var data = JSON.parse(decodeURI(atob(Util.decrypter(
                        atob(
                            JSON.parse(comp.getParams(key, timestamp)).data
                        ), key
                    ))));

                    eventtest.data = {
                        service:        service,
                        ts:             ts,
                        timestamp:      timestamp,
                        data:           data,
                        responsedata:   event.detail.data,
                        failed:         event.detail.failed
                    };

                    eventtest.call();
                });

                comp.execute();

                eventtest.test(function(result) {
                    expect(eventtest.data.service).toEqual(comp.service);
                    expect(eventtest.data.timestamp).toEqual(eventtest.data.ts);
                    expect(eventtest.data.data).toEqual(comp.params);
                    expect(eventtest.data.responsedata).toEqual(comp.params);
                    expect(eventtest.data.failed).toBeFalsy();

                    done();
                });          
             });
   
           it('Sending & character using HTTP POST', function(done) {
                eventtest.init();

                var comp = createComponent(sprintf('url="%s" logonid="%s" service="ping"', SERVICE_URL, LOGONID));
                comp.params = { a: 'hello&hi', b: 1, c: true, d: 2.3 };
                comp.addEventListener('after-pws-call', function(event) {
                    var xhr = event.detail.event.detail.xhr || event.detail.event.detail.request.xhr;
                    var url = xhr.responseURL;
                    var timestamp = url.split('?')[1];
                    var key = comp.getKey(timestamp);
                    var encryptedService = url.substring(comp.url.length + 1).split('?')[0];
                    var decryptedService = atob(Util.decrypter(atob(encryptedService), key));
                    var service = decryptedService.split('?')[0];
                    var ts = decryptedService.split('?')[1];
                    var data = JSON.parse(decodeURI(atob(Util.decrypter(
                        atob(
                            JSON.parse(comp.getParams(key, timestamp)).data
                        ), key
                    ))));

                    eventtest.data = {
                        service:        service,
                        ts:             ts,
                        timestamp:      timestamp,
                        data:           data,
                        responsedata:   event.detail.data,
                        failed:         event.detail.failed
                    };

                    eventtest.call();
                });

                comp.execute();

                eventtest.test(function(result) {
                    expect(eventtest.data.service).toEqual(comp.service);
                    expect(eventtest.data.timestamp).toEqual(eventtest.data.ts);
                    expect(eventtest.data.data).toEqual(comp.params);
                    expect(eventtest.data.responsedata).toEqual(comp.params);
                    expect(eventtest.data.failed).toBeFalsy();

                    done();
                });          
            });

            it('Sending árvíztűrőtükörfúrógépÁRVÍZTŰRŐTÜKÖRFÚRÓGÉP accuated characters using HTTP POST', function(done) {
                eventtest.init();

                var key;
                var comp = createComponent(sprintf('url="%s" logonid="%s" service="ping"', SERVICE_URL, LOGONID));
                comp.params = { a: 'árvíztűrőtükörfúrógépÁRVÍZTŰRŐTÜKÖRFÚRÓGÉP', b: 1, c: true, d: 2.3 };
                comp.addEventListener('after-pws-call', function(event) {
                    var xhr = event.detail.event.detail.xhr || event.detail.event.detail.request.xhr;
                    var url = xhr.responseURL;
                    var timestamp = url.split('?')[1];
                    key = comp.getKey(timestamp);
                    var encryptedService = url.substring(comp.url.length + 1).split('?')[0];
                    var decryptedService = atob(Util.decrypter(atob(encryptedService), key));
                    var service = decryptedService.split('?')[0];
                    var ts = decryptedService.split('?')[1];
                    var data = JSON.parse(decodeURI(atob(Util.decrypter(
                        atob(
                            JSON.parse(comp.getParams(key, timestamp)).data
                        ), key
                    ))));

                    eventtest.data = {
                        service:        service,
                        ts:             ts,
                        timestamp:      timestamp,
                        data:           data,
                        responsedata:   event.detail.data,
                        failed:         event.detail.failed
                    };

                    eventtest.call();
                });

                comp.execute();

                eventtest.test(function(result) {
                    expect(eventtest.data.service).toEqual(comp.service);
                    expect(eventtest.data.timestamp).toEqual(eventtest.data.ts);
                    expect(eventtest.data.data).toEqual(comp.params);
                    expect(eventtest.data.responsedata).toEqual(comp.params);
                    expect(eventtest.data.failed).toBeFalsy();

                    done();
                });          
             });
        });

        describe('Validating HTTP requests', function() {
            var service = 'b2ZldHM1eVM5TFdWdjREMWk0R012NGl2aFBXTHI0VHhpcEdVK0E9PQ==';

            var removeAjax = function() {
                document.body.removeChild(document.getElementById('ajaxdiv'));
            };

            var createAjax = function(url, method, callback) {
                var comp = document.createElement('div');
                comp.setAttribute('id', 'ajaxdiv');
                comp.setAttribute('style', 'display: none');
                comp.innerHTML = '<iron-ajax id="ajax" url="' + url + '" method="' + method + '" handle-as="json"></iron-ajax>';
                document.body.appendChild(comp);

                var ajax = document.getElementById('ajax');
                ajax.addEventListener('response', function(event) {
                    callback(true);
                });
                ajax.addEventListener('error', function(event) {
                    callback(false);
                });
                ajax.generateRequest();
            };

            it('Invoking by GET method', function(done) {
                createAjax(sprintf('%s/%s', SERVICE_URL, service), 'GET', function(result) {
                    expect(result).toBeFalsy();      
                    removeAjax();

                    done();
                });
            });

            it('Invoking by PUT method', function(done) {
                createAjax(sprintf('%s/%s', SERVICE_URL, service), 'PUT', function(result) {
                    expect(result).toBeFalsy();      
                    removeAjax();

                    done();
                });
            });

            it('Missing timestamp', function(done) {
                createAjax(sprintf('%s/%s', SERVICE_URL, service), 'POST', function(result) {
                    expect(result).toBeFalsy();      
                    removeAjax();

                    done();
                });
            });

            it('Old timestamp', function(done) {
                var timestamp = new Date().getTime() - 31000;

                createAjax(sprintf('%s/%s?%s', SERVICE_URL, service, timestamp), 'POST', function(result) {
                    expect(result).toBeFalsy();      
                    removeAjax();

                    done();
                });
            });
        });
    });
});
