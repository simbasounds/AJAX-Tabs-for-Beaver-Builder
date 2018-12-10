# AJAX Tabs for Beaver Builder

Beaver Builder Tabs with AJAX! 

On a tab-by-tab basis, choose from two new options:
select posts to load into tabs with AJAX,
or use the regular text editor.

Includes an "Initial Tab" field to specify the tab to open when the page loads. If an AJAX tab was selected, instead of using AJAX this initial open tab will use FLBuilder::render_query to pre-load the post content on initial page load. This content would therefore be indexable by search engines.

In theory, separate indexable tabbed pages with open tabs per topic, each corresponding to separate posts which are hidden from search engines would direct search engines to the tabbed pages, thereby increasing topic SEO specificity.

## Overview
The standard Beaver Builder Tabs module, available in all premium (paid) packages, is great. Clients love the ability to display their content in well-organised fashion on a single page.

But there are two drawbacks: SEO, and layout within tabs (or rather the lack thereof). The plugin solves these two problems.

### SEO
On a page with tabbed content, Google and other search engines will index the entire page as a single topic, thereby potentially losing out on the specificity of sub-topics. Competing websites which specifically address the same sub-topic on their own page would potentially rank higher in searches for that topic.

The AJAX Tabs module for Beaver Builder allows you to pull dedicated posts into tabs, and to set a tab as open on-load. The content of this open tab will be indexable by Google. The content of the other AJAX tabs will not not be indexable. (The content of non-AJAX tabs ie. tabs using the optional text editor will also be indexable).

From here you can create several tabbed pages, one for each topic, with an open, indexable tab on each.

Each tabbed page could be made to be identical, except for the open tab setting. Using Beaver Builder template for the tabs would make this a very quick process.

If this sounds a bit hacky then know that it's pretty much the only way to achieve SEO specificity with tabs.

### Layout
The standard Beaver Builder Tabs module uses a standard text editor for its content ie. it does incorporate the Beaver Builder layout tools within the tab panels.

To get around this you can use the Insert Layout shortcodes:

Get the ID or slug of the content you want to embed with a shortcode. Create the shortcode using the following format, depending on whether it's the slug or the ID:
[fl_builder_insert_layout slug="my-post-slug"]
[fl_builder_insert_layout id="123"]

When getting a page via AJAX, this plugin will preserve page layouts built with Beaver Builder.
When loading the designated initial tab, however, it uses the same methods as the shortcode to preload content.
