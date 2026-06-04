"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favicon = exports.Explorer = exports.ExplicitPublish = exports.EncryptedPages = exports.EncryptedContentIndex = exports.Description = exports.Darkmode = exports.CreatedModifiedDate = exports.CrawlLinks = exports.ContentPage = exports.ContentIndex = exports.Comments = exports.CNAME = exports.Citations = exports.CanvasPage = exports.Breadcrumbs = exports.BasesTransformer = exports.BasesPage = exports.Backlinks = exports.ArticleTitle = exports.AliasRedirects = exports.plugins = exports.TagContent = exports.TagPage = exports.TableOfContents = exports.tokenClassifierTransformer = exports.StackedPages = exports.ExampleComponent = exports.isTagPageSlug = exports.isFolderPageSlug = exports.filterListedPages = exports.CustomOgImagesEmitterName = exports.NotePropertiesComponent = exports.FolderContent = exports.FolderPage = exports.encryptAesGcm = exports.decrypt = exports.SHADOW_INDEX_VERSION = exports.EncryptedPage = exports.ContentBody = exports.ContentMeta = exports.CanvasFrame = exports.CanvasBody = exports.resolvePropertyValue = exports.evaluateFilter = exports.evaluate = exports.compile = exports.viewRegistry = exports.registerCustomViews = exports.BasesBody = void 0;
exports.UnlistedPages = exports.TagList = exports.TableOfContentsTransformer = exports.SyntaxHighlighting = exports.ExampleTransformer = exports.ExampleFilter = exports.ExampleEmitter = exports.Spacer = exports.Search = exports.RoamFlavoredMarkdown = exports.RemoveDrafts = exports.RecentNotes = exports.ReaderMode = exports.PageTitle = exports.OxHugoFlavouredMarkdown = exports.CustomOgImages = exports.ObsidianFlavoredMarkdown = exports.NoteProperties = exports.Latex = exports.HardLineBreaks = exports.Graph = exports.GitHubFlavoredMarkdown = exports.Footer = void 0;
const registry_1 = require("../../quartz/components/registry");
var bases_page_1 = require("./bases-page");
Object.defineProperty(exports, "BasesBody", { enumerable: true, get: function () { return bases_page_1.BasesBody; } });
Object.defineProperty(exports, "registerCustomViews", { enumerable: true, get: function () { return bases_page_1.registerCustomViews; } });
Object.defineProperty(exports, "viewRegistry", { enumerable: true, get: function () { return bases_page_1.viewRegistry; } });
Object.defineProperty(exports, "compile", { enumerable: true, get: function () { return bases_page_1.compile; } });
Object.defineProperty(exports, "evaluate", { enumerable: true, get: function () { return bases_page_1.evaluate; } });
Object.defineProperty(exports, "evaluateFilter", { enumerable: true, get: function () { return bases_page_1.evaluateFilter; } });
Object.defineProperty(exports, "resolvePropertyValue", { enumerable: true, get: function () { return bases_page_1.resolvePropertyValue; } });
var canvas_page_1 = require("./canvas-page");
Object.defineProperty(exports, "CanvasBody", { enumerable: true, get: function () { return canvas_page_1.CanvasBody; } });
Object.defineProperty(exports, "CanvasFrame", { enumerable: true, get: function () { return canvas_page_1.CanvasFrame; } });
var content_meta_1 = require("./content-meta");
Object.defineProperty(exports, "ContentMeta", { enumerable: true, get: function () { return content_meta_1.ContentMeta; } });
var content_page_1 = require("./content-page");
Object.defineProperty(exports, "ContentBody", { enumerable: true, get: function () { return content_page_1.ContentBody; } });
var encrypted_pages_1 = require("./encrypted-pages");
Object.defineProperty(exports, "EncryptedPage", { enumerable: true, get: function () { return encrypted_pages_1.EncryptedPage; } });
Object.defineProperty(exports, "SHADOW_INDEX_VERSION", { enumerable: true, get: function () { return encrypted_pages_1.SHADOW_INDEX_VERSION; } });
Object.defineProperty(exports, "decrypt", { enumerable: true, get: function () { return encrypted_pages_1.decrypt; } });
Object.defineProperty(exports, "encryptAesGcm", { enumerable: true, get: function () { return encrypted_pages_1.encryptAesGcm; } });
var folder_page_1 = require("./folder-page");
Object.defineProperty(exports, "FolderPage", { enumerable: true, get: function () { return folder_page_1.FolderPage; } });
Object.defineProperty(exports, "FolderContent", { enumerable: true, get: function () { return folder_page_1.FolderContent; } });
var note_properties_1 = require("./note-properties");
Object.defineProperty(exports, "NotePropertiesComponent", { enumerable: true, get: function () { return note_properties_1.NotePropertiesComponent; } });
var og_image_1 = require("./og-image");
Object.defineProperty(exports, "CustomOgImagesEmitterName", { enumerable: true, get: function () { return og_image_1.CustomOgImagesEmitterName; } });
var recent_notes_1 = require("./recent-notes");
Object.defineProperty(exports, "filterListedPages", { enumerable: true, get: function () { return recent_notes_1.filterListedPages; } });
Object.defineProperty(exports, "isFolderPageSlug", { enumerable: true, get: function () { return recent_notes_1.isFolderPageSlug; } });
Object.defineProperty(exports, "isTagPageSlug", { enumerable: true, get: function () { return recent_notes_1.isTagPageSlug; } });
var stacked_pages_1 = require("./stacked-pages");
Object.defineProperty(exports, "ExampleComponent", { enumerable: true, get: function () { return stacked_pages_1.ExampleComponent; } });
Object.defineProperty(exports, "StackedPages", { enumerable: true, get: function () { return stacked_pages_1.StackedPages; } });
var syntax_highlighting_1 = require("./syntax-highlighting");
Object.defineProperty(exports, "tokenClassifierTransformer", { enumerable: true, get: function () { return syntax_highlighting_1.tokenClassifierTransformer; } });
var table_of_contents_1 = require("./table-of-contents");
Object.defineProperty(exports, "TableOfContents", { enumerable: true, get: function () { return table_of_contents_1.TableOfContents; } });
var tag_page_1 = require("./tag-page");
Object.defineProperty(exports, "TagPage", { enumerable: true, get: function () { return tag_page_1.TagPage; } });
Object.defineProperty(exports, "TagContent", { enumerable: true, get: function () { return tag_page_1.TagContent; } });
exports.plugins = {
    "alias-redirects": {
        AliasRedirects: (...args) => { registry_1.componentRegistry.setOptionOverrides("alias-redirects", args[0]); },
    },
    "article-title": {
        ArticleTitle: (...args) => { registry_1.componentRegistry.setOptionOverrides("article-title", args[0]); },
    },
    "backlinks": {
        Backlinks: (...args) => { registry_1.componentRegistry.setOptionOverrides("backlinks", args[0]); },
    },
    "bases-page": {
        BasesPage: (...args) => { registry_1.componentRegistry.setOptionOverrides("bases-page", args[0]); },
        BasesTransformer: (...args) => { registry_1.componentRegistry.setOptionOverrides("bases-page", args[0]); },
    },
    "breadcrumbs": {
        Breadcrumbs: (...args) => { registry_1.componentRegistry.setOptionOverrides("breadcrumbs", args[0]); },
    },
    "canvas-page": {
        CanvasPage: (...args) => { registry_1.componentRegistry.setOptionOverrides("canvas-page", args[0]); },
    },
    "citations": {
        Citations: (...args) => { registry_1.componentRegistry.setOptionOverrides("citations", args[0]); },
    },
    "cname": {
        CNAME: (...args) => { registry_1.componentRegistry.setOptionOverrides("cname", args[0]); },
    },
    "comments": {
        Comments: (...args) => { registry_1.componentRegistry.setOptionOverrides("comments", args[0]); },
    },
    "content-index": {
        ContentIndex: (...args) => { registry_1.componentRegistry.setOptionOverrides("content-index", args[0]); },
    },
    "content-page": {
        ContentPage: (...args) => { registry_1.componentRegistry.setOptionOverrides("content-page", args[0]); },
    },
    "crawl-links": {
        CrawlLinks: (...args) => { registry_1.componentRegistry.setOptionOverrides("crawl-links", args[0]); },
    },
    "created-modified-date": {
        CreatedModifiedDate: (...args) => { registry_1.componentRegistry.setOptionOverrides("created-modified-date", args[0]); },
    },
    "darkmode": {
        Darkmode: (...args) => { registry_1.componentRegistry.setOptionOverrides("darkmode", args[0]); },
    },
    "description": {
        Description: (...args) => { registry_1.componentRegistry.setOptionOverrides("description", args[0]); },
    },
    "encrypted-pages": {
        EncryptedContentIndex: (...args) => { registry_1.componentRegistry.setOptionOverrides("encrypted-pages", args[0]); },
        EncryptedPages: (...args) => { registry_1.componentRegistry.setOptionOverrides("encrypted-pages", args[0]); },
    },
    "explicit-publish": {
        ExplicitPublish: (...args) => { registry_1.componentRegistry.setOptionOverrides("explicit-publish", args[0]); },
    },
    "explorer": {
        Explorer: (...args) => { registry_1.componentRegistry.setOptionOverrides("explorer", args[0]); },
    },
    "favicon": {
        Favicon: (...args) => { registry_1.componentRegistry.setOptionOverrides("favicon", args[0]); },
    },
    "footer": {
        Footer: (...args) => { registry_1.componentRegistry.setOptionOverrides("footer", args[0]); },
    },
    "github-flavored-markdown": {
        GitHubFlavoredMarkdown: (...args) => { registry_1.componentRegistry.setOptionOverrides("github-flavored-markdown", args[0]); },
    },
    "graph": {
        Graph: (...args) => { registry_1.componentRegistry.setOptionOverrides("graph", args[0]); },
    },
    "hard-line-breaks": {
        HardLineBreaks: (...args) => { registry_1.componentRegistry.setOptionOverrides("hard-line-breaks", args[0]); },
    },
    "latex": {
        Latex: (...args) => { registry_1.componentRegistry.setOptionOverrides("latex", args[0]); },
    },
    "note-properties": {
        NoteProperties: (...args) => { registry_1.componentRegistry.setOptionOverrides("note-properties", args[0]); },
    },
    "obsidian-flavored-markdown": {
        ObsidianFlavoredMarkdown: (...args) => { registry_1.componentRegistry.setOptionOverrides("obsidian-flavored-markdown", args[0]); },
    },
    "og-image": {
        CustomOgImages: (...args) => { registry_1.componentRegistry.setOptionOverrides("og-image", args[0]); },
    },
    "ox-hugo": {
        OxHugoFlavouredMarkdown: (...args) => { registry_1.componentRegistry.setOptionOverrides("ox-hugo", args[0]); },
    },
    "page-title": {
        PageTitle: (...args) => { registry_1.componentRegistry.setOptionOverrides("page-title", args[0]); },
    },
    "reader-mode": {
        ReaderMode: (...args) => { registry_1.componentRegistry.setOptionOverrides("reader-mode", args[0]); },
    },
    "recent-notes": {
        RecentNotes: (...args) => { registry_1.componentRegistry.setOptionOverrides("recent-notes", args[0]); },
    },
    "remove-draft": {
        RemoveDrafts: (...args) => { registry_1.componentRegistry.setOptionOverrides("remove-draft", args[0]); },
    },
    "roam": {
        RoamFlavoredMarkdown: (...args) => { registry_1.componentRegistry.setOptionOverrides("roam", args[0]); },
    },
    "search": {
        Search: (...args) => { registry_1.componentRegistry.setOptionOverrides("search", args[0]); },
    },
    "spacer": {
        Spacer: (...args) => { registry_1.componentRegistry.setOptionOverrides("spacer", args[0]); },
    },
    "stacked-pages": {
        ExampleEmitter: (...args) => { registry_1.componentRegistry.setOptionOverrides("stacked-pages", args[0]); },
        ExampleFilter: (...args) => { registry_1.componentRegistry.setOptionOverrides("stacked-pages", args[0]); },
        ExampleTransformer: (...args) => { registry_1.componentRegistry.setOptionOverrides("stacked-pages", args[0]); },
    },
    "syntax-highlighting": {
        SyntaxHighlighting: (...args) => { registry_1.componentRegistry.setOptionOverrides("syntax-highlighting", args[0]); },
    },
    "table-of-contents": {
        TableOfContentsTransformer: (...args) => { registry_1.componentRegistry.setOptionOverrides("table-of-contents", args[0]); },
    },
    "tag-list": {
        TagList: (...args) => { registry_1.componentRegistry.setOptionOverrides("tag-list", args[0]); },
    },
    "unlisted-pages": {
        UnlistedPages: (...args) => { registry_1.componentRegistry.setOptionOverrides("unlisted-pages", args[0]); },
    },
};
exports.AliasRedirects = exports.plugins["alias-redirects"].AliasRedirects;
exports.ArticleTitle = exports.plugins["article-title"].ArticleTitle;
exports.Backlinks = exports.plugins["backlinks"].Backlinks;
exports.BasesPage = exports.plugins["bases-page"].BasesPage;
exports.BasesTransformer = exports.plugins["bases-page"].BasesTransformer;
exports.Breadcrumbs = exports.plugins["breadcrumbs"].Breadcrumbs;
exports.CanvasPage = exports.plugins["canvas-page"].CanvasPage;
exports.Citations = exports.plugins["citations"].Citations;
exports.CNAME = exports.plugins["cname"].CNAME;
exports.Comments = exports.plugins["comments"].Comments;
exports.ContentIndex = exports.plugins["content-index"].ContentIndex;
exports.ContentPage = exports.plugins["content-page"].ContentPage;
exports.CrawlLinks = exports.plugins["crawl-links"].CrawlLinks;
exports.CreatedModifiedDate = exports.plugins["created-modified-date"].CreatedModifiedDate;
exports.Darkmode = exports.plugins["darkmode"].Darkmode;
exports.Description = exports.plugins["description"].Description;
exports.EncryptedContentIndex = exports.plugins["encrypted-pages"].EncryptedContentIndex;
exports.EncryptedPages = exports.plugins["encrypted-pages"].EncryptedPages;
exports.ExplicitPublish = exports.plugins["explicit-publish"].ExplicitPublish;
exports.Explorer = exports.plugins["explorer"].Explorer;
exports.Favicon = exports.plugins["favicon"].Favicon;
exports.Footer = exports.plugins["footer"].Footer;
exports.GitHubFlavoredMarkdown = exports.plugins["github-flavored-markdown"].GitHubFlavoredMarkdown;
exports.Graph = exports.plugins["graph"].Graph;
exports.HardLineBreaks = exports.plugins["hard-line-breaks"].HardLineBreaks;
exports.Latex = exports.plugins["latex"].Latex;
exports.NoteProperties = exports.plugins["note-properties"].NoteProperties;
exports.ObsidianFlavoredMarkdown = exports.plugins["obsidian-flavored-markdown"].ObsidianFlavoredMarkdown;
exports.CustomOgImages = exports.plugins["og-image"].CustomOgImages;
exports.OxHugoFlavouredMarkdown = exports.plugins["ox-hugo"].OxHugoFlavouredMarkdown;
exports.PageTitle = exports.plugins["page-title"].PageTitle;
exports.ReaderMode = exports.plugins["reader-mode"].ReaderMode;
exports.RecentNotes = exports.plugins["recent-notes"].RecentNotes;
exports.RemoveDrafts = exports.plugins["remove-draft"].RemoveDrafts;
exports.RoamFlavoredMarkdown = exports.plugins["roam"].RoamFlavoredMarkdown;
exports.Search = exports.plugins["search"].Search;
exports.Spacer = exports.plugins["spacer"].Spacer;
exports.ExampleEmitter = exports.plugins["stacked-pages"].ExampleEmitter;
exports.ExampleFilter = exports.plugins["stacked-pages"].ExampleFilter;
exports.ExampleTransformer = exports.plugins["stacked-pages"].ExampleTransformer;
exports.SyntaxHighlighting = exports.plugins["syntax-highlighting"].SyntaxHighlighting;
exports.TableOfContentsTransformer = exports.plugins["table-of-contents"].TableOfContentsTransformer;
exports.TagList = exports.plugins["tag-list"].TagList;
exports.UnlistedPages = exports.plugins["unlisted-pages"].UnlistedPages;
