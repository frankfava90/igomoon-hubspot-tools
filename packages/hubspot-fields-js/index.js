const { randomId, parseArgs } = require('./src/Helpers');
const _FieldAccessor = new (require('./src/fields/_FieldAccessor'))();

/**
 * Exports everything needed to use HubSpot FieldsJS
 */
module.exports = {
    /**
     * Helper Class
	 * 
	 * - Provides access to deprecated Classes
	 * - `new Field.raw({ type : "text" })` to create new field
	 * - Single object of all newly defined Class defined fields
     */
	Field				: _FieldAccessor,
	
	/**
	 * Include Classes for Fields
	 * 
	 * @example 
	 * const { Group, Text } = require('@igomoon/hubspot-fields-js');
	 * ...
	 * `new Field.Text()`
	 */
	
	// Groups
    Group 				: _FieldAccessor.Group,
    StyleGroup 			: _FieldAccessor.StyleGroup,

    // Fields
    Alignment 			: _FieldAccessor.Alignment, // Style
    BackgroundImage 	: _FieldAccessor.BackgroundImage, // Style
    Blog 				: _FieldAccessor.Blog,
    Boolean 			: _FieldAccessor.Boolean, // Theme + Style
    Border 				: _FieldAccessor.Border, // Style
    Choice 				: _FieldAccessor.Choice, // Theme + Style
    Color 				: _FieldAccessor.Color, // Theme + Style
    CrmObject 			: _FieldAccessor.CrmObject, // CMS Hub Professional and Enterprise.
    CrmObjectProperty 	: _FieldAccessor.CrmObjectProperty, // CMS Hub Professional and Enterprise.
    Cta 				: _FieldAccessor.Cta, // CMS Hub Professional and Enterprise
    Date 				: _FieldAccessor.Date,
    DateTime 			: _FieldAccessor.DateTime,
    Email 				: _FieldAccessor.Email,
    Embed 				: _FieldAccessor.Embed,
    File 				: _FieldAccessor.File,
    FollowUpEmail 		: _FieldAccessor.FollowUpEmail,
    Font 				: _FieldAccessor.Font, // Theme + Style
    Form 				: _FieldAccessor.Form,
    Gradient 			: _FieldAccessor.Gradient,
    HubdbRow 			: _FieldAccessor.HubdbRow, // CMS Hub Professional and Enterprise.
    HubdbTable 			: _FieldAccessor.HubdbTable, // CMS Hub Professional and Enterprise.
    Icon 				: _FieldAccessor.Icon, // Style
    Image 				: _FieldAccessor.Image, // Style
    Link 				: _FieldAccessor.Link,
    Logo 				: _FieldAccessor.Logo,
    Meeting 			: _FieldAccessor.Meeting,
    Menu 				: _FieldAccessor.Menu,
    Number 				: _FieldAccessor.Number, // Style
    Page 				: _FieldAccessor.Page,
    Payment 			: _FieldAccessor.Payment,
    RichText 			: _FieldAccessor.RichText,
    SfCampaign 			: _FieldAccessor.SfCampaign,
    SimpleMenu 			: _FieldAccessor.SimpleMenu,
    Spacing 			: _FieldAccessor.Spacing, // Style
    Tag 				: _FieldAccessor.Tag,
    Text 				: _FieldAccessor.Text,
    TextAlignment 		: _FieldAccessor.TextAlignment, // Style
    Url 				: _FieldAccessor.Url,
    Video 				: _FieldAccessor.Video,

    /**
     * Imported for use with Webpack
     */
    FieldsPlugin		: require('./src/plugins/FieldsPlugin'),

    // Helpers
    randomId,
    parseArgs,
};
