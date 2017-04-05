# cms-template
Base Template ({{ mustache }}/{{Handlebars}}) for the seven49.net Cloud CMS Frontend

The only requirements are the "template" directory in the root of the bucket and the "master.htm" in the root of the "template" directory.


## variables

* page title: {{Title}}
* keywords (Meta): {{Keywords}}
* description (Meta): {{Description}}
* page url id: {{UrlID}}
* site title: {{Config-SiteTitle}}
* config: {{Config-SettingsName}},   eg: {{Config-FFPrintSourceTitle}}
* main-content: {{{MainContent}}} (use not encoded with 3 cury braces!)
* page auto css class: {{AutoCssClass}}
* skin class: {{SkinClass}}
* iso code language_ {{LanguageIsoCode2}}
* absolute url: {{AbsoluteUrl}}
* encoded absolute url: {{EncodedAbsoluteUrl}}
* rendered on: {{RenderedOn}}
* cms text: {{Text-cmstextname}}, eg: {{Text-cms_waidirectlinksmaincontent}}

mustache style: https://mustache.github.io/mustache.5.html

According to mustache variables like {{myVariable}} will be html encoded. If you wish to use not encoded variables you have to write them like {{{ myVariable }}} oder {{& myVariable }}!

## Tagging system

* in the backend you have the possibility to "tag" every element. This will output a class additionally to the default classes like "Object", "Head", "Text", "Image", "Link", "Download"


## Call a single elements of content

* every content element can be selected like: {{{pagecontent[CSSSelector]}}} - the inner html will be rendered.
* if the pagecontent contains more than 1 "CSSSelector", all elements with this class will be rendered

Example:  
<code>{{{pagecontent[.your-fancy-class]}}}</code>

select outer html:  
<code>{{{pagecontent-outerhtml[.your-fancy-class]}}}</code>



## Server side includes
use includes to "DRY" your approach

Example: <code> <!--#include file="template/includes/header.html" --> </code>

## Skin-Templates

It is possible to have more master templates according to your skins - a skin template starts with "master-" and following "skinname.htm" and has to be in the root of the template directory.

Example: <code>master-gallery.htm</code>

