import sys
import os
from docutils import nodes, utils
from docutils.parsers.rst import directives

on_rtd = os.environ.get('READTHEDOCS', None) == 'True'

def setup(app):
	app.add_role('jsom-class-member', jsomClassMemberRole)

def jsomClassMemberRole(name, rawtext, text, lineno, inliner, options={}, content=[]):
	app = inliner.document.settings.env.app
	docsBaseUrl = app.config.jsom_base_url

	trunks = text.split('#')
	classFullName = trunks[0]
	memberName = trunks[1]

	classTrunks = classFullName.split('.')
	className = classTrunks[len(classTrunks) - 1]

	linkUri = docsBaseUrl + "classes/" + classFullName.lower() + ".html#" + memberName.lower()
	if on_rtd: linkUri = "/en/latest" + linkUri

	node = nodes.reference(rawtext, className + '.' + memberName, refuri = linkUri, **options)
	return [node], []