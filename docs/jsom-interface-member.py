import sys
import os
from docutils import nodes, utils
from docutils.parsers.rst import directives

on_rtd = os.environ.get('READTHEDOCS', None) == 'True'

def setup(app):
	app.add_role('jsom-interface-member', jsomInterfaceMemberRole)

def jsomInterfaceMemberRole(name, rawtext, text, lineno, inliner, options={}, content=[]):
	app = inliner.document.settings.env.app
	docsBaseUrl = app.config.jsom_base_url

	trunks = text.split('#')
	interfaceFullName = trunks[0]
	memberName = trunks[1]

	interfaceTrunks = interfaceFullName.split('.')
	interfaceName = interfaceTrunks[len(interfaceTrunks) - 1]

	linkUri = docsBaseUrl + "interfaces/" + interfaceFullName + ".html#" + memberName.lower()
	if on_rtd: linkUri = "/en/latest" + linkUri

	node = nodes.reference(rawtext, interfaceName + '.' + memberName, refuri = linkUri, **options)
	return [node], []