# Merkle.Sitecore.Demo.XM
- set NODE_TLS_REJECT_UNAUTHORIZED=0
- npm config set "strict-ssl" false -g
- npm install @sitecore-jss/sitecore-jss @sitecore-jss/sitecore-jss-react
- Copy .configs file from the ./sitecore folder to the GIT into folder /cm/App_Configs/include/zzz (they will autocopy into XM Cloud)
- Check have been copied via <domain>/sitecore/showconfigs.aspx
- Modify the user rights "sitecore\JSSImport" to have full access to item "Content" via control panel
- Deploy app via command line: jss deploy app --includeContent --includeDictionary

##  JSS Application
- ESLINT is annoying for vercel, under "rules" add first rule, set to "OFF" the second
"rules": {
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
	"eol-last": "off",
    [...]
}

Delete file: .eslintcache and add nel .gitignore

### Application name
- xmreact

### Configuration files
- xmreact.config
- xmreact.deploysecret.config