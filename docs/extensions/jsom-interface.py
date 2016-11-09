import sys
import os
from docutils import nodes, utils
from docutils.parsers.rst import directives

on_rtd = os.environ.get('READTHEDOCS', None) == 'True'

def setup(app):
	app.add_role('jsom-interface', jsomInterfaceRole)

def jsomInterfaceRole(name, rawtext, text, lineno, inliner, options={}, content=[]):
	app = inliner.document.settings.env.app
	docsBaseUrl = app.config.jsom_base_url

	trunks = text.split('.')
	interfaceName = trunks[len(trunks) - 1]

	linkUri = docsBaseUrl + "interfaces/" + text.lower() + ".html"
	if on_rtd: linkUri = "/en/latest" + linkUri

	node = nodes.reference(rawtext, interfaceName, refuri = linkUri, **options)
	return [node], []