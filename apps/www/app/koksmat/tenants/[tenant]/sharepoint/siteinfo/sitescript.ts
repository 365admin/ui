export interface SiteScript {
    $schema: string
    actions: Action[]
    bindings: Bindings
  }
  
  export interface Action {
    verb: string
    listName?: string
    templateType?: number
    color?: string
    icon?: string
    addNavLink?: string
    description?: string
    identity?: string
    subactions?: Subaction[]
    navigationLayout?: string
    headerLayout?: string
    headerBackground?: string
    showFooter?: boolean
    themeJson?: ThemeJson
    capability?: string
    timeZone?: number
    locale?: number
    sortOrder?: number
    hourFormat?: string
  }
  
  export interface Subaction {
    verb: string
    schemaXml?: string
    name?: string
    id?: string
    fieldRefsXml?: string[]
    viewFields?: string[]
    query?: string
    rowLimit?: number
    isPaged?: boolean
    makeDefault?: boolean
    replaceViewFields?: boolean
    formatterJSON?: string
    columnWidthXml?: string
    viewType2?: string
    viewDataXml?: string
    rules?: Rule[]
    clientFormCustomFormatter?: ClientFormCustomFormatter
    targetListName?: string
    scope?: string
  }
  
  export interface Rule {
    condition: string
    outcome: string
    title: string
    triggerType: string
    actionType: string
    ruleTemplateId: string
    modifiedFieldInternalName?: string
  }
  
  export interface ClientFormCustomFormatter {
    headerJSONFormatter: string
    footerJSONFormatter: string
    bodyJSONFormatter: BodyJsonformatter
  }
  
  export interface BodyJsonformatter {
    sections: Section[]
  }
  
  export interface Section {
    displayname: string
    fields: string[]
  }
  
  export interface ThemeJson {
    version: string
    isInverted: boolean
    palette: Palette
  }
  
  export interface Palette {
    themePrimary: string
    themeLighterAlt: string
    themeLighter: string
    themeLight: string
    themeTertiary: string
    themeSecondary: string
    themeDarkAlt: string
    themeDark: string
    themeDarker: string
    black: string
    neutralSecondary: string
    neutralTertiaryAlt: string
    neutralQuaternary: string
    neutralPrimaryAlt: string
    neutralPrimary: string
    neutralTertiary: string
    neutralQuaternaryAlt: string
    white: string
    neutralLighter: string
    neutralLight: string
    neutralDark: string
    neutralLighterAlt: string
    HyperlinkActive: string
    CommandLinksPressed: string
    NavigationPressed: string
    EmphasisHoverBorder: string
    TopBarPressedText: string
    HeaderNavigationPressedText: string
    Hyperlinkfollowed: string
    EmphasisHoverBackground: string
    EmphasisBorder: string
    AccentText: string
    CommandLinksHover: string
    RowAccent: string
    NavigationAccent: string
    NavigationHover: string
    EmphasisBackground: string
    HeaderNavigationHoverText: string
    HeaderNavigationSelectedText: string
    SuiteBarBackground: string
    Hyperlink: string
    ContentAccent1: string
    AccentLines: string
    HeaderAccentLines: string
    ButtonPressedBorder: string
    SuiteBarHoverBackground: string
    StrongLines: string
    HeaderStrongLines: string
    SuiteBarHoverText: string
    ButtonPressedBackground: string
    ButtonHoverBorder: string
    ButtonHoverBackground: string
    SelectionBackground: string
    HoverBackground: string
    NavigationHoverBackground: string
    PageBackground: string
    EmphasisText: string
    SuiteBarText: string
    TileText: string
    BackgroundOverlay: string
    HeaderBackground: string
    FooterBackground: string
    DisabledBackground: string
    HeaderDisabledBackground: string
    ButtonBackground: string
    ButtonDisabledBackground: string
    SubtleEmphasisBackground: string
    DialogBorder: string
    NavigationSelectedBackground: string
    TopBarBackground: string
    DisabledLines: string
    HeaderDisabledLines: string
    ButtonDisabledBorder: string
    SuiteBarDisabledText: string
    SubtleLines: string
    HeaderSubtleLines: string
    ButtonGlyphDisabled: string
    DisabledText: string
    CommandLinksDisabled: string
    HeaderDisableText: string
    ButtonDisabledText: string
    Lines: string
    HeaderLines: string
    ButtonBorder: string
    CommandLinks: string
    Navigation: string
    SubtleEmphasisText: string
    TopBarText: string
    HeaderNavigationText: string
    ButtonGlyph: string
    BodyText: string
    WebPartHeading: string
    HeaderText: string
    ButtonText: string
    ButtonGlyphActive: string
    TopBarHoverText: string
    StrongBodyText: string
    SiteTitle: string
    CommandLinksSecondary: string
    SubtleEmphasisCommandLinks: string
    HeaderSiteTitle: string
    TileBackgroundOverlay: string
    ContentAccent2: string
    ContentAccent3: string
    ContentAccent4: string
    ContentAccent5: string
    ContentAccent6: string
    backgroundOverlay: string
    whiteTranslucent40: string
    themeAccent: string
    themeAccentTranslucent10: string
    primaryBackground: string
    primaryText: string
    suiteBarBackground: string
    suiteBarText: string
    suiteBarDisabledText: string
    topBarBackground: string
    topBarText: string
    topBarHoverText: string
    dialogBorder: string
  }
  
  export interface Bindings {
    LDeveloper_Teams0001_listName: LdeveloperTeams0001ListName
    LDeveloper_Teams0001_icon: LdeveloperTeams0001Icon
    LDeveloper_Teams0001_description: LdeveloperTeams0001Description
    LDeveloper_Teams0001_color: LdeveloperTeams0001Color
    LDeveloper_Teams0001_addNavLink: LdeveloperTeams0001AddNavLink
    LDokumenter0002_listName: Ldokumenter0002ListName
    LDokumenter0002_icon: Ldokumenter0002Icon
    LDokumenter0002_description: Ldokumenter0002Description
    LDokumenter0002_color: Ldokumenter0002Color
    LDokumenter0002_addNavLink: Ldokumenter0002AddNavLink
    LEnvironments0003_listName: Lenvironments0003ListName
    LEnvironments0003_icon: Lenvironments0003Icon
    LEnvironments0003_description: Lenvironments0003Description
    LEnvironments0003_color: Lenvironments0003Color
    LEnvironments0003_addNavLink: Lenvironments0003AddNavLink
    LEpics0004_listName: Lepics0004ListName
    LEpics0004_icon: Lepics0004Icon
    LEpics0004_description: Lepics0004Description
    LEpics0004_color: Lepics0004Color
    LEpics0004_addNavLink: Lepics0004AddNavLink
    LFeatures0005_listName: Lfeatures0005ListName
    LFeatures0005_icon: Lfeatures0005Icon
    LFeatures0005_description: Lfeatures0005Description
    LFeatures0005_color: Lfeatures0005Color
    LFeatures0005_addNavLink: Lfeatures0005AddNavLink
    LRequest_tracker0006_listName: LrequestTracker0006ListName
    LRequest_tracker0006_icon: LrequestTracker0006Icon
    LRequest_tracker0006_description: LrequestTracker0006Description
    LRequest_tracker0006_color: LrequestTracker0006Color
    LRequest_tracker0006_addNavLink: LrequestTracker0006AddNavLink
    LServices0007_listName: Lservices0007ListName
    LServices0007_icon: Lservices0007Icon
    LServices0007_description: Lservices0007Description
    LServices0007_color: Lservices0007Color
    LServices0007_addNavLink: Lservices0007AddNavLink
    LBegivenheder0008_listName: Lbegivenheder0008ListName
    LBegivenheder0008_icon: Lbegivenheder0008Icon
    LBegivenheder0008_description: Lbegivenheder0008Description
    LBegivenheder0008_color: Lbegivenheder0008Color
    LBegivenheder0008_addNavLink: Lbegivenheder0008AddNavLink
    LIssue_tracker0009_listName: LissueTracker0009ListName
    LIssue_tracker0009_icon: LissueTracker0009Icon
    LIssue_tracker0009_description: LissueTracker0009Description
    LIssue_tracker0009_color: LissueTracker0009Color
    LIssue_tracker0009_addNavLink: LissueTracker0009AddNavLink
    LReleases0010_listName: Lreleases0010ListName
    LReleases0010_icon: Lreleases0010Icon
    LReleases0010_description: Lreleases0010Description
    LReleases0010_color: Lreleases0010Color
    LReleases0010_addNavLink: Lreleases0010AddNavLink
    LPackages0011_listName: Lpackages0011ListName
    LPackages0011_icon: Lpackages0011Icon
    LPackages0011_description: Lpackages0011Description
    LPackages0011_color: Lpackages0011Color
    LPackages0011_addNavLink: Lpackages0011AddNavLink
    LPlanned_Changes0012_listName: LplannedChanges0012ListName
    LPlanned_Changes0012_icon: LplannedChanges0012Icon
    LPlanned_Changes0012_description: LplannedChanges0012Description
    LPlanned_Changes0012_color: LplannedChanges0012Color
    LPlanned_Changes0012_addNavLink: LplannedChanges0012AddNavLink
    LProblem_Tracker0013_listName: LproblemTracker0013ListName
    LProblem_Tracker0013_icon: LproblemTracker0013Icon
    LProblem_Tracker0013_description: LproblemTracker0013Description
    LProblem_Tracker0013_color: LproblemTracker0013Color
    LProblem_Tracker0013_addNavLink: LproblemTracker0013AddNavLink
    LUser_Profiles0014_listName: LuserProfiles0014ListName
    LUser_Profiles0014_icon: LuserProfiles0014Icon
    LUser_Profiles0014_description: LuserProfiles0014Description
    LUser_Profiles0014_color: LuserProfiles0014Color
    LUser_Profiles0014_addNavLink: LuserProfiles0014AddNavLink
    LUser_Voice0015_listName: LuserVoice0015ListName
    LUser_Voice0015_icon: LuserVoice0015Icon
    LUser_Voice0015_description: LuserVoice0015Description
    LUser_Voice0015_color: LuserVoice0015Color
    LUser_Voice0015_addNavLink: LuserVoice0015AddNavLink
  }
  
  export interface LdeveloperTeams0001ListName {
    source: string
    defaultValue: string
  }
  
  export interface LdeveloperTeams0001Icon {
    source: string
    defaultValue: string
  }
  
  export interface LdeveloperTeams0001Description {
    source: string
    defaultValue: string
  }
  
  export interface LdeveloperTeams0001Color {
    source: string
    defaultValue: string
  }
  
  export interface LdeveloperTeams0001AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Ldokumenter0002ListName {
    source: string
    defaultValue: string
  }
  
  export interface Ldokumenter0002Icon {
    source: string
    defaultValue: string
  }
  
  export interface Ldokumenter0002Description {
    source: string
    defaultValue: string
  }
  
  export interface Ldokumenter0002Color {
    source: string
    defaultValue: string
  }
  
  export interface Ldokumenter0002AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Lenvironments0003ListName {
    source: string
    defaultValue: string
  }
  
  export interface Lenvironments0003Icon {
    source: string
    defaultValue: string
  }
  
  export interface Lenvironments0003Description {
    source: string
    defaultValue: string
  }
  
  export interface Lenvironments0003Color {
    source: string
    defaultValue: string
  }
  
  export interface Lenvironments0003AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Lepics0004ListName {
    source: string
    defaultValue: string
  }
  
  export interface Lepics0004Icon {
    source: string
    defaultValue: string
  }
  
  export interface Lepics0004Description {
    source: string
    defaultValue: string
  }
  
  export interface Lepics0004Color {
    source: string
    defaultValue: string
  }
  
  export interface Lepics0004AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Lfeatures0005ListName {
    source: string
    defaultValue: string
  }
  
  export interface Lfeatures0005Icon {
    source: string
    defaultValue: string
  }
  
  export interface Lfeatures0005Description {
    source: string
    defaultValue: string
  }
  
  export interface Lfeatures0005Color {
    source: string
    defaultValue: string
  }
  
  export interface Lfeatures0005AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface LrequestTracker0006ListName {
    source: string
    defaultValue: string
  }
  
  export interface LrequestTracker0006Icon {
    source: string
    defaultValue: string
  }
  
  export interface LrequestTracker0006Description {
    source: string
    defaultValue: string
  }
  
  export interface LrequestTracker0006Color {
    source: string
    defaultValue: string
  }
  
  export interface LrequestTracker0006AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Lservices0007ListName {
    source: string
    defaultValue: string
  }
  
  export interface Lservices0007Icon {
    source: string
    defaultValue: string
  }
  
  export interface Lservices0007Description {
    source: string
    defaultValue: string
  }
  
  export interface Lservices0007Color {
    source: string
    defaultValue: string
  }
  
  export interface Lservices0007AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Lbegivenheder0008ListName {
    source: string
    defaultValue: string
  }
  
  export interface Lbegivenheder0008Icon {
    source: string
    defaultValue: string
  }
  
  export interface Lbegivenheder0008Description {
    source: string
    defaultValue: string
  }
  
  export interface Lbegivenheder0008Color {
    source: string
    defaultValue: string
  }
  
  export interface Lbegivenheder0008AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface LissueTracker0009ListName {
    source: string
    defaultValue: string
  }
  
  export interface LissueTracker0009Icon {
    source: string
    defaultValue: string
  }
  
  export interface LissueTracker0009Description {
    source: string
    defaultValue: string
  }
  
  export interface LissueTracker0009Color {
    source: string
    defaultValue: string
  }
  
  export interface LissueTracker0009AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Lreleases0010ListName {
    source: string
    defaultValue: string
  }
  
  export interface Lreleases0010Icon {
    source: string
    defaultValue: string
  }
  
  export interface Lreleases0010Description {
    source: string
    defaultValue: string
  }
  
  export interface Lreleases0010Color {
    source: string
    defaultValue: string
  }
  
  export interface Lreleases0010AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface Lpackages0011ListName {
    source: string
    defaultValue: string
  }
  
  export interface Lpackages0011Icon {
    source: string
    defaultValue: string
  }
  
  export interface Lpackages0011Description {
    source: string
    defaultValue: string
  }
  
  export interface Lpackages0011Color {
    source: string
    defaultValue: string
  }
  
  export interface Lpackages0011AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface LplannedChanges0012ListName {
    source: string
    defaultValue: string
  }
  
  export interface LplannedChanges0012Icon {
    source: string
    defaultValue: string
  }
  
  export interface LplannedChanges0012Description {
    source: string
    defaultValue: string
  }
  
  export interface LplannedChanges0012Color {
    source: string
    defaultValue: string
  }
  
  export interface LplannedChanges0012AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface LproblemTracker0013ListName {
    source: string
    defaultValue: string
  }
  
  export interface LproblemTracker0013Icon {
    source: string
    defaultValue: string
  }
  
  export interface LproblemTracker0013Description {
    source: string
    defaultValue: string
  }
  
  export interface LproblemTracker0013Color {
    source: string
    defaultValue: string
  }
  
  export interface LproblemTracker0013AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface LuserProfiles0014ListName {
    source: string
    defaultValue: string
  }
  
  export interface LuserProfiles0014Icon {
    source: string
    defaultValue: string
  }
  
  export interface LuserProfiles0014Description {
    source: string
    defaultValue: string
  }
  
  export interface LuserProfiles0014Color {
    source: string
    defaultValue: string
  }
  
  export interface LuserProfiles0014AddNavLink {
    source: string
    defaultValue: string
  }
  
  export interface LuserVoice0015ListName {
    source: string
    defaultValue: string
  }
  
  export interface LuserVoice0015Icon {
    source: string
    defaultValue: string
  }
  
  export interface LuserVoice0015Description {
    source: string
    defaultValue: string
  }
  
  export interface LuserVoice0015Color {
    source: string
    defaultValue: string
  }
  
  export interface LuserVoice0015AddNavLink {
    source: string
    defaultValue: string
  }
  