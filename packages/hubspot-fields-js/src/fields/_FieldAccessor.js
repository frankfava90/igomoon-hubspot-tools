const _HublField = require('./_HublField');

module.exports = class _Field {

	/* -------- Raw Field -------- */
	
	/**
	 * Create a new Field
	 * @since 2.0.0
	 * 
	 * @param {_HublField.FieldType} data
	 */
	raw = (data = {}) => new _HublField(data);

	/* -------- Class Defined Fields -------- */
	
	// Groups
    Group = require('./Group')
    StyleGroup = require('./StyleGroup')

    // Fields
    Alignment = require('./Alignment') // Style
    BackgroundImage = require('./BackgroundImage') // Style
    Blog = require('./Blog')
    Boolean = require('./Boolean') // Theme + Style
    Border = require('./Border') // Style
    Choice = require('./Choice') // Theme + Style
    Color = require('./Color') // Theme + Style
    CrmObject = require('./CrmObject') // CMS Hub Professional and Enterprise.
    CrmObjectProperty = require('./CrmObjectProperty') // CMS Hub Professional and Enterprise.
    Cta = require('./Cta') // CMS Hub Professional and Enterprise
    Date = require('./Date')
    DateTime = require('./DateTime')
    Email = require('./Email')
    Embed = require('./Embed')
    File = require('./File')
    FollowUpEmail = require('./FollowUpEmail')
    Font = require('./Font') // Theme + Style
    Form = require('./Form')
    Gradient = require('./Gradient')
    HubdbRow = require('./HubdbRow') // CMS Hub Professional and Enterprise.
    HubdbTable = require('./HubdbTable') // CMS Hub Professional and Enterprise.
    Icon = require('./Icon') // Style
    Image = require('./Image') // Style
    Link = require('./Link')
    Logo = require('./Logo')
    Meeting = require('./Meeting')
    Menu = require('./Menu')
    Number = require('./Number') // Style
    Page = require('./Page')
    Payment = require('./Payment')
    RichText = require('./RichText')
    SfCampaign = require('./SfCampaign')
    SimpleMenu = require('./SimpleMenu')
    Spacing = require('./Spacing') // Style
    Tag = require('./Tag')
    Text = require('./Text')
    TextAlignment = require('./TextAlignment') // Style
    Url = require('./Url')
    Video = require('./Video')

	/* -------- Deprecated Fields -------- */

	/**
	 * Alignment field
	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Alignment()`
	 */
	alignment = (data = {}) => new this.Alignment(data);

	/**
	 * Background Image field
	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new BackgroundImage()`
	 */
	backgroundImage = (data = {}) => new this.BackgroundImage(data);

	/**
	 * Blog field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Blog()`
	 */
	blog = (data = {}) => new this.Blog(data);

	/**
	 * Boolean field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Boolean()`
	 */
	boolean = (data = {}) => new this.Boolean(data);

	/**
	 * Border field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Border()`
	 */
	border = (data = {}) => new this.Border(data);

	/**
	 * Choice field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Choice()`
	 */
	choice = (data = {}, choices = []) => new this.Choice(data).choices(choices);

	/**
	 * Color field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Color()`
	 */
	color = (data = {}) => new this.Color(data);

	/**
	 * CRM Object field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new CrmObject()`
	 */
	crmObject = (data = {}) => new this.CrmObject(data);

	/**
	 * CRM Object Property field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new CrmObjectProperty()`
	 */
	crmObjectProperty = (data = {}) => new this.CrmObjectProperty(data);

	/**
	 * Cta field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Cta()`
	 */
	cta = (data = {}) => new this.Cta(data);

	/**
	 * Date field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Date()`
	 */
	date = (data = {}) => new this.Date(data);

	/**
	 * DateTime field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new DateTime()`
	 */
	dateTime = (data = {}) => new this.DateTime(data);

	/**
	 * Email field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Email()`
	 */
	email = (data = {}) => new this.Email(data);

	/**
	 * Embed field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Embed()`
	 */
	embed = (data = {}) => new this.Embed(data);

	/**
	 * File field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new File()`
	 */
	file = (data = {}) => new this.File(data);

	/**
	 * Follow up email field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new FollowUpEmail()`
	 */
	followUpEmail = (data = {}) => new this.FollowUpEmail(data);

	/**
	 * Font field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Font()`
	 */	
	font = (data = {}) => new this.Font(data);

	/**
	 * Form field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Form()`
	 */
	form = (data = {}) => new this.Form(data);

	/**
	 * Gradient field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Gradient()`
	 */
	gradient = (data = {}) => new this.Gradient(data);

	/**
	 * HubDB Row field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new HubdbRow()`
	 */
	hubdbRow = (data = {}) => new this.HubdbRow(data);

	/**
	 * HubDB Table field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new HubdbTable()`
	 */
	hubdbTable = (data = {}) => new this.HubdbTable(data);

	/**
	 * Icon field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Icon()`
	 */
	icon = (data = {}) => new this.Icon(data);

	/**
	 * Image field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Image()`
	 */
	image = (data = {}) => new this.Image(data);

	/**
	 * Link field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Link()`
	 */
	link = (data = {}) => new this.Link(data);

	/**
	 * Logo field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Logo()`
	 */
	logo = (data = {}) => new this.Logo(data);

	/**
	 * Meeting field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Meeting()`
	 */
	meeting = (data = {}) => new this.Meeting(data);

	/**
	 * Menu field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field type instead: `new Menu()`
	 */
	menu = (data = {}) => new this.Menu(data);

	/**
	 * Number field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Number()`
	 */
	number = (data = {}) => new this.Number(data);

	/**
	 * Page field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Page()`
	 */
	page = (data = {}) => new this.Page(data);

	/**
	 * Payment field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Payment()`
	 */
	payment = (data = {}) => new this.Payment(data);

	/**
	 * Rich text field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new RichText()`
	 */
	richText = (data = {}) => new this.RichText(data);

	/**
	 * Salesforce Campaign field
	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new SfCampaign()`
	 */
	sfCampaign = (data = {}) => new this.SfCampaign(data);
	
	/**
	 * Simple Menu field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new SimpleMenu()`
	 */
	simpleMenu = (data = {}) => new this.SimpleMenu(data);
	
	/**
	 * Spacing field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Spacing()`
	 */
	spacing = (data = {}) => new this.Spacing(data);

	/**
	 * Tag field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Tag()`
	 */
	tag = (data = {}) => new this.Tag(data);

	/**
	 * Text Field
	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Text()`
	 */
	text = (data = {}) => new this.Text(data);

	/**
	 * Text Alignment Field
	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new TextAlignment()`
	 */
	textAlignment = (data = {}) => new this.TextAlignment(data);
	
	/**
	 * URL field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Url()`
	 */	
	url = (data = {}) => new this.Url(data);

	/**
	 * Video field
 	 * @deprecated (@since 2.0.0)
	 * 
	 * Kept for backwards compatibility. Will be removed in a later version.
	 * 
	 * Instantiate the class for this field by instead typing: `new Video()`
	 */
	video = (data = {}) => new this.Video(data);


}