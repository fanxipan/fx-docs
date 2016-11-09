import sys
import os
from docutils import nodes, utils
from docutils.parsers.rst import directives

on_rtd = os.environ.get('READTHEDOCS', None) == 'True'

def setup(app):
	app.add_role('jsom-index', jsomIndexRole)
	app.add_config_value('jsom_base_url', None, 'html')

def jsomIndexRole(name, rawtext, text, lineno, inliner, options={}, content=[]):
	app = inliner.document.settings.env.app
	docsBaseUrl = app.config.jsom_base_url

	linkUri = docsBaseUrl + 'index.html'
	if on_rtd: linkUri = "/en/latest" + linkUri

	node = nodes.reference(rawtext, text, refuri = linkUri, **options)
	return [node], []