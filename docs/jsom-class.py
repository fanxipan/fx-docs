import sys
import os
from docutils import nodes, utils
from docutils.parsers.rst import directives

on_rtd = os.environ.get('READTHEDOCS', None) == 'True'

def setup(app):
	app.add_role('jsom-class', jsomclass_role)

def jsomclass_role(name, rawtext, text, lineno, inliner, options={}, content=[]):
	app = inliner.document.settings.env.app
	docsBaseUrl = app.config.jsom_base_url

	trunks = text.split('.')
	className = trunks[len(trunks) - 1]

	linkUri = docsBaseUrl + "classes/" + text + ".html"
	if on_rtd: linkUri = "/en/latest" + linkUri

	node = nodes.reference(rawtext, className, refuri = linkUri, **options)
	return [node], []